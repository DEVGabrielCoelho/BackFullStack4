import { Router } from "express";
import HistoCtrlEC from "../Controller/cidadeControl.js";

const histoEventCityRouter = new Router();
const histoCtrlEC = new HistoCtrlEC();

histoCtrlEC
  .get("/", cidadeCTRL.consultar)
  .post("/", cidadeCTRL.gravar)
  .put("/", cidadeCTRL.atualizar)
  .delete("/", cidadeCTRL.excluir);
// .get('/codigo' ,cidadeCTRL.consultarPeloCodigo);

export default histoEventCityRouter;
