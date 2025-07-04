
    CREATE TABLE users (
      id SERIAL PRIMARY KEY,
      username VARCHAR(255) NOT NULL,
      email VARCHAR(255) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL,
      is_admin BOOLEAN DEFAULT FALSE,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE events (
      id SERIAL PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      description TEXT,
      date TIMESTAMP NOT NULL,
      location VARCHAR(255),
      organizer_id INTEGER REFERENCES users(id),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE registrations (
      id SERIAL PRIMARY KEY,
      user_id INTEGER REFERENCES users(id),
      event_id INTEGER REFERENCES events(id),
      registration_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      UNIQUE(user_id, event_id)
    );
    