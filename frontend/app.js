// ===============================
// Configuration
// ===============================

const API_BASE_URL = "/api";

// ===============================
// Utilitaires
// ===============================

async function apiGet(path) {
  const response = await fetch(`${API_BASE_URL}${path}`);
  if (!response.ok) throw new Error("Erreur API GET");
  return response.json();
}

async function apiPost(path, data) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
  if (!response.ok) throw new Error("Erreur API POST");
  return response.json();
}

async function apiDelete(path) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    method: "DELETE"
  });
  if (!response.ok) throw new Error("Erreur API DELETE");
  return true;
}

// ===============================
// Gestion des tickets
// ===============================

async function loadTickets() {
  try {
    const tickets = await apiGet("/tickets");
    const container = document.getElementById("ticket-list");

    if (!container) return;

    container.innerHTML = "";

    tickets.forEach(ticket => {
      const div = document.createElement("div");
      div.className = "ticket-item";
      div.innerHTML = `
        <h3>${ticket.title}</h3>
        <p>${ticket.comment}</p>
        <button class="delete-btn" data-id="${ticket.id}">Supprimer</button>
      `;
      container.appendChild(div);
    });

// Ajout des listeners pour les boutons supprimer
document.querySelectorAll(".delete-btn").forEach(btn => {
  btn.addEventListener("click", async (e) => {
    const id = e.target.dataset.id;

    if (!confirm("Voulez-vous vraiment supprimer ce ticket ?")) return;

    try {
      await apiDelete(`/tickets/${id}`);
      loadTickets(); // recharge la liste après suppression
    } catch (err) {
      alert("Erreur lors de la suppression");
    }
  });
});


  } catch (err) {
    alert("Erreur de chargement des tickets");
  }
}

// ===============================
// Création d’un ticket
// ===============================

function initTicketForm() {
  const form = document.getElementById("ticketForm");
  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const title = e.target.title.value.trim();
    const comment = e.target.comment.value.trim();

    if (!title || !comment) {
      alert("Veuillez remplir tous les champs");
      return;
    }

    try {
      await apiPost("/tickets", { title, comment });
      window.location.href = "tickets.html";
    } catch (err) {
      alert("Erreur lors de la création du ticket");
    }
  });
}

// ===============================
// Initialisation
// ===============================

document.addEventListener("DOMContentLoaded", () => {
  loadTickets();
  initTicketForm();
});
