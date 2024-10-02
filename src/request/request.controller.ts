import { Server, Socket } from "socket.io";

import { ICreateRequest, IResponseCreateRequest } from "./request.interface";

import axiosDb from "../config/axios";

export default (socket: Socket, io: Server) => {

    socket.on("createRequest", async (data: ICreateRequest) => {
       
       try {
        const response = await axiosDb.post<IResponseCreateRequest>("/request", data)

        socket.emit("responseRequest-" + response.data.customerId._id, response.data)
        socket.broadcast.emit("responseRequest-" + response.data.installerId._id, response.data)
        
       } catch (error: any) {
           console.log(error.response.data)
       }
    })
}