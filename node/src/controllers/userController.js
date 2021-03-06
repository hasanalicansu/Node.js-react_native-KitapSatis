const User = require("../models/userModel");
const bcrypt = require("bcrypt");

const createNewAccount = async (req, res, next) => {
  try {
    console.log(req.body)
    const eklenecekUser = new User(req.body);

    if (req.body.password && req.body.password.length >= 6)
      eklenecekUser.password = await bcrypt.hash(eklenecekUser.password, 8);

    const { error, value } = eklenecekUser.joiValidation(req.body);

    if (error) {
      console.log( "hata eror")
      res.status(206).json({
        msg: error.message,
        hataKodu: 400,
      });
    } 
    else {
      try {
        console.log( "try içi")
        const sonuc = await eklenecekUser.save();
        console.log(sonuc)
        res.status(200).json(sonuc);
      } catch (err) {
        console.log( "hata eror2",err)
        throw err;
      }
    }
  } catch (error) {
    //console.log("user kaydederken hata:" + error);

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

const oturumAcanUserBilgileri =async(req,res,next)=>{
  return res.json({msg:req.user})
}
module.exports = {
  createNewAccount,
  login,
  oturumAcanUserBilgileri
};
