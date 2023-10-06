import { Router } from "express";
import CidadeControl from "../Controller/cidadeControl.js";

const cidadeRouter = new Router();
const cidadeCTRL = new CidadeControl();

cidadeRouter
  .get("/", cidadeCTRL.consultar)
  .post("/", cidadeCTRL.gravar)
  .put("/", cidadeCTRL.atualizar)
  .delete("/", cidadeCTRL.excluir);
// .get('/:codigo' ,cidadeCTRL.consultarPeloCodigo);

export default cidadeRouter;
