export interface userInterface {
    name: string;
    lastName: string;
    email: string;
    password: string;
    rfc: string;
    taxResidence: string;
}

export interface userUpdateInterface {
    name?: string;
    lastName?: string;
    email?: string;
    password?: string;
    newPassword?: string,
    rfc?: string;
    taxResidence?: string;
    status?: string,
    role_id?: string
    createdAt?: Date;
    addresses?: string[]
    deleted?: boolean
}