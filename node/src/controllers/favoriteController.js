const Favorite = require("../models/favoriteModel");
const Product = require("../models/productModel");

const express = require("express");

const getFavorite = async (req, res, next) => {
  try {
    const result = await Favorite.find({ favoriteOwner: req.user._id });
    if (result) {
      const data = [];
      await Promise.all(
        result.map(async ({ productId }) => {
          const findProduct = await Product.findById(productId).and([
            { situation: true },
          ]);
          if (findProduct) {
            data.push(findProduct);
          }
        })
      );
      if (data.length == 0) {
        res.status(204).json(data);
      } else {
        res.status(200).json(data);
      }
    } else {
      res.status(201).json({
        msg: "favori bulunamadı",
      });
    }
  } catch (error) {
    res.status(400).json({
      msg: "Favoriler aranırken hata olustu",
    });
  }
};

const addFavorite = async (req, res, next) => {
  try {
    const favoriteAdd = await new Favorite({
      favoriteOwner: req.user._id,
      productId: req.params.id,
      numberUnique: req.user._id + req.params.id,
    });
    const result = await favoriteAdd.save();
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(201).json({
        msg: "Favorilere Eklenirken hata olustu",
      });
    }
  } catch (error) {
    res.status(204).json({
      msg: "Daha önce eklenmiş",
    });
  }
};

const deleteFavorite = async (req, res, next) => {
  try {
    const result = await Favorite.findOneAndRemove().and([
      { productId: req.params.id },
      { favoriteOwner: req.user._id },
    ]);
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(204).json({
        msg: "Urun bulunamadı",
      });
    }
  } catch (error) {
    res.status(400).json({
      msg: "Hatalı kimlik",
    });
  }
};

module.exports = {
  getFavorite,
  addFavorite,
  deleteFavorite,
};

/*

const express =require("express")
const app=express()
const http = require('http').Server(app);
const io = require('socket.io')(http);

*/
