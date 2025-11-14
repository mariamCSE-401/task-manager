# Task Manager API

## Project Overview
This is a simple Task Manager API built with Node.js and Express. 
It allows you to manage tasks and check server health.

## Setup & Run Instructions

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd task-manager
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the server:**
   ```bash
   node src/server.js
   ```

4. **Access the server:**
   ```
   http://localhost:3000
   ```

## API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/` | GET | Welcome message |
| `/tasks` | GET | Retrieve all tasks with `id`, `title`, `completed`, `priority`, `createdAt` |
| `/tasks` | POST | Create a new task. Request body: `{ "title": "Task title", "priority": "low|medium|high" }` |
| `/tasks/task/:id` | GET | Retrieve a task by ID. Returns 400 if ID invalid, 404 if task not found |
| `/health` | GET | Returns server health and uptime in seconds |

## Notes

- Task IDs are numeric and auto-generated.  
- `priority` defaults to `low` if invalid or missing.  
- Use Postman or any API client to test the routes.
