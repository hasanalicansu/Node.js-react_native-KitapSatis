const Product = require("../models/productModel");
const User = require("../models/userModel");

const createNewProduct = async (req, res, next) => {
  try {
    const productToAdd = await new Product({
      productTitle: req.body.productTitle,
      productName: req.body.productName,
      category: req.body.category,
      productDetail: req.body.productDetail,
      productPrice: req.body.productPrice,
      productOwner: req.user._id,
      university: req.body.university,
    });
    const result = await productToAdd.save();
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({
      msg: "Urun olusturulurken hata olustu",
    });
  }
};

const getProduct = async (req, res, next) => {
  try {
    const result = await Product.findOne({ _id: req.params.id });

    if (result) {
      const newCounter = result.counter + 1;
      const plus = await Product.updateOne(
        { _id: req.params.id },
        { counter: newCounter },
        { new: true, runValidators: true }
      );
      result.counter = newCounter;
      res.status(200).json(result);
    } else {
      res.status(400).json({
        msg: "Urun bulunamadi",
      });
    }
  } catch (error) {
    res.status(400).json({
      msg: "Urun bulunurken hata olustu",
    });
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
    const result = await Product.find({}).sort({ createdAt: -1 }).limit(10); //en son 10 data gelir
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({
      msg: "Urun bulunurken hata olustu",
    });
  }
};

const GetTenMostProduct = async (req, res, next) => {
  try {
    const result = await Product.find({}).sort({ counter: -1 }).limit(10); //en son 10 data gelir
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
    const result = await User.findById(req.params.id)
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({
      msg: "Urun bulunurken hata olustu",
    });
  }
};


const GetVisitorProduct = async (req, res, next) => {
  try {
    const result = await Product.find({},{}).and([{productOwner:req.params.id},{situation:true}]).sort({ createdAt: -1 })
    res.status(200).json(result); 
  } catch (error) {
    res.status(400).json({
      msg: "Urun bulunurken hata olustu",
    });
  }
};



const GetOwnerProductOnSale = async (req, res, next) => {
  try {
    const result = await Product.find({},{}).and([{productOwner:req.user._id},{situation:true}]).sort({ createdAt: -1 })
    res.status(200).json(result); 
  } catch (error) {
    res.status(400).json({
      msg: "Urun bulunurken hata olustu",
    });
  }
};




const GetOwnerProductSold = async (req, res, next) => {
  try {
    const result = await Product.find({},{}).and([{productOwner:req.user._id},{situation:false}]).sort({ createdAt: -1 })
    res.status(200).json(result); 
  } catch (error) {
    res.status(400).json({
      msg: "Urun bulunurken hata olustu",
    });
  }
};

module.exports = {
  createNewProduct,
  getProduct,
  dellProduct,
  updateProduct,
  GetTenLastProduct,
  GetTenMostProduct,
  GetProductOwner,
  GetVisitorProduct,
  GetOwnerProductOnSale,
  GetOwnerProductSold
};
