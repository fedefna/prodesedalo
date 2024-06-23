export type Roles = 'jugador' | 'admin';
export class User {
    uid?: string;
    nombre?: string;
    apellido?: string;
    fechaNaciemiento?: string;
    id?:string;
    role?: Roles;
    email?: string;
    emailVerificado?: boolean;
    prodeConfirmado?: boolean;

    constructor(){
        
    }
}