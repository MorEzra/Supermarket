const express = require('express');
const cartsLogic = require('../logic/carts-logic');

const router = express.Router();

//add to cart
router.post("/", async (request, response, next) => {
    let token = request.headers.authorization;
    let product = request.body

    try {
        let newCartItem = await cartsLogic.addProductToCart(token, product);
        response.json(newCartItem)
    }
    catch (error) {
        return next(error)
    }
})

//get active cart
router.get("/", async (request, response, next) => {
    let token = request.headers.authorization;

    try {
        let activeCartItems = await cartsLogic.getActiveCartItems(token);
        response.json(activeCartItems);
    }
    catch (error) {
        return next(error)
    }
})

router.delete("/byCartItemID", async (request, response, next) => {
    let token = request.headers.authorization;
    let cartItemID = request.query.cartItemID;

    try {
        await cartsLogic.deleteCartItem(token, cartItemID);
        response.json();
    }
    catch (error) {
        return next(error)
    }
})

//empty cart
router.delete("/", async (request, response, next) => {
    let token = request.headers.authorization;

    try {
        await cartsLogic.emptyCart(token);
        response.json();
    }
    catch (error) {
        return next(error)
    }
})

//get user purchases status
//I put this func here because I check the status by if any cart even exists and not by last order
router.get("/status", async (request, response, next) => {
    let token = request.headers.authorization;

    try {
        let isFirstPurchase = await cartsLogic.isFirstPurchase(token);
        response.json(isFirstPurchase);
    }
    catch (error) {
        return next(error)
    }
})

module.exports = router;