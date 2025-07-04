import pool from '../config/db.js';

export const getAllEvents = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM events');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getEventById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM events WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Event not found' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createEvent = async (req, res) => {
  try {
    const { title, description, date, location } = req.body;
    const result = await pool.query(
      'INSERT INTO events (title, description, date, location, organizer_id) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [title, description, date, location, req.user.id]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, date, location } = req.body;
    const result = await pool.query(
      'UPDATE events SET title = $1, description = $2, date = $3, location = $4 WHERE id = $5 RETURNING *',
      [title, description, date, location, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Event not found' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('DELETE FROM events WHERE id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Event not found' });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
