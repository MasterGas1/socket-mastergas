import express from 'express';
import http from 'http';
import { Server } from 'socket.io';

import socketConfig from './src/config/socket';

const VERSION = '/v1';

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.json());

socketConfig(io);


const PORT = process.env.PORT || 4001;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`))