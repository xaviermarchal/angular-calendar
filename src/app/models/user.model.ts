export class User {
    constructor(
        public id: string,
        public fname: string,
        public name: string,
        public color: string,
        public selected = false
    ) {}
}
