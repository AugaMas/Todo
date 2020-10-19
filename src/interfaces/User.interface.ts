export interface UserDTOInterface {
    username: string;
    name: string;
    id: string;
}

export interface UserCredentialsInterface {
    username: string;
    password: string;
}

export interface UserReqInterface {
    name: string;
    username: string;
    password: string;
}

export interface UserInterface {
    name: string;
    username: string;
    passwordHash: string;
}
