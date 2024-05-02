import User from "./user.model";
import Address from "../address/address.model"
import { Request, Response } from "express";
import * as bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import Roles from '../roles/roles.model'
const mongoose = require('mongoose');

import { badRequest } from "../helper/handleResponse";
import messages from "../helper/messages";
import validateRouteBody from "../helper/validateRoute";
import parseMongoId from "../helper/parseMongoId";

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

    if (!bcrypt.compareSync(password, user.password)) {
        throw new Error(messages['messagesSp'].authIncorrect);
    }

    const role = await Roles.findById(user.role_id);

    const secretKey = process.env.SECRET_KEY || "S3CR3TK3Y$";

    const token = jwt.sign({ id: user._id }, secretKey);

    return { token, user, role };
}

export const getOneUser = async (id: string) => {

    const user = await User.findById(id)
}

export const getAllUsers = async () => {

    const users = await User.find();

    return users;
}

export const addUserAddress = async (req: Request, res: Response) => {

    const { body } = req

    const { id } = req.params

    if (validateRouteBody(req, res))
        return;

    const isAddressRepeat = await Address.findOne({ name: body.name });

    if (isAddressRepeat) {
        throw new Error('The address is already registered')
    }
    try {
        const address = new Address(body);

        const newAddress = await address.save();

        if (!parseMongoId(id))// Verify if the id is valid
            throw new Error('The id is not uuid')

        const user = await User.findById(id);

        const addresses = user?.addresses;

        const isRepeat = await addresses?.find(address => address.toString() === newAddress?._id.toString());

        if (isRepeat) {
            throw new Error('The address is already registered on this user')
        }
        addresses?.push(newAddress._id);

        const userUpdated = await User.findOneAndUpdate(
            { _id: id },
            {
                $set: {
                    addresses: addresses
                }
            },
            { new: true }
        ).populate('addresses');

        return userUpdated;

    } catch (error) {
        throw new Error('Internal server error');
    }

}