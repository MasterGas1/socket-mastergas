import express, { Application } from "express";
import cors from 'cors'

class Server {

    private app: Application;
    private port: string;

    constructor() {
        //Initialize express
        this.app = express();

        //Set Port of the server
        this.port = process.env.PORT || '8000';
    }

    listen() {
        //Set server PORT 
        this.app.listen(this.port, () => {
            console.log(`Server is running in port: ${this.port}`)
        })
    }

}

export default Server