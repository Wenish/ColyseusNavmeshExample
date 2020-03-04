import { Server } from "colyseus"
import { monitor } from '@colyseus/monitor';
import { createServer } from "http"
import express from "express"

import rooms from './rooms'

const port = Number(process.env.port) || 3000

const app = express()
app.use(express.json())

const gameServer = new Server({
  server: createServer(app)
});

gameServer.define('match', rooms.Match)

const monitorUrl = '/colyseus'
app.use(monitorUrl, monitor());

gameServer.listen(port)

console.log(`Game Server started on http://localhost:${ port }`);
console.log(`Monitor started on http://localhost:${ port }${monitorUrl}`);