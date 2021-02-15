export class Product {
    public constructor(
        public productID?: number,
        public productName?: string,
        public categoryID?: number,
        public categoryName?: string,
        public price?: number,
        public image?: any,
        public quantity?: number
    ) { }
}