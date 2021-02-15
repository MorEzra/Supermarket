import { CartItem } from "../models/CartItem";

export default class CartUtils {
    public static getCartItemIndex(cartItems: CartItem[], cartItem: CartItem) {
        let index = cartItems.map(function (cartItemToFind: CartItem) {
            return cartItemToFind.cartItemID;
        }).indexOf(cartItem.cartItemID);

        return index;
    }

    public static calcTotalCartPrice(cartItems): number {
        let totalCartPrice = 0;

        for (let item of cartItems) {
            totalCartPrice = totalCartPrice + +item.totalPrice;
        }

        return totalCartPrice;
    }

    public static initUserPurchaseDetails(ordersService, cartsService): void {
        ordersService.lastOrderDetails = {};
        cartsService.setActiveCartItems.next([]);
        cartsService.totalCartPrice = 0;
    }
}