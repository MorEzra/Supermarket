let ServerError = require("../errors/server-error");
let ErrorType = require("../errors/error-type");

let numsAndLettersOnlyRegex = /^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*$/;
let lettersOnlyRegex = /^[A-Za-z _]*[A-Za-z][A-Za-z _]*$/;
let numsOnlyRegex = /^[0-9]*$/;
let emailRegex = /\S+@\S+\.\S+/;

function isRegexConditionValid(regex, value) {
    if (!new RegExp(regex).test(value)) {
        return false;
    }
    return true;
}

class FormValidatorsUtils {
    static validateQuantityField(product) {
        if (!product.quantity || product.quantity.toString().trim() == "") {
            let message = "Product was not added to cart, Please verify a quantity";

            ErrorType.INVALID_INPUT_FIELD.message = message;
            throw new ServerError(ErrorType.INVALID_INPUT_FIELD);
        }

        if (product.quantity <= 0) {
            let message = "Product was not added to cart, Please verify a valid quantity";

            ErrorType.INVALID_INPUT_FIELD.message = message;
            throw new ServerError(ErrorType.INVALID_INPUT_FIELD);
        }

        //to block html tags in input field (and any special character)
        if (!isRegexConditionValid(numsOnlyRegex, product.quantity.toString())) {
            let message = "Product was not added to cart, please use only numbers";

            ErrorType.INVALID_INPUT_FIELD.message = message;
            throw new ServerError(ErrorType.INVALID_INPUT_FIELD);
        }
    }

    static validateCheckoutFormFields(orderDetails, busyDeliveryDates) {
        if (!orderDetails.deliveryCityId ||
            !orderDetails.deliveryStreet ||
            !orderDetails.deliveryDate ||
            !orderDetails.creditCardDigits ||
            orderDetails.deliveryStreet.trim() == "" ||
            orderDetails.creditCardDigits.toString().trim() == "") {
            let message = "All fields must be filled";

            ErrorType.INVALID_INPUT_FIELD.message = message;
            throw new ServerError(ErrorType.INVALID_INPUT_FIELD);
        }

        //to block html tags in input field (and any special character)
        if (!isRegexConditionValid(numsAndLettersOnlyRegex, orderDetails.deliveryStreet)) {
            let message = "Please use only letters and numbers";

            ErrorType.INVALID_INPUT_FIELD.message = message;
            throw new ServerError(ErrorType.INVALID_INPUT_FIELD);
        }

        if (!isRegexConditionValid(numsOnlyRegex, orderDetails.creditCardDigits.toString())) {
            let message = "Please use only numbers";

            ErrorType.INVALID_INPUT_FIELD.message = message;
            throw new ServerError(ErrorType.INVALID_INPUT_FIELD);
        }

        if (!new RegExp(/^[0-9]*$/).test(orderDetails.deliveryCityId)) {
            let message = "City is not valid";

            ErrorType.INVALID_INPUT_FIELD.message = message;
            throw new ServerError(ErrorType.INVALID_INPUT_FIELD);
        }

        if (busyDeliveryDates.includes(new Date(orderDetails.deliveryDate))) {
            let message = "The delivery date you picked is busy, please pick another";
            ErrorType.INVALID_INPUT_FIELD.message = message;
            throw new ServerError(ErrorType.INVALID_INPUT_FIELD);
        }

        if (new Date(orderDetails.deliveryDate) < new Date()) {
            let message = "The delivery date you picked has passed, please pick another";
            ErrorType.INVALID_INPUT_FIELD.message = message;
            throw new ServerError(ErrorType.INVALID_INPUT_FIELD);
        }

        if (orderDetails.deliveryStreet.length < 2) {
            let message = "Street is too short";
            ErrorType.INVALID_INPUT_FIELD.message = message;
            throw new ServerError(ErrorType.INVALID_INPUT_FIELD);
        }

        if (orderDetails.creditCardDigits.toString().length < 4) {
            let message = "Credit card number is too short";
            ErrorType.INVALID_INPUT_FIELD.message = message;
            throw new ServerError(ErrorType.INVALID_INPUT_FIELD);
        }

        if (orderDetails.creditCardDigits.toString().length > 4) {
            let message = "Credit card number is too long";
            ErrorType.INVALID_INPUT_FIELD.message = message;
            throw new ServerError(ErrorType.INVALID_INPUT_FIELD);
        }
    }

