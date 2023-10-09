import { Router } from "express";
import HistoCtrlEC from "../Controller/histoCidadeEventsControl.js";

const histoEventCityRouter = new Router();
const histoCtrlEC = new HistoCtrlEC();

histoEventCityRouter
  .get("/:city", histoCtrlEC.consult)
  .post("/", histoCtrlEC.record)
  .put("/", histoCtrlEC.update)
  .delete("/", histoCtrlEC.delete);
// .get('/codigo' ,cidadeCTRL.consultarPeloCodigo);

export default histoEventCityRouter;
