const express = require("express");
const server = express();
const cors = require('cors');

const loginFilter = require('./middlewares/login-filter');

const ErrorType = require("./errors/error-type");
const ServerError = require("./errors/server-error");
const errorHandler = require("./errors/error-handler");

const usersController = require("./controllers/users-controller");
const productsController = require("./controllers/products-controller");
const ordersController = require("./controllers/orders-controller");
const cartsController = require("./controllers/carts-controller");

server.use(express.static('./products'));

server.use(cors({ origin: "http://localhost:4200", credentials: true }));

server.use(express.json());

server.use(loginFilter());

server.use(function (err, req, res, next) {
    if (401 == err.status) {
        throw new ServerError(ErrorType.INVALID_TOKEN);
    }
});
server.use("/users", usersController);
server.use("/products", productsController);
server.use("/orders", ordersController);
server.use("/carts", cartsController);

server.use(errorHandler);

server.listen(3001, () => console.log(`Listening on http://localhost:3001`));