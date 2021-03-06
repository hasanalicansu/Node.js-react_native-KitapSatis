const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const joi = require("@hapi/joi");
const jwt = require("jsonwebtoken");

const MessageContentSchema = new Schema(
  {
    messageSender: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    messageReceiver: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    roomId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    text: {
      type: String,
      required: [true, "Mesaj boş olamaz"],
      minlength: [1, "Mesaj en az 1 karakter olmalı ...."],
      maxlength: [300, "Mesaj en fazla 300 karakter olabilir"],
    },
  },
  {
    collection: "messageRoom",
    timestamps: { currentTime: () => Date.now() + 60 * 60 * 3000 },
  }
);

const MessageContent = mongoose.model("MessageContent", MessageContentSchema);
module.exports = MessageContent;
