import dotenv from 'dotenv';

import db from './db/connection';
import Server from './src/server';

dotenv.config();

//Lift server
const server = new Server();

//Show the server PORT
server.listen();

// Connect to database
// db()
