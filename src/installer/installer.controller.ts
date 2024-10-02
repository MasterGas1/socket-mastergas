import { Server, Socket } from "socket.io";

import { IUpdateInstallerCoordinates } from "./installer.interface";

import axiosDb from "../config/axios";

export default (socket: Socket, io: Server) => {
    socket.on("updateInstallerCoordinates", async (data: IUpdateInstallerCoordinates) => {

        const {token, longitude, latitude} = data;

        try {
            await axiosDb.put('/installer/coordinates', {
                    latitude,
                    longitude,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )
        } catch (error: any) {
            console.log(error.response.data)
        }
    })
}