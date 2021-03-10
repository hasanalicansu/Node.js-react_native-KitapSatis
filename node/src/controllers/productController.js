const Product = require("../models/productModel");
const User = require("../models/userModel");
const Favorite = require("../models/favoriteModel");
const MessageRoom = require("../models/messageRoomModel");
const { number } = require("@hapi/joi");


const createNewProduct = async (req, res, next) => {
  try {
    const productPhoto=[]
    for (let i = 1; i <= Number(req.query.count); i++) {
      productPhoto.push({ address:""+i})
    }
    const productToAdd = await new Product({
      productTitle: req.body.productTitle,
      author: req.body.author,
      productDetail: req.body.productDetail,
      productPrice: req.body.productPrice,
      productOwner: req.user._id,
      university: req.body.university,
      universityId: req.body.universityId,
      productPhoto,
    });
    const result = await productToAdd.save();
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(400).json({
        msg: "Urun olusturulurken hata olustu",
      });
    }
  } catch (error) {
    res.status(400).json({
      msg: "Urun olusturulurken hata olustu",
    });
  }
};

const plusCounterProduct = async (req, res, next) => {
  try {
    const result = await Product.findById(req.params.id);
    if (result) {
      const newCounter = result.counter + 1;
      result2 = await Product.updateOne(
        { _id: req.params.id },
        { counter: newCounter },
        { new: true, runValidators: true }
      );
      if (result2) {
        res.status(200).json(result);
      } else {
        res.status(400);
      }
    }
  } catch (error) {
    console.log(error);
  }
};

const dellProduct = async (req, res, next) => {
  try {
    const user = await Product.findOne({
      productOwner: req.user._id,
      _id: req.params.id,
    });
    if (user) {
      const result = await Product.findByIdAndRemove(req.params.id);
      const result2 = await Favorite.deleteMany({ productId: req.params.id });
      const result3 = await MessageRoom.deleteMany({ productId: req.params.id });
      
      if (result) {
        res.status(200).json(result);
      } else {
        res.status(400).json({
          msg: "Urun bulunamadı",
        });
      }
    } else {
      res.status(400).json({
        msg: "Bu yetkiye sahip değilsin",
      });
    }
  } catch (error) {
    res.status(400).json({
      msg: "Urun silinirken hata olustu",
    });
  }
};

const updateProduct = async (req, res, next) => {
  try {
    const user = await Product.findOne({
      productOwner: req.user._id,
      _id: req.params.id,
    });

    if (user) {
      const result = await Product.updateOne(
        { _id: req.params.id },
        {
          productTitle: req.body.productTitle,
          productName: req.body.productName,
          category: req.body.category,
          productDetail: req.body.productDetail,
          productPrice: req.body.productPrice,
          university: req.body.university,
          universityId: req.body.universityId,
          situation: req.body.situation,
        },
        {
          new: true,
          runValidators: true,
        }
      );

      if (result) {
        res.status(200).json(result);
      } else {
        res.status(400).json({
          msg: "Urun bulunamadı",
        });
      }
    } else {
      res.status(400).json({
        msg: "Bu yetkiye sahip değilsin",
      });
    }
  } catch (error) {
    res.status(400).json({
      msg: "Urun güncellenirken hata olustu",
    });
  }
};

const GetTenLastProduct = async (req, res, next) => {
  try {
    const result = await Product.find({ productOwner: { $ne:  req.user._id },situation:true }).sort({ createdAt: -1 }).limit(10); //en son 10 data gelir
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({
      msg: "Urun bulunurken hata olustu",
    });
  }
};

const GetTenMostProduct = async (req, res, next) => {
  try {
    const result = await Product.find({ productOwner: { $ne:  req.user._id },situation:true }).sort({ counter: -1 }).limit(10); //en son 10 data gelir
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(400).json({
        msg: "Urun bulunurken hata olustu",
      });
    }
  } catch (error) {
    res.status(400).json({
      msg: "Urun bulunurken hata olustu",
    });
  }
};

const GetProductOwner = async (req, res, next) => {
  try {
    const result = await User.findById(req.params.id);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({
      msg: "Urun bulunurken hata olustu",
    });
  }
};

const GetVisitorProduct = async (req, res, next) => {
  try {
    const result = await Product.find({}, {})
      .and([{ productOwner: req.params.id }, { situation: true }])
      .sort({ createdAt: -1 });
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({
      msg: "Urun bulunurken hata olustu",
    });
  }
};

const GetOwnerProductOnSale = async (req, res, next) => {
  try {
    const result = await Product.find({}, {})
      .and([{ productOwner: req.user._id }, { situation: true }])
      .sort({ createdAt: -1 });
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({
      msg: "Urun bulunurken hata olustu",
    });
  }
};

const GetOwnerProductSold = async (req, res, next) => {
  try {
    const result = await Product.find({}, {})
      .and([{ productOwner: req.user._id }, { situation: false }])
      .sort({ createdAt: -1 });
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({
      msg: "Urun bulunurken hata olustu",
    });
  }
};

const updateSituationProduct = async (req, res, next) => {
  try {
    const user = await Product.findOne({
      productOwner: req.user._id,
      _id: req.params.id,
    });
    if (user) {
      const result = await Product.updateOne(
        { _id: req.params.id },
        {
          situation: req.body.situation,
        },
        {
          new: true,
          runValidators: true,
        }
      );

      if (result) {
        res.status(200).json(result);
      } else {
        res.status(400).json({
          msg: "Urun bulunamadı",
        });
      }
    } else {
      res.status(400).json({
        msg: "Bu yetkiye sahip değilsin",
      });
    }
  } catch (error) {
    res.status(400).json({
      msg: "Urun güncellenirken hata olustu",
    });
  }
};

const GetSearch = async (req, res, next) => {
  try {
    

    const queryCond = {};
    const queryCondSort = {};
    if (req.query.universiteId) {
      queryCond.universityId = Number(req.query.universiteId);
    }
    if (req.query.sortBy) {
      queryCondSort.productPrice = Number(req.query.sortBy);
    }

    
    const result = await Product.find({}, {})
      .or([
        { productDetail: { $regex: ".*" + req.query.title + ".*" } },
        { productTitle: { $regex: ".*" + req.query.title + ".*" } },
      ])
      .and([{ situation: true},queryCond])
      .sort(queryCondSort);

    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({
      msg: "Urun bulunurken hata olustu",
    });
  }
};

module.exports = {
  createNewProduct,
  plusCounterProduct,
  dellProduct,
  updateProduct,
  GetTenLastProduct,
  GetTenMostProduct,
  GetProductOwner,
  GetVisitorProduct,
  GetOwnerProductOnSale,
  GetOwnerProductSold,
  updateSituationProduct,
  GetSearch,
};
