import SnackbarUtils from "./SnackbarUtils";

export default class ErrorHandlerUiUtils {

    public static handleErrorsOnUi(router: any, serverErrorResponse: any, comp: any) {
        let message = serverErrorResponse.error.error;
        console.log(serverErrorResponse.status + ": " + serverErrorResponse.error.error);

        //this block handles SERVER DOWN - http module error
        if (serverErrorResponse.status === 0) {
            let message = "We are sorry, the service is not available at the moment.\nPlease come back later."
            SnackbarUtils.openSnackBar(message, "", comp);
            return;
        }

        if (serverErrorResponse.status === 401 || serverErrorResponse.status === 410 || serverErrorResponse.status === 601) {
            SnackbarUtils.openSnackBar(message, "", comp);
            return;
        }

        if (serverErrorResponse.status === 404 || serverErrorResponse.status === 600 || serverErrorResponse.status === 500) {
            SnackbarUtils.openSnackBar(message, "", comp);
            this.sendToPageNotFound(router);
            return;
        }


        //this block handles INVALID_TOKEN
        if (serverErrorResponse.status === 403) {
            SnackbarUtils.openSnackBar(message, "", comp);
            this.sendBackToHomePage(router);
            return;
        }

        console.log(serverErrorResponse.message);
        SnackbarUtils.openSnackBar(serverErrorResponse.error.error, "", comp);
    }

    public static sendBackToHomePage(router) {
        setTimeout(() => {
            localStorage.clear();
            router.navigate(["home"])
        }, 2200)
    }

    public static sendToPageNotFound(router) {
        setTimeout(() => {
            router.navigate(["pageNotFound"])
        }, 2200)
    }
}