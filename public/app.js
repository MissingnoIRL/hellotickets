// ===============================
// Configuration
// ===============================

//const API_BASE_URL = "http://localhost:8888";


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

    if (!container) return; // On est sur une autre page

    container.innerHTML = "";

    tickets.forEach(ticket => {
      const div = document.createElement("div");
      div.className = "ticket-item";
      div.innerHTML = `
        <h3>${ticket.titre}</h3>
        <p>${ticket.description}</p>
        <button class="delete-btn" data-id="${ticket.id}">🗑️ Supprimer</button>
      `;
      container.appendChild(div);
    });

    // Ajout des listeners sur les boutons
    document.querySelectorAll(".delete-btn").forEach(btn => {
      btn.addEventListener("click", () => deleteTicket(btn.dataset.id));
    });

  } catch (err) {
    alert("Erreur de chargement des tickets");
  }
}

async function deleteTicket(id) {
  if (!confirm("Supprimer ce ticket ?")) return;

  try {
    await apiDelete(`/delete-ticket/${id}`);
    window.location.reload();
  } catch (err) {
    alert("Erreur lors de la suppression");
  }
}


// ===============================
// Création d’un ticket
// ===============================

function initTicketForm() {
  const form = document.getElementById("ticketForm");
  if (!form) return; // On n'est pas sur la page index.html

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const title = e.target.title.value.trim();
    const comment = e.target.comment.value.trim();

    if (!title || !comment) {
      alert("Veuillez remplir tous les champs");
      return;
    }

    try {
      await apiPost("/save-ticket", { title, comment });
      window.location.href = "tickets.html";
    } catch (err) {
      alert("Erreur lors de la création du ticket");
    }
  });
}


// ===============================
// Initialisation automatique
// ===============================

document.addEventListener("DOMContentLoaded", () => {
  loadTickets();
  initTicketForm();
});
