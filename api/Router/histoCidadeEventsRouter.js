import { Router } from "express";
import HistoCtrlEC from "../Controller/cidadeControl.js";

const histoEventCityRouter = new Router();
const histoCtrlEC = new HistoCtrlEC();

histoEventCityRouter
  .get("/", histoCtrlEC.consultar)
  .post("/", histoCtrlEC.gravar)
  .put("/", histoCtrlEC.atualizar)
  .delete("/", histoCtrlEC.excluir);
// .get('/codigo' ,cidadeCTRL.consultarPeloCodigo);

export default histoEventCityRouter;
