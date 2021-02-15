import SnackbarUtils from "./SnackbarUtils";

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

export default class FormValidatorsUtils {
    public static isLoginFormFieldsValid(comp: any): boolean {
        if (!comp.userLoginDetails.username || !comp.userLoginDetails.password ||
            comp.userLoginDetails.username.trim() == "" || comp.userLoginDetails.password.trim() == "") {
            comp.noteToUser = "All fields must be filled";
            comp.isShowNoteToUser = true;
            return false;
        }

        //to block html tags in input field (and any special character)
        if (!isRegexConditionValid(numsAndLettersOnlyRegex, comp.userLoginDetails.password)) {
            comp.noteToUser = "Please use only letters and numbers";
            comp.isShowNoteToUser = true;
            return false;
        }

        if (comp.userLoginDetails.password.length < 6) {
            comp.noteToUser = "Password is too short";
            comp.isShowNoteToUser = true;
            return false;
        }

        if (comp.userLoginDetails.password.length > 15) {
            comp.noteToUser = "Password is too long";
            comp.isShowNoteToUser = true;
            return false;
        }

        if (comp.userLoginDetails.username.length < 6) {
            comp.noteToUser = "Email is too short";
            comp.isShowNoteToUser = true;
            return false;
        }

        if (comp.userLoginDetails.username.length > 40) {
            comp.noteToUser = "Email is too long";
            comp.isShowNoteToUser = true;
            return false;
        }

        if (!isRegexConditionValid(emailRegex, comp.userLoginDetails.username)) {
            comp.noteToUser = "Please enter a valid email address";
            comp.isShowNoteToUser = true;
            return false;
        }

        return true;
    }

    public static isRegisterFormFieldsValid(comp: any): boolean {
        if (!comp.userRegisterDetails.userID ||
            !comp.userRegisterDetails.username ||
            !comp.userRegisterDetails.password ||
            !comp.userRegisterDetails.firstName ||
            !comp.userRegisterDetails.surname ||
            !comp.userRegisterDetails.cityID ||
            !comp.userRegisterDetails.street ||
            comp.userRegisterDetails.userID.toString().trim() == "" ||
            comp.userRegisterDetails.username.trim() == "" ||
            comp.userRegisterDetails.password.trim() == "" ||
            comp.userRegisterDetails.firstName.trim() == "" ||
            comp.userRegisterDetails.surname.trim() == "" ||
            comp.userRegisterDetails.street.trim() == "") {
            comp.noteToUser = "All fields must be filled";
            comp.isShowNoteToUser = true;
            return false;
        }

        //to block html tags in input field (and any special character)
        if (!isRegexConditionValid(numsAndLettersOnlyRegex, comp.userRegisterDetails.password) ||
            !isRegexConditionValid(numsAndLettersOnlyRegex, comp.userRegisterDetails.firstName) ||
            !isRegexConditionValid(numsAndLettersOnlyRegex, comp.userRegisterDetails.street)) {
            comp.noteToUser = "Please use only letters and numbers";
            comp.isShowNoteToUser = true;
            return false;
        }

        if (!isRegexConditionValid(lettersOnlyRegex, comp.userRegisterDetails.surname)) {
            comp.noteToUser = "Please use only letters";
            comp.isShowNoteToUser = true;
            return false;
        }

        if (!isRegexConditionValid(numsOnlyRegex, comp.userRegisterDetails.userID.toString())) {
            let message = "Please use only numbers";
            SnackbarUtils.openSnackBar(message, "", comp);
            return false;
        }

        if (comp.userRegisterDetails.password.length < 6) {
            comp.noteToUser = "Password is too short";
            comp.isShowNoteToUser = true;
            return false;
        }

        if (comp.userRegisterDetails.password.length > 15) {
            comp.noteToUser = "Password is too long";
            comp.isShowNoteToUser = true;
            return false;
        }

        if (comp.userRegisterDetails.username.length < 6) {
            comp.noteToUser = "Email is too short";
            comp.isShowNoteToUser = true;
            return false;
        }

        if (comp.userRegisterDetails.username.length > 40) {
            comp.noteToUser = "Email is too long";
            comp.isShowNoteToUser = true;
            return false;
        }

        if (!isRegexConditionValid(emailRegex, comp.userRegisterDetails.username)) {
            comp.noteToUser = "Please enter a valid email address";
            comp.isShowNoteToUser = true;
            return false;
        }

        if (comp.userRegisterDetails.userID.toString().length > 9) {
            comp.noteToUser = "ID number is too long";
            return false;
        }

        if (comp.userRegisterDetails.userID.toString().length < 8) {
            comp.noteToUser = "ID number is too short";
            return false;
        }

        if (comp.userRegisterDetails.firstName.length < 2) {
            comp.noteToUser = "First name is too short";
            comp.isShowNoteToUser = true;
            return false;
        }

        if (comp.userRegisterDetails.firstName.length > 40) {
            comp.noteToUser = "First name is too long";
            comp.isShowNoteToUser = true;
            return false;
        }

        if (comp.userRegisterDetails.surname.length < 2) {
            comp.noteToUser = "Surname is too short";
            comp.isShowNoteToUser = true;
            return false;
        }

        if (comp.userRegisterDetails.surname.length > 40) {
            comp.noteToUser = "Surname is too long";
            comp.isShowNoteToUser = true;
            return false;
        }

        if (comp.userRegisterDetails.street.length < 2) {
            comp.noteToUser = "Street is too short";
            comp.isShowNoteToUser = true;
            return false;
        }

        if (comp.userRegisterDetails.street.length > 40) {
            comp.noteToUser = "Street is too long";
            comp.isShowNoteToUser = true;
            return false;
        }

        return true;
    }

