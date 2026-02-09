import express from "express";
import { createTicketController, getTicketsController, deleteTicketController, countTicketsController } from "./ticket.controller.js";

const router = express.Router();

router.post("/tickets", createTicketController);
router.get("/tickets", getTicketsController);
router.delete("/tickets/:id", deleteTicketController);
router.get("/tickets/count", countTicketsController);

export default router;
