const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const auth = async (req, res, next)=>{ 

    try {
        if (req.header('Authorization'))
        {
            const token = req.headers.authorization.split(' ')[1];
            const sonuc = jwt.verify(token, process.env.CONFIRM_MAIL_JWT_SECRET);
          
            const findUser = await User.findById({ _id: sonuc._id });

            if (findUser)
                req.user = findUser;
            else {
                return  res.json({
                    mesaj: "Lütfen giriş yapın",
                  });
            }
            next();
        } else {
            return  res.json({
                mesaj: "Lütfen giriş yapın",
              });
            //throw new Error('Lütfen giriş yapın');
        }

    } catch (e) {
        
        return res.status(400).json({
            mesaj: e.message,
          });
    }
    


}

module.exports = auth;