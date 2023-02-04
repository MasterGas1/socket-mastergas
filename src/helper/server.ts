import express, { Application } from "express";
import cors from 'cors'

class Server {

    private app: Application;
    private port: string;

    constructor() {
        this.app = express();

        //Set Port of the server
        this.port = process.env.PORT || '8000';
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Server is running in port: ${this.port}`)
        })
    }

}

export default Server