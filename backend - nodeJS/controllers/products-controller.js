const express = require('express');
const productsLogic = require('../logic/products-logic');
const hostUrl = "http://localhost:3001/";

const router = express.Router();

//npm i --save multer
const multer = require('multer');
//npm i fs
const fs = require('fs');

// * * image upload
let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './products')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
})

let upload = multer({ storage: storage }).single('file')

router.post('/uploadImage', function (request, response) {
    let token = request.headers.authorization;
    if (!productsLogic.isAdmin(token)) {
        throw new ServerError(ErrorType.ACCESS_DENIED);
    }

    upload(request, response, function (error) {
        if (error instanceof multer.MulterError) {
            console.log(error);
            return;
        } else if (error) {
            console.log(error);
            return;
        }

        if (request.body.fileToDelete != undefined) {
            request.body.fileToDelete = request.body.fileToDelete.slice(hostUrl.length, request.body.fileToDelete.length);
            deleteImage(request.body.fileToDelete);
        }

        request.file.filename = hostUrl + request.file.filename;

        return response.status(200).send(request.file);
    })
});

//delete:
function deleteImage(imageForDelete) {
    fs.unlinkSync("./products/" + imageForDelete);
    console.log("File deleted");
}
// * *

//get products qty
router.get("/qty", async (request, response, next) => {
    try {
        let successfulProductsQty = await productsLogic.getProductsQty();
        response.json(successfulProductsQty)
    }
    catch (error) {
        return next(error)
    }
})

//get all categories
router.get("/categories", async (request, response, next) => {
    try {
        let successfulProductList = await productsLogic.getAllCategories()
        response.json(successfulProductList)
    }
    catch (error) {
        return next(error)
    }
})

//get all products
router.get("/", async (request, response, next) => {
    try {
        let successfulProductList = await productsLogic.getAllProducts()
        response.json(successfulProductList)
    }
    catch (error) {
        return next(error)
    }
})

//get product by category id
router.get("/byCategory", async (request, response, next) => {
    let categoryID = request.query.category;

    try {
        let successfulProductList = await productsLogic.getProductsByCategoryID(categoryID)
        response.json(successfulProductList)
    }
    catch (error) {
        return next(error)
    }
})

//add product
router.post("/", async (request, response, next) => {
    let token = request.headers.authorization;
    let product = request.body;

    try {
        let successfullNewProduct = await productsLogic.addProduct(product, token);
        response.json(successfullNewProduct);
    }
    catch (error) {
        return next(error)
    }
})

router.put("/", async (request, response, next) => {
    let token = request.headers.authorization;
    let product = request.body;

    try {
        await productsLogic.updateProduct(product, token);
        response.json()
    }
    catch (error) {
        return next(error)
    }
})

router.get("/byProductName", async (request, response, next) => {
    let productName = request.query.productName;

    try {
        let successfulProductList = await productsLogic.searchProduct(productName);
        response.json(successfulProductList)
    }
    catch (error) {
        return next(error)
    }
})

module.exports = router;