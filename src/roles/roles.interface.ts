import { ObjectId, ObjectIdSchemaDefinition } from "mongoose";

export interface RolesInterface {
    name: string;
    lastName: string;
    email: string;
    password: string;
    role_id: any;

}