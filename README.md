# Kanban Board Frontend

This project is the frontend for a Kanban task management application.
It provides a visual Kanban board where users can create lists and
manage tasks.

The application connects to a backend REST API to store and retrieve
data. Users can organize their tasks into lists and move them between
lists using drag and drop.

# What This App Does

Users can:

-   Register an account
-   Log in
-   Create lists (columns)
-   Add tasks to lists
-   Edit tasks
-   Delete tasks
-   Drag tasks between lists
-   View tasks in a Kanban board layout

Each user only sees their own lists and tasks.

# Tech Stack

This project uses the following technologies:

-   React
-   Vite
-   Redux Toolkit
-   React Router
-   Axios
-   React Hook Form
-   Yup validation
-   Bootstrap / React Bootstrap
-   React Toastify
-   Hello Pangea DnD (drag and drop)

# Backend API

This frontend connects to a backend API.

Example API base URL:

/api/v1

Example endpoints used:
```
POST /auth/login

POST /auth/create-account

GET /lists POST /lists

GET /tasks POST /tasks
```
# Demo Credentials
- **Email** - `demo.user1.chariot057@aleeas.com`
- **Password** - `demo@1234`

# Environment Setup

Create a `.env` file in the project root.

Example:
```
VITE_API_URL=http://localhost:5000/api/v1
```
This variable is used to configure the backend API URL.

# Getting Started
1.  Clone the repository
```
git clone https://github.com/vipulsawant8/kanban-board-frontend.git
```
2.  Install dependencies
```
npm install
```
3.  Start the development server
```
npm run dev
```
# Build for Production

Create a production build:
```
npm run build
```
Preview the production build:
```
npm run preview
```
# Notes

This project was built for learning purposes to practice:

-   React application structure
-   State management with Redux
-   API integration
-   Drag and drop interfaces
-   Form validation
-   Mock user, lists & tasks are added for demo

# License

MIT License
