const Product = require("../models/productModel");

const getMessageProductDetail = async (Id) => {
  try {
    const findProduct = await Product.findById(Id);
 
    if (findProduct) {
        return findProduct;
    }
  } catch (error) {}
};

module.exports = {
  getMessageProductDetail,
};


