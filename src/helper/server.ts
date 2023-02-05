import express, { Application, json } from "express";
import cors from 'cors'

import typeServiceRoutes from '../type-service/type-service.route';

class Server {

    private app: Application;
    private port: string;
    
    private apiPaths = {
        typeService: '/type-service'
    }

    private PATH = '/api/v1'

    constructor() {
        //Initialize express
        this.app = express();

        // Allow receive jsons into server
        this.app.use( json());

        //Set Port of the server
        this.port = process.env.PORT || '4000';

        //Initialize routes
        this.routes()
    }

    //Set routes 
    routes(){
        this.app.use(`${this.PATH}${this.apiPaths.typeService}`, typeServiceRoutes) //Type Service
    }

    listen() {
        //Set server PORT 
        this.app.listen(this.port, () => {
            console.log(`Server is running in port: ${this.port}`)
        })
    }

}

export default Server