import mongoose from "mongoose"
import * as bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import Customer from './customer.model';
import User from '../user/user.model';
import Roles from '../roles/roles.model'

import { userInterface, userUpdateInterface } from "../user/user.interface"
import { customerInterface } from "./customer.interface";

interface customerUserInterface extends userInterface{
    customer: customerInterface
}

interface customerUserUpdateInterface extends userUpdateInterface{
    customer?: customerInterface,
    userId?: string
}


export const createCustomerService = async ({customer, ...user}: customerUserInterface) => {
    const session = await mongoose.startSession();

    const {email,password} = user
    const {rfc} = customer

    session.startTransaction() // Start transaction, help us if there a problem when we are creating both collections make a roleback
    
    const isRepeatedCustomer = await Customer.findOne({rfc})
    const isRepeatedEmail = await User.findOne({email})
    const role = await Roles.findOne({name: "customer"}) //Get the role

    if(isRepeatedEmail){
        throw new Error(`400-User with email: ${email} is repeated`)
    }

    if(isRepeatedCustomer){
        throw new Error(`400-Customer with rfc: ${rfc} is repeated`)
    }


    if (!role) { //Validate if the role doesn't exist
        throw new Error("428-It's necessary to ejecute seeder role before to call this endpoint")
    }

    try {

        const newCustomer = await Customer.create<customerUserInterface>([customer],{session})


        const userBody = { //Create new body with new field customer_id
            ...user,
            role_id: role._id, 
            password: bcrypt.hashSync(password,10),
            status: "approved",
            customer_id: newCustomer[0]._id  // Customer with session always returns an array
        }

        const newUser = await User.create([userBody],{session}) //Create user with customer id

        await session.commitTransaction() // Do the transaction create both collections
        session.endSession(); //End session

        const secretKey = process.env.SECRET_KEY || "S3CR3TK3Y$"

        const token = jwt.sign({id: newUser[0]._id}, secretKey)

        return token

    } catch (error) {
        await session.abortTransaction(); //If there are a error delete all actions
        session.endSession()
        console.log(error);
        
    }

}

export const getCustomerByTokenService = async (id?: string) => {
    const customer = await User.findById(id)
            .populate([{path: "role_id", select: "-_id"},{path: "customer_id", select: "-_id"}])
                .select("-password -status");

    return customer
}

export const updateCustomerByTokenService = async ({customer, userId, newPassword, ...user}: customerUserUpdateInterface) => {
    const {name, last_name, email, password} = user

    const body: userUpdateInterface = {}

    if (name) {
        body.name = name
    }

    if (last_name) {
        body.last_name = last_name
    }

    const session = await mongoose.startSession();
    session.startTransaction() // Start transaction, help us if there a problem when we are creating both collections make a roleback
        
    let newUser = await User.findById(userId);

    if (!newUser) {
        throw new Error('404-The customer id not found')
    }

    if ((email && !password) || (newPassword && !password)) {
        throw new Error('400-The password is necessary')
    }

    if (password &&!bcrypt.compareSync(password, newUser.password)) {
        throw new Error('401-The password is not valid')
    }

    if (newPassword) {
        body.password = bcrypt.hashSync(newPassword,10)
    }

    if (email) {
        const repeatedEmail = await User.findOne({email: email})

        if (repeatedEmail) {
            throw new Error(`400-The email ${email} allready exist`)
        }

        body.email = email
    }

    
    let newCustomer = await Customer.findById(newUser?.customer_id)
    
    if (!newCustomer){
        throw new Error('400-The customer dont exist')
    }
    
    newCustomer = await Customer.findOne({rfc: customer?.rfc})
    
    if (newCustomer) {
        throw new Error('400-The rfc is already registered')
    }
    
    try {
        newCustomer = await Customer.findByIdAndUpdate(newUser?.customer_id, customer,{new: true}).session(session) //Update customer
        

        newUser = await User.findByIdAndUpdate(userId, body, {new: true}).session(session).populate([{path: "role_id", select: "-_id"},{path: "customer_id", select: "-_id"}])
        .select("-password -status");

        await session.commitTransaction() // Do the transaction create both collections
        await session.endSession() 

        return newUser
    }catch(error:any){
        session.abortTransaction()
        session.endSession()
        console.log(error);
    }
}

export const deleteCustomerByTokenService = async (userId: string) => {

    let user = await User.findById(userId);
    
    if(!user){
        throw new Error('400-The user id not found');
    }
    
    let customer = await Customer.findById(user.customer_id)
    
    if (!customer) {
        throw new Error('400-The customer id not found')
    }
    
    try{
        await user.delete()
        await customer?.delete()

        return {msg: 'User was deleted'};
            
    }catch(error){
        console.log(error);
    }
}