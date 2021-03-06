const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const joi = require("@hapi/joi");
const jwt = require("jsonwebtoken");

const MessageRoomSchema = new Schema({
  seller: {
    type: Schema.Types.ObjectId,
    required: true
  },recipient: {
    type: Schema.Types.ObjectId,
    required: true
  },
  productId: {
    type: Schema.Types.ObjectId,
    required: true
  }
},{collection:"messageRoom",  timestamps: { currentTime: () => (Date.now() + 60 * 60 * 3000) }});

const MessageRoom =mongoose.model("MessageRoom",MessageRoomSchema)
module.exports=MessageRoom