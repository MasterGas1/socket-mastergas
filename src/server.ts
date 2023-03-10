import express, { Application, json } from "express";
import cors from 'cors'

import typeServiceRoutes from './type-service/type-service.route';
import userRoutes from './user/user.route';
import serviceRooute from './service/service.route'
import addressRoutes from './address/address.route'
import customerRoutes from './customer/customer.route'
import seederRoutes from './seeder/seeder.route';

class Server {

    private app: Application;
    private port: string;
    
    private apiPaths = {
        typeService: '/type-service',
        user: '/user',
        service: '/service',
        seeder: '/seeder',
        address: '/address',
        customer: '/customer'
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
        this.app.use(`${this.PATH}${this.apiPaths.user}`, userRoutes) //User
        this.app.use(`${this.PATH}${this.apiPaths.service}`, serviceRooute)
        this.app.use(`${this.PATH}${this.apiPaths.address}`, addressRoutes)
        this.app.use(`${this.PATH}${this.apiPaths.customer}`, customerRoutes)
        this.app.use(`${this.PATH}${this.apiPaths.seeder}`, seederRoutes) //Seeder
    }

    listen() { 
        //Set server PORT 
        this.app.listen(this.port, () => {
            console.log(`Server is running in port: ${this.port}`)
        })
    }

}

export default Server