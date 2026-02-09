const API_BASE_URL = "/api";

async function apiGet(path) {
  const response = await fetch(`${API_BASE_URL}${path}`);
  if (!response.ok) throw new Error("Erreur API GET");
  return response.json();
}

async function loadStats() {
  try {
    const data = await apiGet("/tickets/count");
    const countElement = document.getElementById("ticket-count");

    countElement.textContent = `Nombre total de tickets : ${data.total}`;
  } catch (err) {
    document.getElementById("ticket-count").textContent =
      "Erreur lors du chargement des statistiques";
  }
}

document.addEventListener("DOMContentLoaded", loadStats);
