const cartsDao = require("../dao/carts-dao");
const formValidatorsUtils = require('../utils/FormValidatorsUtils');
const hostUrl = "http://localhost:3001/";

function getUserDetails(token) {
    let pureToken = token.split(" ").pop();
    let userCachedDetails = cartsDao.getUserDetails(pureToken);
    return userCachedDetails;
}

function getActiveCartID(token) {
    let userCachedDetails = getUserDetails(token);
    return userCachedDetails.cartID;
}

function getUserID(token) {
    let userCachedDetails = getUserDetails(token);
    return userCachedDetails.userID;
}

async function addProductToCart(token, product) {
    formValidatorsUtils.validateQuantityField(product);

    let userID = getUserID(token);

    let cartID = await cartsDao.getActiveCartID(userID);

    let cachedCartID = getActiveCartID(token);

    //if there is no active cart
    if (cachedCartID == null) {
        let pureToken = token.split(" ").pop()
        cartsDao.updateCartIDInCache(pureToken, cartID);
    }

    let newCartItem = await cartsDao.addProductToCart(product, cartID);

    return newCartItem;
}

async function getActiveCartItems(token) {
    let cartID = getActiveCartID(token);

    //in order to block postman requests
    if (cartID == null) {
        return [];
    }

    let activeCartItems = await cartsDao.getActiveCartItems(cartID);

    for (let item of activeCartItems) {
        item.image = hostUrl + item.image;
    }

    return activeCartItems;
}

async function deleteCartItem(token, cartItemID) {
    let cartID = getActiveCartID(token);

    await cartsDao.deleteCartItem(cartItemID, cartID);
}

async function emptyCart(token) {
    let cartID = getActiveCartID(token);

    await cartsDao.emptyCart(cartID);
}

async function isFirstPurchase(token) {
    let userID = getUserID(token);

    let cartID = await cartsDao.getCartID(userID);

    let isFirstPurchase;
    if (cartID == undefined) {
        isFirstPurchase = true;
    } else {
        isFirstPurchase = false;
    }
    return isFirstPurchase;
}

module.exports = {
    addProductToCart,
    getActiveCartItems,
    deleteCartItem,
    emptyCart,
    isFirstPurchase
}