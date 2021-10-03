const express = require("express");
const {addItemToCart,  addToCart,  getCartItems,} = require("../controller/cart");
const { requireSignin, userMiddleware } = require("../common-middleware");
const router = express.Router();

router.post("/user/cart/addtocart",  requireSignin,  userMiddleware,  addItemToCart);



module.exports =  router;