    public static isUpdateProductFieldsValid(comp: any): boolean {
        if (!comp.updatedProduct.productName ||
            !comp.updatedProduct.categoryID ||
            !comp.updatedProduct.price ||
            !comp.updatedProduct.image ||
            comp.updatedProduct.productName.trim() == "" ||
            comp.updatedProduct.price.toString().trim() == "" ||
            comp.updatedProduct.image.trim() == "") {
            let message = "All fields must be filled";

            SnackbarUtils.openSnackBar(message, "", comp);
            return false;
        }

        //to block html tags in input field (and any special character)
        if (!isRegexConditionValid(numsAndLettersOnlyRegex, comp.updatedProduct.productName)) {
            let message = "Please use only letters and numbers";
            SnackbarUtils.openSnackBar(message, "", comp);
            return false;
        }

        //to block html tags in input field (and any special character)
        if (!isRegexConditionValid(numsOnlyRegex, comp.updatedProduct.price.toString())) {
            let message = "Please use only numbers";
            SnackbarUtils.openSnackBar(message, "", comp);
            return false;
        }

        if (comp.updatedProduct.price <= 0) {
            let message = "Please fill a valid price";

            SnackbarUtils.openSnackBar(message, "", comp);
            return false;
        }

        if (comp.updatedProduct.productName.length < 2) {
            let message = "Product name is too short";

            SnackbarUtils.openSnackBar(message, "", comp);
            return false;
        }

        if (comp.updatedProduct.productName.length > 40) {
            let message = "Product name is too long";

            SnackbarUtils.openSnackBar(message, "", comp);
            return false;
        }

        return true;
    }

    public static isAddProductFieldsValid(comp: any): boolean {
        if (!comp.newProduct.productName ||
            !comp.newProduct.categoryID ||
            !comp.newProduct.price ||
            !comp.newProduct.image ||
            comp.newProduct.productName.trim() == "" ||
            comp.newProduct.price.toString().trim() == "") {
            let message = "All fields must be filled";

            SnackbarUtils.openSnackBar(message, "", comp);
            return false;
        }

        //to block html tags in input field (and any special character)
        if (!isRegexConditionValid(numsAndLettersOnlyRegex, comp.newProduct.productName)) {
            let message = "Please use only letters and numbers";

            SnackbarUtils.openSnackBar(message, "", comp);
            return false;
        }

        //to block html tags in input field (and any special character)
        if (!isRegexConditionValid(numsOnlyRegex, comp.newProduct.price.toString())) {
            let message = "Please use only numbers";

            SnackbarUtils.openSnackBar(message, "", comp);
            return false;
        }

        if (comp.newProduct.price <= 0) {
            let message = "Please fill a valid price";

            SnackbarUtils.openSnackBar(message, "", comp);
            return false;
        }

        if (comp.newProduct.productName.length < 2) {
            let message = "Product name is too short";

            SnackbarUtils.openSnackBar(message, "", comp);
            return false;
        }

        if (comp.newProduct.productName.length > 40) {
            let message = "Product name is too long";

            SnackbarUtils.openSnackBar(message, "", comp);
            return false;
        }

        return true;
    }

    public static isCheckoutFormFieldsValid(comp: any): boolean {
        if (!comp.orderDetails.deliveryCityId ||
            !comp.orderDetails.deliveryStreet ||
            !comp.orderDetails.deliveryDate ||
            !comp.orderDetails.creditCardDigits ||
            comp.orderDetails.deliveryCityId.trim() == "" ||
            comp.orderDetails.deliveryStreet.trim() == "" ||
            comp.orderDetails.creditCardDigits.toString().trim() == "") {
            comp.noteToUser = "All fields must be filled";
            comp.isShowNoteToUser = true;
            return false;
        }

        //to block html tags in input field (and any special character)
        if (!isRegexConditionValid(numsAndLettersOnlyRegex, comp.orderDetails.deliveryStreet)) {
            let message = "Please use only letters and numbers";

            SnackbarUtils.openSnackBar(message, "", comp);
            return false;
        }

        //to block html tags in input field (and any special character)
        if (!isRegexConditionValid(numsOnlyRegex, comp.orderDetails.creditCardDigits.toString())) {
            let message = "Please use only numbers";

            SnackbarUtils.openSnackBar(message, "", comp);
            return false;
        }

        if (comp.busyDeliveryDates.includes(new Date(comp.orderDetails.deliveryDate))) {
            comp.noteToUser = "The delivery date you picked is busy, Please pick another";
            comp.isShowNoteToUser = true;
            return false;
        }

        if (comp.orderDetails.deliveryStreet.length < 2) {
            comp.noteToUser = "Street is too short";
            comp.isShowNoteToUser = true;
            return false;
        }

        if (comp.orderDetails.creditCardDigits.toString().length < 8) {
            comp.noteToUser = "Credit card number is too short";
            comp.isShowNoteToUser = true;
            return false;
        }

        if (comp.orderDetails.creditCardDigits.toString().length > 16) {
            comp.noteToUser = "Credit card number is too long";
            comp.isShowNoteToUser = true;
            return false;
        }

        return true;
    }

    public static isQuantityFieldValid(comp: any): boolean {
        if (!comp.product.quantity || comp.product.quantity.toString().trim() == "") {
            let message = "Please verify a quantity";

            SnackbarUtils.openSnackBar(message, "", comp);
            return false;
        }

        if (comp.product.quantity <= 0) {
            let message = "Please verify a valid quantity";

            SnackbarUtils.openSnackBar(message, "", comp);
            return false;
        }

        //to block html tags in input field (and any special character)
        if (!isRegexConditionValid(numsOnlyRegex, comp.product.quantity.toString())) {
            let message = "Please use only numbers";

            SnackbarUtils.openSnackBar(message, "", comp);
            return false;
        }

        return true;
    }

}