    static validateUpdateProductFields(product) {
        if (!product.productName ||
            !product.categoryID ||
            !product.price ||
            !product.image ||
            product.productName.trim() == "" ||
            product.price.toString().trim() == "" ||
            product.image.trim() == "") {

            let message = "Product was not updated, All fields must be filled";

            ErrorType.INVALID_INPUT_FIELD.message = message;
            throw new ServerError(ErrorType.INVALID_INPUT_FIELD);
        }

        if (!isRegexConditionValid(numsAndLettersOnlyRegex, product.productName)) {
            let message = "Product was not updated, please use only letters and numbers";
            ErrorType.INVALID_INPUT_FIELD.message = message;
            throw new ServerError(ErrorType.INVALID_INPUT_FIELD);
        }

        if (!isRegexConditionValid(numsOnlyRegex, product.price.toString())) {
            let message = "Product was not updated, please use only numbers";
            ErrorType.INVALID_INPUT_FIELD.message = message;
            throw new ServerError(ErrorType.INVALID_INPUT_FIELD);
        }

        if (product.price <= 0) {
            let message = "Product was not updated, please fill a valid price";

            ErrorType.INVALID_INPUT_FIELD.message = message;
            throw new ServerError(ErrorType.INVALID_INPUT_FIELD);
        }

        if (product.productName.length < 2) {
            let message = "Product was not updated, product name is too short";

            ErrorType.INVALID_INPUT_FIELD.message = message;
            throw new ServerError(ErrorType.INVALID_INPUT_FIELD);
        }
    }

    static validateAddProductFields(product) {
        if (!product.productName ||
            !product.categoryID ||
            !product.price ||
            !product.image ||
            product.productName.trim() == "" ||
            product.price.toString().trim() == "") {
            let message = "Product was not added, All fields must be filled";

            ErrorType.INVALID_INPUT_FIELD.message = message;
            throw new ServerError(ErrorType.INVALID_INPUT_FIELD);
        }

        if (!isRegexConditionValid(numsAndLettersOnlyRegex, product.productName)) {
            let message = "Product was not updated, please use only letters and numbers";
            ErrorType.INVALID_INPUT_FIELD.message = message;
            throw new ServerError(ErrorType.INVALID_INPUT_FIELD);
        }

        if (!isRegexConditionValid(numsOnlyRegex, product.price.toString())) {
            let message = "Product was not updated, please use only numbers";
            ErrorType.INVALID_INPUT_FIELD.message = message;
            throw new ServerError(ErrorType.INVALID_INPUT_FIELD);
        }

        if (product.price <= 0) {
            let message = "Product was not added, please fill a valid price";

            ErrorType.INVALID_INPUT_FIELD.message = message;
            throw new ServerError(ErrorType.INVALID_INPUT_FIELD);
        }

        if (product.productName.length < 2) {
            let message = "Product was not added, product name is too short";

            ErrorType.INVALID_INPUT_FIELD.message = message;
            throw new ServerError(ErrorType.INVALID_INPUT_FIELD);
        }
    }

