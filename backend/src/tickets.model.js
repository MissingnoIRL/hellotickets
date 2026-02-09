import pool from "../config/database.js";

export async function createTicket(title, comment) {
    const result = await pool.query(
        "INSERT INTO tickets (title, comment) VALUES ($1, $2) RETURNING *",
        [title, comment]
    );
    return result.rows[0];
}

export async function getAllTickets() {
    const result = await pool.query("SELECT * FROM tickets ORDER BY id DESC");
    return result.rows;
}

export async function deleteTicket(id) {
  const result = await pool.query("DELETE FROM tickets WHERE id = $1", [id]);
  return result.rowCount > 0;
}

export async function countTickets() {
  const result = await pool.query("SELECT COUNT(*) FROM tickets");
  return parseInt(result.rows[0].count, 10);
}
