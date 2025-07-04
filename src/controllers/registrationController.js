import pool from '../config/db.js';

export const createRegistration = async (req, res) => {
  try {
    const { userId, eventId } = req.body;
    const result = await pool.query(
      'INSERT INTO registrations (user_id, event_id) VALUES ($1, $2) RETURNING *',
      [userId, eventId]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getUserRegistrations = async (req, res) => {
  try {
    const { userId } = req.params;
    const result = await pool.query('SELECT * FROM registrations WHERE user_id = $1', [userId]);
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const cancelRegistration = async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query('DELETE FROM registrations WHERE id = $1', [id]);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
