export class UserRegisterDetails {
    constructor(
        public userID?: number,
        public firstName?: string,
        public surname?: string,
        public username?: string,
        public password?: string,
        public cityID?: number,
        public street?: string
    ) { }
}