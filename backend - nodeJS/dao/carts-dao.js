let connection = require('./connection-wrapper')
let ErrorType = require("./../errors/error-type");
let ServerError = require("./../errors/server-error");
let usersCache = require("../users-cache");

function getUserDetails(token) {
    let userCachedDetails = usersCache.getUserDetails(token);
    return userCachedDetails;
}

function updateCartIDInCache(token, cartID) {
    usersCache.updateCartIDInCache(token, cartID);
}

async function createNewCart(userID, creationDate) {
    let sql = `INSERT INTO carts (user_id, creation_date, is_open) VALUES (?, ?, 1)`
    let parameters = [userID, creationDate]

    try {
        let newCart = await connection.executeWithParameters(sql, parameters);
        return newCart.insertId;
    } catch (error) {
        throw new ServerError(ErrorType.NO_CARTS_DATA);
    }
}

async function getActiveCartID(userID) {
    //i use != 0 even though I use only 1 and 0, because 0 is false and any other number is true
    let sql = `SELECT id AS cartID FROM carts WHERE user_id = ? AND is_open != 0`
    parameters = [userID];

    try {
        let cart = await connection.executeWithParameters(sql, parameters);

        if (!cart[0]) {
            let creationDate = new Date();
            cart = await createNewCart(userID, creationDate);

            return cart;
        }
        return cart[0].cartID;
    } catch (error) {
        throw new ServerError(ErrorType.NO_CARTS_DATA);
    }
}

async function addProductToCart(product, cartID) {
    let sql = `INSERT INTO cart_items (product_id, quantity, total_price, cart_id) VALUES (?,?,((SELECT price FROM products WHERE id = ?) * ?),?)`
    parameters = [product.productID, product.quantity, product.productID, product.quantity, cartID];

    try {
        let response = await connection.executeWithParameters(sql, parameters);

        let newCartItem = {
            cartItemID: response.insertId,
            productID: product.productID,
            productName: product.productName,
            quantity: product.quantity,
            price: product.price,
            image: product.image,
            totalPrice: product.price * product.quantity
        }

        return newCartItem;
    } catch (error) {
        throw new ServerError(ErrorType.NO_CARTS_DATA);
    }
}

async function getActiveCartItems(cartID) {
    let sql = `SELECT ci.id AS cartItemID, ci.product_id AS productID, name AS productName, ci.quantity, price, image,
    (SELECT SUM(ci.quantity * price) FROM products WHERE id = ci.product_id) AS totalPrice,
    (SELECT DATE_FORMAT(creation_date, '%d/%m/%Y') FROM carts WHERE id = ?) creationDate
    FROM cart_items ci
    LEFT JOIN products ON products.id = ci.product_id
    WHERE cart_id = ?`

    let parameters = [cartID, cartID];

    let activeCartItems;
    try {
        activeCartItems = await connection.executeWithParameters(sql, parameters);
        return activeCartItems;
    } catch (error) {
        throw new ServerError(ErrorType.NO_CARTS_DATA);
    }
}

async function deleteCartItem(cartItemID, cartID) {
    let sql = `DELETE FROM cart_items WHERE id=? AND cart_id=?`;
    let parameters = [cartItemID, cartID];

    try {
        await connection.executeWithParameters(sql, parameters);
    } catch (error) {
        throw new ServerError(ErrorType.NO_CARTS_DATA);
    }
}

async function emptyCart(cartID) {
    let sql = `DELETE FROM cart_items WHERE cart_id=?`
    let parameters = [cartID];

    try {
        await connection.executeWithParameters(sql, parameters);
    } catch (error) {
        throw new ServerError(ErrorType.NO_CARTS_DATA);
    }
}

async function getCartID(userID) {
    let sql = `SELECT id FROM carts WHERE user_id = ?`
    let parameters = [userID];

    let cartID;
    try {
        cartID = await connection.executeWithParameters(sql, parameters);

        return cartID[0];
    } catch (error) {
        throw new ServerError(ErrorType.NO_CARTS_DATA);
    }
}

module.exports = {
    getUserDetails,
    getActiveCartID,
    addProductToCart,
    getActiveCartItems,
    deleteCartItem,
    emptyCart,
    updateCartIDInCache,
    getCartID
}