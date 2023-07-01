export interface IUserReq {
    name: string,
    surname: string,
    email: string,
    tel: string,
    password: string,
    role: ROLE
}

export interface IUser extends IUserReq {
    id: number
}

export enum ROLE {
    USER = 'USER',
    ADMIN = 'ADMIN'
}