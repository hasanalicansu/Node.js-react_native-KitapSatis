const favoriteController=require("../controllers/favoriteController")
const authMiddleware = require('../middlewares/authMiddleware');
const router =require("express").Router();

router.get("/getFavorite", authMiddleware, favoriteController.getFavorite);
router.get("/addFavorite/:id", authMiddleware, favoriteController.addFavorite);
router.get("/deleteFavorite/:id", authMiddleware, favoriteController.deleteFavorite);

module.exports=router