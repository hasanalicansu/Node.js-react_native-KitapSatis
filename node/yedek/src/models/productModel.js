const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const joi = require("@hapi/joi");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const ProductSchema = new Schema({
  productTitle: {
    type: String,
    required: [true,"Başlık boş olamaz"],
    minlength: 3,
    maxlength: 70
  },
  productName: {
    type: String,
    minlength: [3, "isim en az 3 karakter olmalı ...."],
    maxlength: 50
  },
  category: {
    type: String,
    required: [true, "kategori boş olamaz"]
  },
  productDetail: {
    type: String,
    required: [true, "Detay boş olamaz"],
    minlength: [3, "Detay en az 3 karakter olmalı ...."],
    maxlength: [300,"Detay en fazla 300 karakter olabilir"]
  },
  productPrice: {
    type:Number,
    required: [true, "Fiyat boş olamaz"]
  },
  productOwner: {
    type:Schema.Types.ObjectId,
    required: true
  },
  university: {
    type:String,
    required: [true, "Üniversite boş olamaz"]
  },
  counter:{
    type:Number,
    default:0
  },
  situation: {
    type: Boolean,
    default: true
  }
},{collection:"product",timestamps:true});

const Product =mongoose.model("Product",ProductSchema)
module.exports=Product