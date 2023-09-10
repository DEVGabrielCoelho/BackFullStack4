import { Router } from "express";
import EventCtrl from "../Controller/eventsControl.js";

const eventsRouter = new Router();
const eventsControl = new EventCtrl();

eventsRouter
  .post("/", eventsControl.record)
  .put("/", eventsControl.update)
  .delete("/", eventsControl.delete)
  .get("/", eventsControl.consult)
  .get("/:Title", eventsControl.consultTitle);

export default eventsRouter;
