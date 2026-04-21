const express=require('express');
const router=express.Router();
const token = jwt.sign(
  {
    id: user._id,
    role: user.role
  },
  process.env.JWT_SECRET,
  { expiresIn: "1d" }
);
const {signvalidation,loginvalidation}=require("../Middlewares/validation");
const {signup,login}=require("../Controllers/authcontroller");

router.post('/login',loginvalidation,login);
router.post('/signup',signvalidation,signup);
router.delete(
  "/:id",
  protect,
  allowRoles("admin"),
  deleteProduct
);
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
module.exports=router;