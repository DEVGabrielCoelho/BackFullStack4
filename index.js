import express from "express";
import eventsRouter from "./api/Router/eventsRouter.js";
import cidadeRouter from "./api/Router/cidadeRouter.js";
import histoEventCityRouter from "./api/Router/histoCidadeEventsRouter.js";
import cors from "cors";

const server = express();
server.use(cors({ origin: "*" }));
//configurar a aplicação para aceitar objetos aninhados.
server.use(express.urlencoded({ extended: true }));

//configurar a aplicação para processar corretamente o formado json.
server.use(express.json());

server.use("/events", eventsRouter);
server.use("/city", cidadeRouter);
server.use("/historico", histoEventCityRouter);

const localName = "localhost";
const serverName = "0.0.0.0";
const localPort = 3308;
const serverPort = 4018;

server.listen(localPort, () => {
  console.log(`Service running on http://${localName}:${localPort}`);
});
