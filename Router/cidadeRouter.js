import { Router } from "express";
import CidadeCTRL from "../Controle/CidadeCtrl.js";

const cidadeRouter = new Router();
const cidadeCTRL = new CidadeCTRL();

cidadeRouter
  .get("/", cidadeCTRL.consultar)
  .post("/", cidadeCTRL.gravar)
  .put("/", cidadeCTRL.atualizar)
  .delete("/", cidadeCTRL.excluir);
// .get('/codigo' ,cidadeCTRL.consultarPeloCodigo);

export default cidadeRouter;
