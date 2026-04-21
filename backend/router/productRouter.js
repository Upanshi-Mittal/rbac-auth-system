const express=require('express');
const router=express.Router();
const auth=require("../Middlewares/auth");
const { protect, allowRoles } = require("../Middlewares/auth");
router.get('/',auth,(req,res)=>{
    protect,
    allowRoles("user", "admin"),
    res.send("product route")
})

module.exports=router;