const express = require('express');
const router = express.Router();

const { protect, allowRoles } = require("../Middlewares/auth");

router.get(
  '/',
  protect,
  allowRoles("user", "admin"),
  (req, res) => {
    res.send("product route");
  }
);

module.exports = router;