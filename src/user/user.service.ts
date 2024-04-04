import User from "./user.model";
import { Response } from 'express';
import * as bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import Roles from '../roles/roles.model'

import { badRequest } from "../helper/handleResponse";
import messages from "../helper/messages";

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
    
    const user = await User.findOne({ email });
    if (!user) {
        throw new Error(messages['messagesSp'].authIncorrect);
    }

    if(!bcrypt.compareSync(password, user.password)) {
        throw new Error(messages['messagesSp'].authIncorrect);
    }

    const role = await Roles.findById(user.role_id);

    const secretKey = process.env.SECRET_KEY || "S3CR3TK3Y$";

    const token = jwt.sign({ id: user._id }, secretKey);
    
    return {token, user, role};
}

export const getOneUser = (id: string) => {

    return User.findById(id)
}

export const getAllUsers = async () => {

    const users = await User.find();

    return users;
}