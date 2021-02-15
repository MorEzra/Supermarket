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

async function getOrdersQty() {
    let sql = `SELECT id AS orderID FROM orders`

    let ordersQty;
    try {
        ordersQty = await connection.execute(sql);

        if (!ordersQty[0]) {
            return "0";
        }

        ordersQty = ordersQty.length;

        return ordersQty;
    }
    catch (error) {
        throw new ServerError(ErrorType.NO_ORDERS_DATA);
    }
}

async function getLastOrder(userID) {
    let sql = `SELECT DATE_FORMAT(order_date, '%d/%m/%Y') AS orderDate FROM orders WHERE user_id= ? ORDER BY order_date DESC LIMIT 1`

    let parameters = [userID];

    try {
        let lastOrderDetails = await connection.executeWithParameters(sql, parameters);
        
        if (!lastOrderDetails[0]) {
            return null;
        }

        return lastOrderDetails[0];
    } catch (error) {
        throw new ServerError(ErrorType.NO_ORDERS_DATA);
    }
}

async function getBusyDeliveryDates() {
    let sql = `SELECT delivery_date AS deliveryDate FROM orders GROUP BY delivery_date HAVING COUNT(*) >= 3;`

    let busyDeliveryDates;
    try {
        busyDeliveryDates = await connection.execute(sql);
        return busyDeliveryDates;
    }
    catch (error) {
        throw new ServerError(ErrorType.NO_ORDERS_DATA)
    }
}

async function placeOrder(userID, cartID, orderDetails) {
    let sql = `INSERT INTO orders
    (user_id, cart_id, total_price, delivery_city_id, delivery_street, delivery_date, order_date, credit_card_digits)
    VALUES (?, ?, (SELECT SUM(total_price) FROM cart_items WHERE cart_id = ?), ?, ?, ?, ?, ?);
    UPDATE carts SET is_open = 0 WHERE user_id = ? AND id = ?`

    let parameters = [userID, cartID, cartID, orderDetails.deliveryCityId, orderDetails.deliveryStreet, orderDetails.deliveryDate, orderDetails.orderDate, orderDetails.creditCardDigits, userID, cartID];

    try {
        await connection.executeWithParameters(sql, parameters);
    }
    catch (error) {
        throw new ServerError(ErrorType.NO_ORDERS_DATA)
    }
}

module.exports = {
    getOrdersQty,
    getLastOrder,
    getUserDetails,
    getBusyDeliveryDates,
    placeOrder,
    updateCartIDInCache,
}