export class User {

    id: number;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phone: string;

    constructor(id: number, firstName: string, lastName: string, email: string, password: string, phone: string) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.phone = phone;
    }

}

  // class UserLogin for login procedure
export class UserLogin {
    email: string;
    password: string;

    constructor(email: string, password: string) {
        this.email = email;
        this.password = password;
    }
}
