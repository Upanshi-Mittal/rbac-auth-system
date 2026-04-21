const {productmodel} = require("../Models/user");

const createProduct = async (req, res) => {
  try {
    const product = new productmodel(req.body);
    await product.save();

    res.json({
      success: true,
      message: "Product created",
      product
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getProducts = async (req, res) => {
  try {
    const products = await productmodel.find();

    res.json(products);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { createProduct, getProducts };