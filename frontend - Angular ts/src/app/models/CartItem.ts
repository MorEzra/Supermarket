export class CartItem {
    public constructor(
        public cartItemID?: number,
        public productID?: number,
        public productName?: string,
        public quantity?: number,
        public price?: number,
        public image?: string,
        public totalPrice?: number,
        public creationDate? :string
    ) { }
}