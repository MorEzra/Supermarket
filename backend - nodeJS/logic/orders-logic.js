const ordersDao = require("../dao/orders-dao");
const formValidatorsUtils = require('../utils/FormValidatorsUtils');

let busyDeliveryDates = [];

function getUserDetails(token) {
    let pureToken = token.split(" ").pop();

    let userCachedDetails = ordersDao.getUserDetails(pureToken);

    return userCachedDetails;
}

function getUserID(token) {
    let userCachedDetails = getUserDetails(token);
    return userCachedDetails.userID;
}

function getActiveCartID(token) {
    let userCachedDetails = getUserDetails(token);
    return userCachedDetails.cartID;
}

async function getOrdersQty() {
    let successfulOrdersQty = await ordersDao.getOrdersQty();

    return successfulOrdersQty;
}

async function getLastOrder(token) {
    let userID = getUserID(token);

    let successfulLastOrderDetails = await ordersDao.getLastOrder(userID);

    return successfulLastOrderDetails;
}

async function getBusyDeliveryDates() {
    let successfulBusyDeliveryDates = await ordersDao.getBusyDeliveryDates();

    for (let date of successfulBusyDeliveryDates) {
        busyDeliveryDates.push(date.deliveryDate);
    }

    return busyDeliveryDates;
}

async function placeOrder(token, orderDetails) {
    formValidatorsUtils.validateCheckoutFormFields(orderDetails,busyDeliveryDates);

    let userID = getUserID(token);
    let cartID = getActiveCartID(token);
    await ordersDao.placeOrder(userID, cartID, orderDetails);

    let pureToken = token.split(" ").pop()
    ordersDao.updateCartIDInCache(pureToken, null);
}

module.exports = {
    getOrdersQty,
    getLastOrder,
    getBusyDeliveryDates,
    placeOrder,

}