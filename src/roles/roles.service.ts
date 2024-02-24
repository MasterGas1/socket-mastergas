import mongoose from "mongoose";
import Role from './roles.model';
import parseMongoId from "../helper/parseMongoId";
import { Request } from "express";

type RoleType = {
    _id?: mongoose.Schema.Types.ObjectId
    name: string
    permissions: string[]
}

export const createRole = async (role: RoleType) => {

    const { name } = role

    const session = await mongoose.startSession();

    const isRepeatedRole = await Role.findOne({ name });
    if (isRepeatedRole) {
        throw new Error(`Role with name: ${name} is repeated`);
    }

    const newRole = new Role(role)

    await newRole.save();

    return newRole
}

export const getOneRole = (id: string) => {

    return Role.findById(id)
}

export const getAllRoles = async () => {

    const roles = await Role.find();

    return roles;
}

export const updateRole = async (req: Request) => {

    const { id } = req.params
    const { name, permissions } = req.body

    const session = await mongoose.startSession();

    if (!parseMongoId(id)) {
        throw new Error('The id is not uuid');
    }

    const roleFound = await Role.findById(id).session(session);
    if (!roleFound) {
        throw new Error('Role not found');
    }

    const isRepeatedRole = await Role.findOne({ name });
    if (isRepeatedRole) {
        throw new Error(`Role with name: ${name} is repeated`);
    }

    const roleUpdated = await Role.findByIdAndUpdate(id, {
        name,
        permissions
    },
        {
            new: true,
        }

    )
    await session.commitTransaction();
    session.endSession();

    return roleUpdated;
}

export const destroyRole = async (req: Request) => {
    const { id } = req.params

    if (!parseMongoId(id)) {
        throw new Error('The id is not uuid');
    }

    const roleFound = await Role.findById(id);

    if (!roleFound) {
        throw new Error('Role not found');
    }

    await roleFound.delete();

    return { msg: 'Role was deleted' };
}