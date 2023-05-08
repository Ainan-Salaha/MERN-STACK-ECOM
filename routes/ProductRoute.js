const  express = require('express')
const router= express.Router();
const {ProductSend,UniqueProductSend,FindCategory, braintreeTokenController, braintreePaymentController} = require("../controllers/ProductController")

router.get("/store",ProductSend)
router.get("/product/:id", UniqueProductSend)
router.get("/catagory/:id",FindCategory)

//payment route
//token
router.get('/braintree/token',braintreeTokenController)

//payments

// router.post('/braintree/payment', requireSignIn,braintreePaymentController)
router.post('/braintree/payment',braintreePaymentController)

module.exports= router