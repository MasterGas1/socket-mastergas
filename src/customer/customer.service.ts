import * as bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import User from '../user/user.model';
import Roles from '../roles/roles.model'

import { userInterface, userUpdateInterface } from "../user/user.interface"

import messages from "../helper/messages";


interface customerUserUpdateInterface extends userUpdateInterface{
    userId?: string
}


export const createCustomerService = async ( user: userInterface) => {

    const {name, lastName, email,password,rfc} = user
    
    const isRepeatedRfc = await User.findOne({rfc})
    const isRepeatedEmail = await User.findOne({email})
    const role = await Roles.findOne({name: "customer"}) //Get the role

    if(isRepeatedEmail){
        throw new Error(messages["messagesSp"].emailExist)
    }

    if(isRepeatedRfc){
        throw new Error(messages["messagesSp"].rfcExist)
    }

    if (!role) { //Validate if the role doesn't exist
        throw new Error("428-It's necessary to ejecute seeder role before to call this endpoint")
    }

    try {

        const userBody = { //Create new body with new field customer_id
            ...user,
            role_id: role._id, 
            password: bcrypt.hashSync(password,10),
            status: "approved"
        }

        let newUser = new User(userBody) //Create new user

        newUser = await newUser.save() //Save new user

        const secretKey = process.env.SECRET_KEY || "S3CR3TK3Y$"

        const token = jwt.sign({id: newUser._id}, secretKey)

        return  {name, lastName, token, role: role.name}

    } catch (error) {
        console.log(error);
        throw new Error('500-Internal server error')
    }

}

export const getCustomerByTokenService = async (id?: string) => {
    const customer = await User.findById(id)
                .select("-password -status -role_id -createdAt -deleted, -_id");

    return customer
}

export const updateCustomerByTokenService = async ({userId, newPassword, ...user}: customerUserUpdateInterface) => {
    const {email, password, rfc} = user

    delete user.role_id;
    delete user.status;
    delete user.deleted;
    delete user.createdAt;
    delete user.addresses;
    
    let newUser = await User.findById(userId);

    if (!newUser) {
        throw new Error('404-The customer id not found')
    }

    if ((email && !password) || (newPassword && !password) || (rfc && !password)) {
        throw new Error('400-The password is necessary')
    }

    if (password &&!bcrypt.compareSync(password, newUser.password)) {
        throw new Error(messages["messagesSp"].passwordNotValid)
    }

    if (newPassword) {
        user.password = bcrypt.hashSync(newPassword,10)
    }

    if (email) {
        const repeatedEmail = await User.findOne({email: email})

        if (repeatedEmail) {
            throw new Error(messages["messagesSp"].emailExist)
        }
    }

    const repeatedRfc = await User.findOne({rfc:rfc})

    if (repeatedRfc) {
        throw new Error(messages["messagesSp"].rfcExist)
    }

        
    newUser = await User.findOne({rfc:rfc})
    
    if (newUser) {
        throw new Error(messages["messagesSp"].rfcExist)
    }
    
    try {
        
        newUser = await User.findByIdAndUpdate(userId, user, {new: true}).populate([{path: "role_id", select: "-_id"}])
        .select("-password -status -role_id -createdAt -deleted");


        return newUser
    }catch(error:any){
        console.log(error);
        throw new Error('500-Internal server error')
    }
}

export const deleteCustomerByTokenService = async (userId: string) => {

    let user = await User.findById(userId);
    
    if(!user){
        throw new Error('400-The user id not found');
    }
        
    try{
        await user.delete()

        return {msg: 'User was deleted'};
            
    }catch(error){
        console.log(error);
    }
}