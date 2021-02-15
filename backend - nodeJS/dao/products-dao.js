let connection = require('./connection-wrapper')
let ErrorType = require("./../errors/error-type");
let ServerError = require("./../errors/server-error");
let usersCache = require("../users-cache");

function getUserDetails(token) {
    let userCachedDetails = usersCache.getUserDetails(token);
    return userCachedDetails;
}

async function getProductsQty() {
    let sql = `SELECT id AS productID FROM products`

    let productsQty;
    try {
        productsQty = await connection.execute(sql);
    }
    catch (error) {
        throw new ServerError(ErrorType.GENERAL_ERROR, sql, error)
    }

    if (productsQty == null || productsQty.length == 0) {
        throw new ServerError(ErrorType.NO_PRODUCTS_DATA)
    }

    productsQty = productsQty.length;

    return productsQty;
}

async function getAllProducts() {
    let sql = `SELECT p.id AS productID, p.name AS productName, p.category_id AS categoryID, c.name AS categoryName, p.price, p.image
    FROM products p LEFT JOIN
    categories c
    ON p.category_id = c.id`

    let productListResult;
    try {
        productListResult = await connection.execute(sql);
    }
    catch (error) {
        throw new ServerError(ErrorType.GENERAL_ERROR, sql, error)
    }

    if (productListResult == null || productListResult.length == 0) {
        throw new ServerError(ErrorType.NO_PRODUCTS_DATA)
    }

    return productListResult;
}

async function getAllCategories() {
    let sql = `SELECT id AS categoryID, name AS categoryName FROM categories`;

    try {
        categoryListResult = await connection.execute(sql);
    }
    catch (error) {
        throw new ServerError(ErrorType.GENERAL_ERROR, sql, error)
    }

    return categoryListResult;
}

async function getProductsByCategoryID(categoryID) {
    let sql = `SELECT p.id AS productID, p.name AS productName, p.category_id AS categoryID, c.name AS categoryName, p.price, p.image
    FROM products p LEFT JOIN
    categories c
    ON p.category_id = c.id WHERE c.id = ?`

    let parameters = [categoryID]

    let productListResult;
    try {
        productListResult = await connection.executeWithParameters(sql, parameters);
    }
    catch (error) {
        throw new ServerError(ErrorType.GENERAL_ERROR, sql, error)
    }

    if (productListResult == null || productListResult.length == 0) {
        throw new ServerError(ErrorType.NO_PRODUCTS_DATA)
    }

    return productListResult;
}

async function addProduct(product) {
    let sql = "INSERT INTO products (name, category_id, price, image) values(?, ?, ?, ?)";
    let parameters = [product.productName, product.categoryID, product.price, product.image];

    try {
        let response = await connection.executeWithParameters(sql, parameters);

        let newProduct = {
            productID: response.insertId,
            productName: product.productName,
            categoryID: product.categoryID,
            price: product.price,
            image: product.image
        }

        return newProduct;
    }
    catch (error) {
        throw new ServerError(ErrorType.GENERAL_ERROR, sql, error)
    }
}

async function updateProduct(product) {
    let sql = `UPDATE products SET name =?, category_id =?, price =?, image =? WHERE id =?`
    let parameters = [product.productName, product.categoryID, product.price, product.image, product.productID];

    try {
        await connection.executeWithParameters(sql, parameters)
    }
    catch (error) {
        throw new ServerError(ErrorType.GENERAL_ERROR, sql, error)
    }
}

async function searchProduct(productName) {
    let sql = `SELECT p.id AS productID, p.name AS productName, p.category_id AS categoryID, c.name AS categoryName, p.price, p.image
    FROM products p LEFT JOIN
    categories c
    ON p.category_id = c.id WHERE p.name LIKE CONCAT("%", ? , "%")`
    let parameters = [productName];
    try {
        let successfulProductList = await connection.executeWithParameters(sql, parameters);

        return successfulProductList;
    }
    catch (error) {
        throw new ServerError(ErrorType.NO_PRODUCTS_DATA);
    }
}

module.exports = {
    getUserDetails,
    getAllProducts,
    getAllCategories,
    getProductsByCategoryID,
    addProduct,
    updateProduct,
    getProductsQty,
    searchProduct
}