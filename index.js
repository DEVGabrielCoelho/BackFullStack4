import express from "express";
import eventsRouter from "./Router/eventsRouter.js";
import cidadeRouter from "./Router/cidadeRouter.js";

const server = express();
server.use((req, res, next) => {
  console.log("Origem da solicitação:", req.get("origin"));

  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );

  next();
});
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
