export class User{
    id?: number;
    email: string;
    firstName: string;
    lastName: string;
    avatar: string;

    constructor( email:string, firstName :string, lastName:string, avatar:string){
        this.email = email,
        this.firstName = firstName,
        this.lastName = lastName,
        this.avatar = avatar
    }
}