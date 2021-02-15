let ErrorType = {
    GENERAL_ERROR: { id: 1, httpCode: 600, message: "Oops, something went wrong...Please try again", isShowStackTrace: true },
    USER_ALREADY_EXISTS: { id: 2, httpCode: 601, message: "User already exists", isShowStackTrace: false },
    UNAUTHORIZED: { id: 3, httpCode: 401, message: "Login failed, invalid username or password", isShowStackTrace: false },
    NO_PRODUCTS_DATA: { id: 4, httpCode: 500, message: "Winter made people hungrier...please come back later", isShowStackTrace: true },
    NO_ORDERS_DATA: { id: 5, httpCode: 410, message: "No orders have been placed yet", isShowStackTrace: false },
    NO_CARTS_DATA: { id: 5, httpCode: 410, message: "No carts available", isShowStackTrace: true },
    INVALID_TOKEN: { id: 6, httpCode: 403, message: "Oops, something went wrong...try re-logging", isShowStackTrace: false },
    INVALID_INPUT_FIELD: { id: 7, httpCode: 400, message: "Some of the input fields are incorrect, please fix", isShowStackTrace: false },
    ACCESS_DENIED: { id: 8, httpCode: 401, message: "You are unauthorized for this kind of action.", isShowStackTrace: false },
}

module.exports = ErrorType;