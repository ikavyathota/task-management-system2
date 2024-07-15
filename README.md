
# Task Management System

## Overview

The Task Management System is a web application designed to help users manage tasks efficiently. It includes features for user authentication, task creation, task updating, task deletion, and task notifications.

## Technologies Used

### Frontend
- React.js
- Axios for HTTP requests
- React Router for navigation

### Backend
- Node.js
- Express.js
- MySQL

## Setup Instructions

### Prerequisites
- Node.js (v14 or later)
- MySQL

### Environment Variables

Create a `.env` file in the `backend` directory with the following environment variables:
PORT=8000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=admin
DB_NAME=studentd
JWT_SECRET='secret123'


Replace `your_jwt_secret` with a strong secret key for JWT.

### Backend Setup

1. Clone the repository:
    ```sh
    git clone https://github.com/yourusername/task-management-system.git
    ```

2. Navigate to the `backend` directory:
    ```sh
    cd task-management-system/backend
    ```

3. Install backend dependencies:
    ```sh
    npm install
    ```

4. Start the backend server:
    ```sh
    npm start
    ```

### Frontend Setup

1. Navigate to the `frontend` directory:
    ```sh
    cd ../frontend
    

    ```

2. Install frontend dependencies:
    ```sh

    npm install
    ```

3. Start the frontend development server:
    ```sh
    cd client
    npm start
    ```

The frontend application will be available at `http://localhost:3000` and the backend API will be available at `http://localhost:8000`.

## API Documentation

### User Endpoints

#### Register a new user
- **URL:** `POST /api/users/register`
- **Body Parameters:**
  - `email`: string
  - `password`: string
- **Response:**
  - `201 Created` if the user is registered successfully.
  - `400 Bad Request` if the user already exists.

#### Login a user
- **URL:** `POST /api/users/login`
- **Body Parameters:**
  - `email`: string
  - `password`: string
- **Response:**
  - `200 OK` with JWT token if the login is successful.
  - `401 Unauthorized` if the authentication fails.

#### List all users
- **URL:** `GET /api/users/list`
- **Response:**
  - `200 OK` with a list of users.

### Task Endpoints

#### Create a new task
- **URL:** `POST /api/tasks/create`
- **Headers:** 
  - `Authorization: Bearer <token>`
- **Body Parameters:**
  - `title`: string
  - `description`: string
  - `dueDate`: string (ISO 8601 format)
  - `status`: string (`pending`, `in-progress`, `completed`)
  - `assignedTo`: string (user email)
  - `category`: string (`Low`, `Medium`, `High`)
  - `createdBy`: string (user email)
- **Response:**
  - `201 Created` if the task is created successfully.
  - `500 Internal Server Error` if task creation fails.

#### Fetch all tasks
- **URL:** `GET /api/tasks/list`
- **Headers:** 
  - `Authorization: Bearer <token>`
- **Response:**
  - `200 OK` with a list of tasks.

#### Fetch a specific task by ID
- **URL:** `GET /api/tasks/:id`
- **Headers:** 
  - `Authorization: Bearer <token>`
- **Response:**
  - `200 OK` if the task is found.
  - `404 Not Found` if the task does not exist.

#### Update a specific task by ID
- **URL:** `PUT /api/tasks/:id/update`
- **Headers:** 
  - `Authorization: Bearer <token>`
- **Body Parameters:**
  - Any of the following fields: `title`, `description`, `dueDate`, `status`, `assignedTo`, `category`
- **Response:**
  - `200 OK` if the task is updated successfully.
  - `400 Bad Request` if no valid fields are provided for update.
  - `500 Internal Server Error` if task update fails.

#### Delete a specific task by ID
- **URL:** `DELETE /api/tasks/:id/delete`
- **Headers:** 
  - `Authorization: Bearer <token>`
- **Response:**
  - `200 OK` if the task is deleted successfully.
  - `500 Internal Server Error` if task deletion fails.

#### Delete selected tasks
- **URL:** `DELETE /api/tasks/delete`
- **Headers:** 
  - `Authorization: Bearer <token>`
- **Body Parameters:**
  - `taskIds`: array of task IDs to be deleted
- **Response:**
  - `200 OK` if the selected tasks are deleted successfully.
  - `400 Bad Request` if task IDs are not provided as an array.
  - `500 Internal Server Error` if deletion fails.

## Design Decisions

### Frontend
- **React Context API**: Used for managing global state (user authentication and tasks) to simplify state management and avoid prop drilling.
- **Axios**: Used for making HTTP requests to the backend API, chosen for its simplicity and promise-based API.
- **React Router**: Used for client-side routing to provide a seamless navigation experience.

### Backend
- **Express.js**: Used as the web framework for building the REST API, chosen for its simplicity and flexibility.
- **MySQL**: Used as the database for storing user and task data, chosen for its reliability and support for structured data.
- **JWT**: Used for securing API endpoints and managing user authentication, chosen for its stateless nature and scalability.

This document provides a comprehensive overview of the setup and functionality of the Task Management System. If you have any further questions or need additional information, feel free to ask.

