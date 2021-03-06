const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const joi = require("@hapi/joi");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const FavoriteSchema = new Schema(
  {
    favoriteOwner: {
      type: Schema.Types.ObjectId,
      required: true
    },
    productId: {
      type: Schema.Types.ObjectId,
      required: true
    },
    numberUnique: {
      type: String,
      required: true,
      trim: true,
      unique: true
    }
  },
  { collection: "favorite", timestamps: true }
);

const Favorite = mongoose.model("Favorite", FavoriteSchema);
module.exports = Favorite;
