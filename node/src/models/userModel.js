const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Joi = require("@hapi/joi");
//error
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 50
    },
    surname: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 50
    },
    userUniversity: {
      type: String,
      required: [true, "üniversite boş olamaz"],
    },
    userUniversityId: {
      type: Number,
      efault:0
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
      trim: true
    },
    avatar: {
        type: String,
        default:'https://firebasestorage.googleapis.com/v0/b/kitap-df6cb.appspot.com/o/avatar%2Fuser-2.png?alt=media&token=0a18fb90-022e-4c04-9dfc-1d513de2fa50' 
    },
    emailActive: {
        type: Boolean,
        default: false
    }
  },
  { collection: "users",timestamps: { currentTime: () => (Date.now() + 60 * 60 * 3000) } }
);

const schema = Joi.object({
  name: Joi.string().min(3).max(50).trim().messages({
    "string.empty": "İsim boş olamaz!!",
    "string.min": "İsim en az 3 karakter olmalı !!!",
  }),
  surname: Joi.string().min(3).max(50).trim().messages({
    "string.empty": "İsim boş olamaz!!",
    "string.min": "İsim en az 3 karakter olmalı !!!",
  }),
  email: Joi.string().trim().email().messages({
    "string.email": "Girdiğiniz e-mail geçerli bir e-mail değil",
    "string.empty": "E-mail boş olamaz!!",
  }),
  password: Joi.string().min(6).trim().messages({
    "string.min": "Şifre en az 6 karakter olmalı",
    "string.empty": "Şifre boş olamaz!!",
  }),
  userUniversity: Joi.string().messages({
    "string.empty": "Üniversite boş olamaz!!",
  }),
  userUniversityId: Joi.number()
  
});

UserSchema.methods.generateToken = async function () {
  const loginUser = this;
  const token = await jwt.sign({ _id: loginUser._id }, process.env.CONFIRM_MAIL_JWT_SECRET, {
    expiresIn: "30 days",
  });
  return token;
};

//yeni bir user için bu validation kullanılır
UserSchema.methods.joiValidation = function (userObject) {
  schema.required();
 
  return schema.validate(userObject, { abortEarly: false });
};

UserSchema.methods.toJSON = function () {
  const user = this.toObject();

  delete user.updatedAt;
  delete user.password;
  delete user.__v;

  return user;
};

UserSchema.statics.girisYap = async (email, password) => {
  const { error, value } = schema.validate({ email, password });

  if (error) {
    throw createError(400, error);
  }

  const user = await User.findOne({ email });

  if (!user) {
    throw createError(400, "Girilen email/şifre hatalı");
  }

  const sifreKontrol = await bcrypt.compare(password, user.password);

  if (!sifreKontrol) {
    throw createError(400, "Girilen email/şifre hatalı");
  }

  return user;
};

const User = mongoose.model("User", UserSchema);

module.exports = User;
