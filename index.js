import express from "express";
import eventsRouter from "./Router/eventsRouter.js";
import cidadeRouter from "./Router/cidadeRouter.js";
import cors from "cors";

const server = express();
server.use(cors({ origin: "*" }));
//configurar a aplicação para aceitar objetos aninhados.
server.use(express.urlencoded({ extended: true }));

//configurar a aplicação para processar corretamente o formado json.
server.use(express.json());

server.use("/events", eventsRouter);
server.use("/city", cidadeRouter);

const localName = "localhost";
const serverName = "0.0.0.0";
const localPort = 3308;
const serverPort = 4018;

server.listen(serverPort, () => {
  console.log(`Service running on http://${serverName}:${serverPort}`);
});
