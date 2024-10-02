import { Server, Socket,  } from "socket.io";

import requestController from "../request/request.controller";
import installerController from "../installer/installer.controller";

export default (io: Server) => {
    io.on("connection", (socket: Socket) => {
        console.log("User connected: ", socket.id);


        requestController(socket,io);
        installerController(socket,io);

        socket.on("disconnect", () => {
            console.log("User disconnected: ", socket.id);
        });
    });
}