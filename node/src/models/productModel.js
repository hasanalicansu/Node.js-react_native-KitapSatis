const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const joi = require("@hapi/joi");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { string, number } = require("@hapi/joi");



const ProductSchema = new Schema({
  productTitle: {
    type: String,
    required: [true,"Başlık boş olamaz"],
    minlength: 3,
    maxlength: 70
  },
  author: {
    type: String,
    minlength: [1, "Yazar ismi en az 1 karakter olmalı ...."],
    maxlength: 50,
  },
  productDetail: {
    type: String,
    required: [true, "Detay boş olamaz"],
    minlength: [3, "Detay en az 3 karakter olmalı ...."],
    maxlength: [300,"Detay en fazla 300 karakter olabilir"],
    
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
    required: [true, "Üniversite boş olamaz"],
    
  },
  counter:{
    type:Number,
    default:0
  },
  situation: {
    type: Boolean,
    default: true
  },
  productPhoto: [{
    address: {type:String}
}]
},{collection:"product",  timestamps: { currentTime: () => (Date.now() + 60 * 60 * 3000) }});

const Product =mongoose.model("Product",ProductSchema)
module.exports=Product






/* 

const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const joi = require("@hapi/joi");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { string, number } = require("@hapi/joi");



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
    maxlength: 50,
    lowercase: true,
  },
  category: {
    type: String,
    required: [true, "kategori boş olamaz"],
    
  },
  productDetail: {
    type: String,
    required: [true, "Detay boş olamaz"],
    minlength: [3, "Detay en az 3 karakter olmalı ...."],
    maxlength: [300,"Detay en fazla 300 karakter olabilir"],
    
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
    required: [true, "Üniversite boş olamaz"],
    
  },
  counter:{
    type:Number,
    default:0
  },
  situation: {
    type: Boolean,
    default: true
  },
  productPhoto: [{
    address: {type:String}
}]
},{collection:"product",  timestamps: { currentTime: () => (Date.now() + 60 * 60 * 3000) }});

const Product =mongoose.model("Product",ProductSchema)
module.exports=Product

*/