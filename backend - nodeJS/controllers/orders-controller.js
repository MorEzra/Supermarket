const express = require('express');
const ordersLogic = require('../logic/orders-logic');
const router = express.Router();

//get last order
router.get("/", async (request, response, next) => {
    let token = request.headers.authorization;

    try {
        let successfulLastOrderDetails = await ordersLogic.getLastOrder(token);
        response.json(successfulLastOrderDetails);
    }
    catch (error) {
        return next(error)
    }
})

//get orders qty
router.get("/qty", async (request, response, next) => {
    try {
        let successfulOrdersQty = await ordersLogic.getOrdersQty();
        response.json(successfulOrdersQty)
    }
    catch (error) {
        return next(error)
    }
})

//get busy dates
router.get("/busy-dates", async (request, response, next) => {
    try {
        let successfulBusyDeliveryDates = await ordersLogic.getBusyDeliveryDates();
        response.json(successfulBusyDeliveryDates);
    }
    catch (error) {
        return next(error)
    }
})

//checkout
router.post("/", async (request, response, next) => {
    let token = request.headers.authorization;
    let orderDetails = request.body;

    try {
        await ordersLogic.placeOrder(token, orderDetails);
        response.json();
    }
    catch (error) {
        return next(error)
    }
})

module.exports = router;