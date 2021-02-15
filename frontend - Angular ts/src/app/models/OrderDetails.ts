export class OrderDetails {
    public constructor(
        public orderDate?: string,
        public deliveryCityId?: string,
        public deliveryStreet?: string,
        public deliveryDate?: string,
        public creditCardDigits?: number,
    ) { }
}