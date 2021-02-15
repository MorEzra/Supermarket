export default class LoginUtils {
    public static setUsersCache = (token: string, username: string, userType: string, street: string, cityID: any) => {
        localStorage.setItem("token", token);
        localStorage.setItem("username", username);
        localStorage.setItem("userType", userType);
        localStorage.setItem("street", street);
        localStorage.setItem("cityID", cityID);
    }

    public static routeUserByUserType(userType, comp): void {
        if (userType == "Admin") {
            comp.router.navigate(["/admin"])
        } else if (userType == "Client") {
            comp.router.navigate(["home/purchase-status"]);
        } else {
            comp.router.navigate(["/home"]);
        }
    }
}