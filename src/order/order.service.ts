import mongoose from "mongoose";
import { Request } from "express";
import Order from "./order.model";
import messages from "../helper/messages";

export const createOrder = async (body: any) => {
    const newOrder = new Order(body);

    await newOrder.save();

    const populatedOrder = await Order.findById(newOrder._id)
        .populate('serviceId')
        .populate('installerUserId')
        .populate('customerUserId');

    return populatedOrder;
}

export const getAllOrders = async () => {
    return await Order.find()
        .populate('serviceId')
        .populate('installerUserId')
        .populate('customerUserId');
}

export const getOneOrder = async (id: string) => {
    const order = await Order.findById(id)
        .populate('serviceId')
        .populate('installerUserId')
        .populate('customerUserId');

    if (!order) {
        throw new Error(messages["messageOrder"].orderNotFound)
    }
    return order;
}