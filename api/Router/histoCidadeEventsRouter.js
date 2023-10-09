import { Router } from "express";
import HistoCtrlEC from "../Controller/histoCidadeEventsControl.js";

const histoEventCityRouter = new Router();
const histoCtrlEC = new HistoCtrlEC();

histoEventCityRouter
  .get("/", histoCtrlEC.consult)
  .post("/", histoCtrlEC.record)
  .put("/", histoCtrlEC.update)
  .delete("/", histoCtrlEC.delete)
  .get("/codigo", histoCtrlEC.consultCod);

export default histoEventCityRouter;
