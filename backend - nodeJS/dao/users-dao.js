let connection = require("./connection-wrapper");
let ErrorType = require("./../errors/error-type");
let ServerError = require("./../errors/server-error");
let usersCache = require("../users-cache");

let saveDataForCache = (token, userData) => {
    usersCache.saveDataForCache(token, userData);
}

function getUserDetails(token) {
    let userCachedDetails = usersCache.getUserDetails(token);

    let userDetails = {
        userType: userCachedDetails.userType,
        userID: userCachedDetails.userID,
        cartID: userCachedDetails.cartID,
        cityID: userCachedDetails.cityID,
        street: userCachedDetails.street
    }

    return userDetails;
}

function deleteUserFromCache(token) {
    usersCache.deleteUserFromCache(token);
}

async function getCitiesList() {
    let sql = "SELECT id, name FROM cities";

    let citiesList;
    try {
        citiesList = await connection.execute(sql);
        return citiesList;
    }
    catch (error) {
        throw new ServerError(ErrorType.GENERAL_ERROR, sql, error);
    }
}

async function getUserByUsernameOrUserID(user) {
    let sql = `SELECT u.id as userID, u.first_name AS firstName, u.surname, u.username, u.password, c.name AS city, u.street, u.user_type AS userType
    FROM users u
    LEFT JOIN cities c ON u.city_id = c.id
    WHERE u.username =? OR u.id =?`;
    let parameters = [user.username, user.userID];

    let userLoginResult;
    try {
        userLoginResult = await connection.executeWithParameters(sql, parameters);
        return userLoginResult;
    }
    catch (error) {
        throw new ServerError(ErrorType.GENERAL_ERROR, sql, error);
    }
}

async function isUserExistByUsernameOrUserID(user) {
    let userLoginResult = await getUserByUsernameOrUserID(user);

    if (userLoginResult == null || userLoginResult.length == 0) {
        return false;
    }
    return true;
}

async function addUser(user) {
    let sql = "INSERT INTO users (id, first_name, surname, username, password, city_id, street) values(?, ?, ?, ?, ?, ?, ?)";
    let parameters = [user.userID, user.firstName, user.surname, user.username, user.password, user.cityID, user.street];

    try {
        await connection.executeWithParameters(sql, parameters);

        let newUser = {
            userID: user.userID,
            firstName: user.firstName,
            surname: user.surname,
            username: user.username,
            password: user.password,
            cityID: user.cityID,
            street: user.street,
            userType: 'Client',
            cartID: null
        }

        return newUser;
    }
    catch (error) {
        throw new ServerError(ErrorType.GENERAL_ERROR, sql, error);
    }
}

async function login(user) {
    let sql = `SELECT DISTINCT u.id AS userID, u.first_name AS firstName, u.surname, u.username, u.password, u.city_id AS cityID, u.street, u.user_type AS userType,
    (SELECT id FROM carts WHERE user_id = u.id AND is_open = 1) AS cartID
    FROM users u
    LEFT JOIN carts ON u.id = carts.user_id
    WHERE username =? and password =?`

    let parameters = [user.username, user.password];
    let userLoginResult;
    try {
        userLoginResult = await connection.executeWithParameters(sql, parameters);
    }
    catch (error) {
        throw new ServerError(ErrorType.GENERAL_ERROR, sql, error);
    }

    if (userLoginResult == null || userLoginResult.length == 0) {
        throw new ServerError(ErrorType.UNAUTHORIZED);
    }

    console.log("All good ! ")
    return userLoginResult[0];
}

module.exports = {
    login,
    isUserExistByUsernameOrUserID,
    addUser,
    saveDataForCache,
    getUserDetails,
    deleteUserFromCache,
    getCitiesList
}