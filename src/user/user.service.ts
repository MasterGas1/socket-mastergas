import User from "./user.model";
import { Response } from 'express';
import * as bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { badRequest } from "../helper/handleResponse";

export const createUser = async (body: any, res: Response) => {

    const { name } = body;

    const isRepeated = await User.findOne({ name });

    if (isRepeated) {
        return badRequest(res, 'The user is already registered')
    }

    const user = new User(body);

    const newUser = await user.save();

    return newUser;
}

export const auth = async (body: any, res: Response) => {
    const { email, password } = body;
    
    const user = await User.findOne({ email }).select('_id email password');
    if (!user) {
        throw new Error('400-Credentials are not valid (email)');
    }

    if(!bcrypt.compareSync(password, user.password)) {
        throw new Error('400-Credentials are not valid (password)');
    }

    const secretKey = process.env.SECRET_KEY || "S3CR3TK3Y$";

    const token = jwt.sign({ id: user._id }, secretKey);
    
    return {token, user};
}

export const getOneUser = (id: string) => {

    return User.findById(id)
}

export const getAllUsers = async () => {

    const users = await User.find();

    return users;
}