import { createTicket, getAllTickets, deleteTicket, countTickets } from "./tickets.model.js";

export async function createTicketController(req, res) {
    const { title, comment } = req.body;
    const ticket = await createTicket(title, comment);
    res.json(ticket);
}

export async function getTicketsController(req, res) {
    const tickets = await getAllTickets();
    res.json(tickets);
}

export async function deleteTicketController(req, res) {
  try {
    const id = req.params.id;
    const success = await deleteTicket(id);

    if (!success) {
      return res.status(404).json({ error: "Ticket non trouvé" });
    }

    res.json({ message: "Ticket supprimé" });
  } catch (err) {
    res.status(500).json({ error: "Erreur serveur" });
  }
}

export async function countTicketsController(req, res) {
  try {
    const total = await countTickets();
    res.json({ total });
  } catch (err) {
    res.status(500).json({ error: "Erreur serveur" });
  }
}
