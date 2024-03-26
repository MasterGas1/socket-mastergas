export interface userInterface {
    name: string;
    last_name: string;
    email: string;
    password: string;
}

export interface userUpdateInterface {
    name?: string;
    last_name?: string;
    email?: string;
    password?: string;
    newPassword?: string
}