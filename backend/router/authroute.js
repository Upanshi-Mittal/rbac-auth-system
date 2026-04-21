const express=require('express');
const router=express.Router();
const { protect, allowRoles } = require("../Middlewares/auth");
const {signvalidation,loginvalidation}=require("../Middlewares/validation");
const {signup,login}=require("../Controllers/authcontroller");
router.post('/login',loginvalidation,login);
router.post('/signup',signvalidation,signup);
router.get("/admin-only", protect, allowRoles("admin"), (req, res) => {
  res.json({ message: "Admin access granted" });
});
router.get('/',protect,allowRoles("user", "admin"),(req, res) => {res.send("product route");}
);
module.exports = router;