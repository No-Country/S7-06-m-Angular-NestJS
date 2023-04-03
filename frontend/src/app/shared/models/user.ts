export class User{
    id?: number;
    email: string;
    first_name: string;
    last_name: string;
    avatar: string;

    constructor( email:string, name:string, lName:string, avatar:string){
        this.email = email,
        this.first_name = name,
        this.last_name = lName,
        this.avatar = avatar
    }
}