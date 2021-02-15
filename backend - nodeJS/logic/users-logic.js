let usersDao = require("../dao/users-dao");
const config = require('../config.json');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
let ServerError = require("../errors/server-error");
let ErrorType = require("../errors/error-type");
const formValidatorsUtils = require('../utils/FormValidatorsUtils');

//for hash use
const saltRight = "sdkjfhdskajh";
const saltLeft = "--mnlcfs;@!$ ";

function createHashPassword(password) {
    password = crypto.createHash("md5").update(saltLeft + password + saltRight).digest("hex");
    return password;
}

function generateToken(userData) {
    const token = jwt.sign({ sub: userData.username }, config.secret);
    return token;
}

function createSuccessfullLoginResponse(token, userData) {
    let successfullLoginResponse = { token: token, userType: userData.userType, username: userData.firstName, cartID: userData.cartID, cityID: userData.cityID, street: userData.street };
    return successfullLoginResponse;
}

async function getCitiesList(){
    let citiesList = await usersDao.getCitiesList();
    return citiesList;
}

async function addUser(user) {
    formValidatorsUtils.validateRegisterInputFields(user);

    //validations
    if (await usersDao.isUserExistByUsernameOrUserID(user)) {
        throw new ServerError(ErrorType.USER_ALREADY_EXISTS);
    }

    user.password = createHashPassword(user.password);

    let userRegisterData = await usersDao.addUser(user);

    const token = generateToken(userRegisterData);

    usersDao.saveDataForCache(token, userRegisterData);

    let successfullRegisterResponse = createSuccessfullLoginResponse(token, userRegisterData);

    return successfullRegisterResponse;
}

async function login(user) {
    formValidatorsUtils.validateLoginInputFields(user);

    user.password = createHashPassword(user.password);

    let userLoginData = await usersDao.login(user);

    const token = generateToken(userLoginData);

    usersDao.saveDataForCache(token, userLoginData);

    let successfullLoginResponse = createSuccessfullLoginResponse(token, userLoginData);
    return successfullLoginResponse;
}

function getUserDetails(token) {
    let pureToken = token.split(" ").pop()

    let userDetails = usersDao.getUserDetails(pureToken);

    return userDetails;
}

function deleteUserFromCache(token) {
    let pureToken = token.split(" ").pop()

    usersDao.deleteUserFromCache(pureToken);
}

module.exports = {
    addUser,
    login,
    getUserDetails,
    deleteUserFromCache,
    getCitiesList
}