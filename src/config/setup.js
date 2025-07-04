
import pool from './db.js';
import fs from 'fs';
import path from 'path';

const setupDatabase = async () => {
  const schema = fs.readFileSync(path.resolve(__dirname, 'schema.sql'), 'utf8');
  try {
    await pool.query(schema);
    console.log('Database setup complete.');
  } catch (error) {
    console.error('Error setting up database:', error);
  } finally {
    pool.end();
  }
};

setupDatabase();
