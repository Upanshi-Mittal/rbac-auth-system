// router/productRouter.js
const express = require("express");
const router = express.Router();

const { protect, allowRoles } = require("../Middlewares/auth");
const { createProduct, getProducts } = require("../Controllers/productController");
console.log("Auth routes loaded");
router.get(
  "/",
  protect,
  allowRoles("user", "admin"),
  getProducts
);

router.post(
  "/",
  protect,
  allowRoles("admin"),
  createProduct
);

module.exports = router;