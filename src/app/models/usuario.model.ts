export class Usuario{

    static fromFirebase({email, uid, nombre}:{email:string, uid:string, nombre:string}){
        return new Usuario(uid, nombre, email)
    }
    /**
     *
     */
    constructor(public uid:string, public nombre:string, public email:string) {
        
    }
}