    static validateRegisterInputFields(user) {
        if (user.userID.toString().trim() == "" || user.firstName.trim() == "" ||
            user.surname.trim() == "" || user.username.trim() == "" ||
            user.password.trim() == "" || user.street.trim() == "") {
            let message = "All fields must be filled!";
            ErrorType.INVALID_INPUT_FIELD.message = message;
            throw new ServerError(ErrorType.INVALID_INPUT_FIELD);
        }

        if (!isRegexConditionValid(numsOnlyRegex, user.userID.toString())) {
            let message = "Please use only numbers";
            ErrorType.INVALID_INPUT_FIELD.message = message;
            throw new ServerError(ErrorType.INVALID_INPUT_FIELD);
        }

        if (!isRegexConditionValid(lettersOnlyRegex, user.surname)) {
            comp.noteToUser = "Please use only letters";
            ErrorType.INVALID_INPUT_FIELD.message = message;
            throw new ServerError(ErrorType.INVALID_INPUT_FIELD);
        }

        if (!isRegexConditionValid(numsAndLettersOnlyRegex, user.street) ||
            !isRegexConditionValid(numsAndLettersOnlyRegex, user.password)) {
            comp.noteToUser = "Please use only letters and numbers";
            ErrorType.INVALID_INPUT_FIELD.message = message;
            throw new ServerError(ErrorType.INVALID_INPUT_FIELD);
        }

        if (user.firstName.length < 2) {
            let message = "First name is too short";
            ErrorType.INVALID_INPUT_FIELD.message = message;
            throw new ServerError(ErrorType.INVALID_INPUT_FIELD);
        }

        if (user.firstName.length > 40) {
            let message = "First name is too long";
            ErrorType.INVALID_INPUT_FIELD.message = message;
            throw new ServerError(ErrorType.INVALID_INPUT_FIELD);
        }

        if (user.surname.length < 2) {
            let message = "Surname is too short";
            ErrorType.INVALID_INPUT_FIELD.message = message;
            throw new ServerError(ErrorType.INVALID_INPUT_FIELD);
        }

        if (user.surname.length > 40) {
            let message = "Surname is too long";
            ErrorType.INVALID_INPUT_FIELD.message = message;
            throw new ServerError(ErrorType.INVALID_INPUT_FIELD);
        }

        if (user.password.length < 6) {
            let message = "Password is too short";
            ErrorType.INVALID_INPUT_FIELD.message = message;
            throw new ServerError(ErrorType.INVALID_INPUT_FIELD);
        }

        if (user.password.length > 15) {
            let message = "Password is too long";
            ErrorType.INVALID_INPUT_FIELD.message = message;
            throw new ServerError(ErrorType.INVALID_INPUT_FIELD);
        }

        if (user.username.length < 6) {
            let message = "Username is too short";
            ErrorType.INVALID_INPUT_FIELD.message = message;
            throw new ServerError(ErrorType.INVALID_INPUT_FIELD);
        }

        if (user.username.length > 40) {
            let message = "Username is too long";
            ErrorType.INVALID_INPUT_FIELD.message = message;
            throw new ServerError(ErrorType.INVALID_INPUT_FIELD);
        }

        if (user.street.length < 2) {
            let message = "Street is too short";
            ErrorType.INVALID_INPUT_FIELD.message = message;
            throw new ServerError(ErrorType.INVALID_INPUT_FIELD);
        }

        if (user.street.length > 40) {
            let message = "Street is too long";
            ErrorType.INVALID_INPUT_FIELD.message = message;
            throw new ServerError(ErrorType.INVALID_INPUT_FIELD);
        }

        if (!isRegexConditionValid(emailRegex, user.username)) {
            let message = "Please enter a valid email address";
            ErrorType.INVALID_INPUT_FIELD.message = message;
            throw new ServerError(ErrorType.INVALID_INPUT_FIELD);
        }

        if (user.userID.toString().length > 9) {
            let message = "ID number is too long";
            ErrorType.INVALID_INPUT_FIELD.message = message;
            throw new ServerError(ErrorType.INVALID_INPUT_FIELD);
        }

        if (user.userID.toString().length < 8) {
            let message = "ID number is too short";
            ErrorType.INVALID_INPUT_FIELD.message = message;
            throw new ServerError(ErrorType.INVALID_INPUT_FIELD);
        }
    }

    static validateLoginInputFields(user) {
        if (user.username.trim() == "" || user.password.toString().trim() == "") {
            let message = "All fields must be filled!";
            ErrorType.INVALID_INPUT_FIELD.message = message;
            throw new ServerError(ErrorType.INVALID_INPUT_FIELD);
        }

        if (!isRegexConditionValid(numsAndLettersOnlyRegex, user.password)) {
            comp.noteToUser = "Please use only letters and numbers";
            ErrorType.INVALID_INPUT_FIELD.message = message;
            throw new ServerError(ErrorType.INVALID_INPUT_FIELD);
        }

        if (user.password.length < 6) {
            let message = "Password is too short";
            ErrorType.INVALID_INPUT_FIELD.message = message;
            throw new ServerError(ErrorType.INVALID_INPUT_FIELD);
        }

        if (user.username.length < 6) {
            let message = "Username is too short";
            ErrorType.INVALID_INPUT_FIELD.message = message;
            throw new ServerError(ErrorType.INVALID_INPUT_FIELD);
        }

        if (user.password.length > 15) {
            let message = "Password is too long";
            ErrorType.INVALID_INPUT_FIELD.message = message;
            throw new ServerError(ErrorType.INVALID_INPUT_FIELD);
        }

        if (user.username.length > 40) {
            let message = "Username is too long";
            ErrorType.INVALID_INPUT_FIELD.message = message;
            throw new ServerError(ErrorType.INVALID_INPUT_FIELD);
        }

        if (!isRegexConditionValid(emailRegex, user.username)) {
            let message = "Please enter a valid email address";
            ErrorType.INVALID_INPUT_FIELD.message = message;
            throw new ServerError(ErrorType.INVALID_INPUT_FIELD);
        }
    }
}

module.exports = FormValidatorsUtils;