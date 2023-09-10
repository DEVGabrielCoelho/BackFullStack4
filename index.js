import express from "express";
import eventsRouter from "./Router/eventsRouter.js";
import cors from "cors";

const server = express();
server.use(cors({ origin: "*" }));

//configurar a aplicação para aceitar objetos aninhados.
server.use(express.urlencoded({ extended: false }));

//configurar a aplicação para processar corretamente o formado json.
server.use(express.json());

server.use("/events", eventsRouter);

server.listen(3006, "localhost", () => {
  console.log("Server rodando em http://localhost:3006");
});
