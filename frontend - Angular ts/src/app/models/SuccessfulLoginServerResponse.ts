export class SuccessfulLoginServerResponse {
    public constructor(
        public token?: string,
        public userType?: string,
        public username?: string,
        public cityID?: number,
        public street?: string,
        public cartID?: number
    ) { }
}