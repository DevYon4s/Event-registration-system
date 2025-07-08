# Event Registration System Backend

This project provides the backend API for an event registration system, built with Node.js, Express.js, and PostgreSQL.

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
  - [Users](#users-endpoints)
  - [Events](#events-endpoints)
  - [Registrations](#registrations-endpoints)

## Features

- User registration and authentication (JWT)
- Event creation, viewing, updating, and deletion (admin only)
- User registration for events
- Viewing and canceling user registrations

## Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/en/download/) (LTS version recommended)
- [pnpm](https://pnpm.io/installation)
- [PostgreSQL Database](https://www.postgresql.org/download/) (e.g., a Neon.tech instance)
- An API client like [Postman](https://www.postman.com/) or [Insomnia](https://insomnia.rest/) for testing the API.

## Installation

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/DevYon4s/Event-registration-system.git
    cd Event-registration-system
    ```

2.  **Install dependencies:**

    ```bash
    pnpm install
    ```

## Configuration

Create a `.env` file in the root of your project and add the following environment variables:

```
DATABASE_URL=your_postgresql_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000
```

-   Replace `your_postgresql_connection_string` with the connection string to your PostgreSQL database (e.g., from Neon.tech).
-   Replace `your_jwt_secret` with a strong, random string. This will be used for signing JWTs.
-   `PORT` is optional; defaults to `5000` if not specified.

## Running the Application

1.  **Start the server:**

    ```bash
    npm start
    ```

    The server will start on the port specified in your `.env` file (default: 5000).

## API Endpoints

Use your API client (Postman, Insomnia, etc.) to test the following endpoints. Replace `http://localhost:5000` with your server's actual address and port if different.

### Users Endpoints

#### 1. Register a New User

-   **Method:** `POST`
-   **URL:** `/api/users`
-   **Headers:**
    -   `Content-Type`: `application/json`
-   **Body (raw, JSON):**
    ```json
    {
        "username": "testuser",
        "email": "test@example.com",
        "password": "password123"
    }
    ```
-   **Expected Response:** `201 Created` with the new user object.

#### 2. Login User

-   **Method:** `POST`
-   **URL:** `/api/users/login`
-   **Headers:**
    -   `Content-Type`: `application/json`
-   **Body (raw, JSON):**
    ```json
    {
        "email": "test@example.com",
        "password": "password123"
    }
    ```
-   **Expected Response:** `200 OK` with a `token` in the response body. **Save this token** for authenticated requests.

### Events Endpoints

#### 1. Get All Events

-   **Method:** `GET`
-   **URL:** `/api/events`
-   **Expected Response:** `200 OK` with an array of event objects.

#### 2. Create a New Event (Admin Only)

-   **Method:** `POST`
-   **URL:** `/api/events`
-   **Headers:**
    -   `Content-Type`: `application/json`
    -   `Authorization`: `Bearer <YOUR_JWT_TOKEN>` (Use the token from an admin user.)
-   **Body (raw, JSON):**
    ```json
    {
        "title": "Tech Conference 2025",
        "description": "A conference on the latest in technology.",
        "date": "2025-10-26T09:00:00Z",
        "location": "Convention Center"
    }
    ```
-   **Expected Response:** `201 Created` with the new event object.

#### 3. Get Event by ID

-   **Method:** `GET`
-   **URL:** `/api/events/:id` (Replace `:id` with an actual event ID.)
-   **Expected Response:** `200 OK` with the specific event object.

#### 4. Update Event (Admin Only)

-   **Method:** `PUT`
-   **URL:** `/api/events/:id`
-   **Headers:**
    -   `Content-Type`: `application/json`
    -   `Authorization`: `Bearer <YOUR_JWT_TOKEN>`
-   **Body (raw, JSON):**
    ```json
    {
        "title": "Updated Tech Conference 2025",
        "description": "An updated description for the conference.",
        "date": "2025-10-27T10:00:00Z",
        "location": "New Convention Hall"
    }
    ```
-   **Expected Response:** `200 OK` with the updated event object.

#### 5. Delete Event (Admin Only)

-   **Method:** `DELETE`
-   **URL:** `/api/events/:id`
-   **Headers:**
    -   `Authorization`: `Bearer <YOUR_JWT_TOKEN>`
-   **Expected Response:** `204 No Content`.

### Registrations Endpoints

#### 1. Create a Registration (Authenticated User)

-   **Method:** `POST`
-   **URL:** `/api/registrations`
-   **Headers:**
    -   `Content-Type`: `application/json`
    -   `Authorization`: `Bearer <YOUR_JWT_TOKEN>` (Use the token of the user who is registering.)
-   **Body (raw, JSON):**
    ```json
    {
        "userId": <USER_ID>,  // The ID of the user from your database
        "eventId": <EVENT_ID>  // The ID of the event you want to register for
    }
    ```
-   **Expected Response:** `201 Created` with the new registration object.

#### 2. Get User Registrations (Authenticated User)

-   **Method:** `GET`
-   **URL:** `/api/registrations/user/:userId` (Replace `:userId` with the ID of the user whose registrations you want to view.)
-   **Headers:**
    -   `Authorization`: `Bearer <YOUR_JWT_TOKEN>`
-   **Expected Response:** `200 OK` with an array of registration objects for that user.

#### 3. Cancel a Registration (Authenticated User)

-   **Method:** `DELETE`
-   **URL:** `/api/registrations/:id` (Replace `:id` with the ID of the registration to cancel.)
-   **Headers:**
    -   `Authorization`: `Bearer <YOUR_JWT_TOKEN>`
-   **Expected Response:** `204 No Content`.
