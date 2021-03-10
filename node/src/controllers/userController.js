const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

const createNewAccount = async (req, res, next) => {
  try {
   
    const eklenecekUser = new User(req.body);

    if (req.body.password && req.body.password.length >= 6)
      eklenecekUser.password = await bcrypt.hash(eklenecekUser.password, 8);

    const { error, value } = eklenecekUser.joiValidation(req.body);

    if (error) {
     
      res.status(206).json({
        msg: error.message,
        hataKodu: 400,
      });
    } else {
      try {
       
        const sonuc = await eklenecekUser.save();
       
        res.status(200).json(sonuc);
      } catch (err) {
       
        throw err;
      }
    }
  } catch (error) {
    
    if (error.code === 11000) {
      return res.status(206).json({
        msg:
          Object.keys(error.keyValue) +
          " için girdiğiniz " +
          Object.values(error.keyValue) +
          " daha önceden veritabanında olduğu için tekrar eklenemez/güncenllenemez, özel olmalıdır",

        hataKodu: 400,
      });
    }
    res.status(206).json({
      msg: "Kullanıcı kaydedilirken hata oluştu",
      hataKodu: 400,
    });
    //next(err);
  }
};

const login = async (req, res, next) => {
  try {
    const user = await User.girisYap(req.body.email, req.body.password);
    const token = await user.generateToken();
    res.json({
      user,
      token,
    });
  } catch (hata) {
    next(hata);
  }
};

const oturumAcanUserBilgileri = async (req, res, next) => {
  return res.json({ msg: req.user });
};

const forgetPasswordFormunuGoster = (req, res, next) => {
  res.render("forget_password", {
    layout: "./layout/auth_layout.ejs",
    title: "Şifremi Unuttum",
  });
};

const successPasswordFormunuGoster = (req, res, next) => {
  res.render("success_password", {
    layout: "./layout/auth_layout.ejs",
    title: "Başarılı değiştirme işlemi",
  });
};

const forgetPassword = async (req, res, next) => {
  const hatalar = validationResult(req);

  if (!hatalar.isEmpty()) {
   
    res.status(206).json({
      msg: "Hatalı mail",
    });
  } else {
    try {
      const _user = await User.findOne({
        email: req.body.email,
      });

      if (_user) {
        //kullanıcıya şifre sıfırlama maili atılabilir
        const jwtBilgileri = {
          id: _user._id,
          mail: _user.email,
        };

        const secret =
          process.env.RESET_PASSWORD_JWT_SECRET + "-" + _user.password;
        const jwtToken = jwt.sign(jwtBilgileri, secret, { expiresIn: "1d" });

        //MAIL GONDERME ISLEMLERI
        const url =
          process.env.WEB_SITE_URL +
          "api/users/reset-password/" +
          _user._id +
          "/" +
          jwtToken;

        let transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: process.env.GMAIL_USER,
            pass: process.env.GMAIL_SIFRE,
          },
        });

        await transporter.sendMail(
          {
            from: "Kitap Uygulaması <ounoyna@gmail.com",
            to: _user.email,
            subject: "Şifre Güncelleme",
            text: "Şifrenizi oluşturmak için lütfen şu linki tıklayın:" + url,
          },
          (error, info) => {
            if (error) {
              console.log("bir hata var mail gönderme" + error);
            }
           
            transporter.close();
          }
        );
        res.status(200).json({
          msg: "Lütfen mail kutunuzu kontrol edin",
        });
      } else {
        res.status(206).json({
          msg: "Bu mail kayıtlı değil",
        });
      }
      //jwt işlemleri
    } catch (err) {
      console.log("user kaydedilirken hata cıktı " + err);
    }
  }

  //res.render('forget_password', { layout: './layout/auth_layout.ejs' });
};

const yeniSifreyiKaydet = async (req, res, next) => {
  const hatalar = validationResult(req);
  
  if (!hatalar.isEmpty()) {
   

    res.redirect(
      "/api/users/reset-password/" + req.body.id + "/" + req.body.token
    );
  } else {
    
    const _bulunanUser = await User.findOne({
      _id: req.body.id,
    });

    const secret =
      process.env.RESET_PASSWORD_JWT_SECRET + "-" + _bulunanUser.password;

    try {
      jwt.verify(req.body.token, secret, async (e, decoded) => {
        if (e) {
         
          res.redirect("/api/users/forget-password");
        } else {
          
          const hashedPassword = await bcrypt.hash(req.body.sifre, 8);
          const sonuc = await User.findByIdAndUpdate(req.body.id, {
            password: hashedPassword,
          });

          if (sonuc) {
          
            res.redirect("/api/users/success-password");
          } else {
           
            res.redirect("/api/users/forget-password");
          }
        }
      });
    } catch (err) {
      console.log("hata cıktı" + err);
    }
  }
};

const yeniSifreFormuGoster = async (req, res, next) => {
  const linktekiID = req.params.id;
  const linktekiToken = req.params.token;

  if (linktekiID && linktekiToken) {
    const _bulunanUser = await User.findOne({ _id: linktekiID });

    const secret =
      process.env.RESET_PASSWORD_JWT_SECRET + "-" + _bulunanUser.password;
    
    try {
      jwt.verify(linktekiToken, secret, async (e, decoded) => {
        if (e) {
          //req.flash('error', 'Kod Hatalı veya Süresi Geçmiş');
          res.redirect("/api/users/forget-password");
        } else {
          res.render("new_password", {
            id: linktekiID,
            token: linktekiToken,
            layout: "./layout/auth_layout.ejs",
            title: "Şifre Güncelle",
          });
        }
      });
    } catch (err) {}
  } else {
    res.redirect("forget-password");
  }
};

const updateAvatar = async (req, res, next) => {
  try {
   
    const result = await User.findByIdAndUpdate(req.user._id,{
      avatar:req.body.url
    });
   
    if (result) {
     
      res.status(200).json(result);
    } else {
     
      res.status(400).json({
        msg: "Kullanıcı bulunamadı",
      });
    }
  } catch (error) {
    
    res.status(400).json({
      msg: "Avatar güncellenirken hata olustu",
    });
  }
};
module.exports = {
  createNewAccount,
  login,
  oturumAcanUserBilgileri,
  forgetPassword,
  yeniSifreyiKaydet,
  yeniSifreFormuGoster,
  forgetPasswordFormunuGoster,
  successPasswordFormunuGoster,
  updateAvatar,
};
