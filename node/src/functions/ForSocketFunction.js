const Product = require("../models/productModel");

const getMessageProductDetail = async (Id) => {
  try {
    const findProduct = await Product.findById(Id);
    console.log(findProduct,"arama",Id);
    if (findProduct) {
        return findProduct;
    }
  } catch (error) {}
};

module.exports = {
  getMessageProductDetail,
};


/*
const getMessageProductDetail = async (products) => {
  try {
    const data = [];


    await Promise.all(
      products.map(async (x) => {
        const findProduct = await Product.findById(x.productId);
        if (findProduct) {
          data.push(findProduct);
          console.log(data[0].push({"roomId":x.id}),"00000");
        }
      })
    );
    
    return data;
  } catch (error) {}
};
*/