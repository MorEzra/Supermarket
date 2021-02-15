const express = require('express');
const usersLogic = require('../logic/users-logic');
const router = express.Router();
let ServerError = require("../errors/server-error");
let ErrorType = require("../errors/error-type");

//Login
router.post("/login", async (request, response, next) => {
    let user = request.body;

    try {
        let successfullLoginData = await usersLogic.login(user);
        response.json(successfullLoginData);
    }
    catch (error) {
        return next(error);
    }
});

//Register
router.post("/", async (request, response, next) => {
    let user = request.body;
    
    try {
        let successfullRegisterData = await usersLogic.addUser(user);
        response.json(successfullRegisterData);
    }
    catch (error) {
        return next(error)
    }
})

router.get("/", async (request, response, next) => {
    try {
        let token = request.headers.authorization;

        //in order to catch "slips" after I approved '/users/' on login filter
        if (!token) {
            throw new ServerError(ErrorType.INVALID_TOKEN);
        }

        let successfullUserDetails = await usersLogic.getUserDetails(token);
        response.json(successfullUserDetails);
    }
    catch (error) {
        return next(error)
    }
})

router.get("/cities", async (request, response, next) => {
    try {
        let successfullCitiesList = await usersLogic.getCitiesList();
        response.json(successfullCitiesList);
    }
    catch (error) {
        return next(error)
    }
})

router.post("/logout", async (request, response, next) => {
    try {
        let token = request.headers.authorization;

        //in order to catch "slips" after I approved '/users/' on login filter
        if (!token) {
            throw new ServerError(ErrorType.INVALID_TOKEN);
        }

        await usersLogic.deleteUserFromCache(token);
        response.json()
    }
    catch (error) {
        return next(error)
    }
})

module.exports = router;