export class User {
    public id: string;
    public username: string;
    public password: string;
    public firstName: string;
    public lastName: string;
    public email: string;
    public phone: string;
    public authorities: Array<any>;
    public enabled: boolean
    constructor() {
        this.id = '';
        this.username = '';
        this.password = '';
        this.firstName = '';
        this.lastName = '';
        this.email = '';
        this.phone = '';
        this.authorities = [];
        this.enabled = false;
    }
}