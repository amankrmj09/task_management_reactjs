<div align="center">

# 📋 Task Management Frontend

A modern, responsive, and dynamic user interface built with **React** and **Vite**, featuring interactive dashboards, role-based rendering, and containerized deployment via Docker.

[![React](https://img.shields.io/badge/React-18+-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-5+-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev)
[![Docker](https://img.shields.io/badge/Docker-Ready-2496ED?style=for-the-badge&logo=docker&logoColor=white)](https://www.docker.com)

<br />

### **[🚀 View Live Demo](https://taskmanager.blubug.me/)**

**Demo Admin Credentials:**
- **Email:** `admin@example.com`
- **Password:** `AdminPass123!`
> *You can also create your own user account to test the platform.*

</div>

## Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Folder Structure](#folder-structure)
- [Environment Variables](#environment-variables)
- [How to Run Locally](#how-to-run-locally)
- [Running with Docker](#running-with-docker)

## Features
- Interactive Dashboards for Users and Admins
- Real-time Task & Project Management Views
- Role-based UI Rendering
- Fully Responsive Design for Mobile and Desktop

## Tech Stack
- **Framework**: React 18
- **Build Tool**: Vite
- **Language**: JavaScript (ES6+)
- **Routing**: React Router
- **Styling**: CSS / Frontend framework

## Folder Structure
```text
src/                  # Main source code folder
├── app/              # Global app setup (e.g., Redux store configuration)
├── components/       # Shared UI components (common, layout)
├── features/         # Feature-based modules (auth, dashboard, projects, tasks, etc.)
│   └── [feature]/    # Inside each feature:
│       ├── api/      # Feature-specific API calls
│       ├── components/# Feature-specific UI components
│       ├── hooks/    # Feature-specific custom hooks
│       ├── pages/    # Feature-specific page views
│       ├── redux/    # Feature-specific state management
│       └── utils/    # Feature-specific helpers
├── hooks/            # Global custom React hooks
├── lib/              # Third-party library configs (e.g., Axios instance)
├── routes/           # Application routing definitions
├── styles/           # Global CSS/Tailwind styles
└── utils/            # Global helper functions and utilities
```

## Environment Variables
Create a `.env` file in the root of this folder and populate it with the following required variables:

```env
VITE_API_BASE_URL=http://localhost:8080/api
```

## How to Run Locally

1. **Install Dependencies**:
   ```bash
   npm install
   ```
2. **Start the Development Server**:
   ```bash
   npm run dev
   ```
3. Open your browser and navigate to the URL provided in the terminal (usually `http://localhost:5173`).

## Running with Docker

1. **Build the Docker image**:
   ```bash
   docker build -t task-management-frontend .
   ```
2. **Run the Docker container**:
   ```bash
   docker run -p 80:80 task-management-frontend
   ```
