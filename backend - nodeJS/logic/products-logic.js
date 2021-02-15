const productsDao = require("../dao/products-dao");
const hostUrl = "http://localhost:3001/";
const formValidatorsUtils = require('../utils/FormValidatorsUtils');
let ServerError = require("../errors/server-error");
let ErrorType = require("../errors/error-type");

function getUserDetails(token) {
    let pureToken = token.split(" ").pop();

    let userCachedDetails = productsDao.getUserDetails(pureToken);

    return userCachedDetails;
}

function isAdmin(token) {
    let userCachedDetails = getUserDetails(token);
    let userType = userCachedDetails.userType;

    if (userType == "Admin") {
        return true;
    }
    return false;
}

async function getProductsQty() {
    let successfulProductsQty = await productsDao.getProductsQty();

    return successfulProductsQty;
}

async function getAllCategories() {
    let successfulCategoryList = await productsDao.getAllCategories();

    return successfulCategoryList;
}

async function getAllProducts() {
    let successfulProductList = await productsDao.getAllProducts();

    for (let product of successfulProductList) {
        product.image = hostUrl + product.image;
    }

    return successfulProductList;
}

async function getProductsByCategoryID(categoryID) {
    let successfulProductList = await productsDao.getProductsByCategoryID(categoryID);

    for (let product of successfulProductList) {
        product.image = hostUrl + product.image;
    }

    return successfulProductList;
}

async function addProduct(product, token) {
    if (!isAdmin(token)) {
        throw new ServerError(ErrorType.ACCESS_DENIED);
    }

    formValidatorsUtils.validateAddProductFields(product);

    product.image = product.image.slice(hostUrl.length, product.image.length);

    let newProduct = await productsDao.addProduct(product);

    newProduct.image = hostUrl + newProduct.image;

    return newProduct;
}

async function updateProduct(product, token) {
    if (!isAdmin(token)) {
        throw new ServerError(ErrorType.ACCESS_DENIED);
    }

    formValidatorsUtils.validateUpdateProductFields(product);

    product.image = product.image.slice(hostUrl.length, product.image.length);
    await productsDao.updateProduct(product);
}

async function searchProduct(productName) {
    let successfulProductList = await productsDao.searchProduct(productName);

    for (let product of successfulProductList) {
        product.image = hostUrl + product.image;
    }

    return successfulProductList;
}

module.exports = {
    isAdmin,
    getAllProducts,
    getAllCategories,
    getProductsByCategoryID,
    addProduct,
    updateProduct,
    getProductsQty,
    searchProduct
}