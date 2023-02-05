import dotenv from 'dotenv';
import db from './db/connection';
import Server from './src/helper/server';

dotenv.config();

const server = new Server;

server.listen();

db()
