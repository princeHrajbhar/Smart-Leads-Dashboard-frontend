# CRM Leads Management System

A comprehensive Customer Relationship Management (CRM) system for managing leads, tracking interactions, and streamlining sales processes. Built with modern web technologies and best practices.

## Live Demo

### Frontend
[Smart Leads Dashboard Frontend](http://16.16.56.159:3000/dashboard)

### Backend API
[Smart Leads Dashboard Backend](http://16.16.56.159:5001)

# Docker Images

## Frontend Image

```bash
docker pull rbprince/smart-leads-frontend:latest
```

## Backend Image

```bash
docker pull rbprince/smart-leads-backend:latest
```

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [API Routes](#api-routes)
- [Installation & Setup](#installation--setup)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [Environment Variables](#environment-variables)
- [Running the Application](#running-the-application)
- [Testing](#testing)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

## 🎯 Overview

This CRM Leads Management System provides a complete solution for sales teams to manage their leads efficiently. It includes authentication, lead tracking, status management, and analytics dashboards. The application features role-based access control (Admin/Sales), real-time updates, and a responsive design for both desktop and mobile devices.

## ✨ Features

### Core Features
- **User Authentication** - JWT-based authentication with refresh tokens
- **Role-Based Access Control** - Admin and Sales user roles with different permissions
- **Lead Management** - Create, read, update, and delete leads
- **Lead Status Tracking** - NEW, CONTACTED, QUALIFIED, WON, LOST
- **Lead Source Tracking** - Website, Referral, Social Media, Cold Call, Email, Other
- **Advanced Filtering** - Filter leads by status, source, and search terms
- **Sorting & Pagination** - Sort by date (latest/oldest) with pagination
- **Dashboard Analytics** - Visual metrics and statistics
- **Dark/Light Mode** - Theme toggle with persistent storage
- **Responsive Design** - Mobile-first approach with sidebar navigation

### Security Features
- JWT authentication with refresh token rotation
- Password hashing with bcrypt
- Input validation and sanitization
- Protected API routes
- XSS protection
- CORS configuration

## 🛠 Tech Stack

### Frontend
| Technology | Version | Purpose |
|------------|---------|---------|
| React | 18.2.0 | UI Framework |
| TypeScript | 5.0.0 | Type Safety |
| Vite | 5.0.0 | Build Tool |
| TailwindCSS | 3.3.0 | Styling |
| React Router DOM | 6.20.0 | Routing |
| TanStack Query | 5.12.0 | Data Fetching |
| Zustand | 4.4.7 | State Management |
| React Hook Form | 7.48.0 | Form Handling |
| Zod | 3.22.4 | Validation |
| Framer Motion | 10.16.0 | Animations |
| Axios | 1.6.0 | HTTP Client |
| Lucide React | 0.294.0 | Icons |
| React Hot Toast | 2.4.1 | Notifications |

### Backend
| Technology | Version | Purpose |
|------------|---------|---------|
| Node.js | 18.x | Runtime |
| Express.js | 4.18.2 | Web Framework |
| MongoDB | 6.0 | Database |
| Mongoose | 8.0.0 | ODM |
| JWT | 9.0.2 | Authentication |
| Bcryptjs | 2.4.3 | Password Hashing |
| Zod | 3.22.4 | Validation |
| CORS | 2.8.5 | Cross-origin Resource Sharing |
| Helmet | 7.0.0 | Security Headers |
| Morgan | 1.10.0 | Logging |


## 🔌 API Routes

### Authentication Endpoints

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | `/api/auth/register` | Register new user | Public |
| POST | `/api/auth/login` | Login user | Public |
| POST | `/api/auth/refresh-token` | Refresh access token | Public |
| POST | `/api/auth/logout` | Logout user | Private |
| GET | `/api/auth/me` | Get current user | Private |

## Request/Response Examples

**Register User**
```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "SALES"
}

Response (201):
{
  "success": true,
  "message": "User registered successfully"
}
```
# Lead Management Endpoints

| Method | Endpoint | Description | Access |
|--------|-----------|-------------|---------|
| GET | `/api/leads` | Get all leads (with filters) | Private |
| GET | `/api/leads/:id` | Get single lead | Private |
| POST | `/api/leads` | Create new lead | Private |
| PUT | `/api/leads/:id` | Update lead | Private |
| DELETE | `/api/leads/:id` | Delete lead | Admin Only |

---

# Query Parameters for `GET /api/leads`

| Parameter | Type | Description | Example |
|-----------|------|-------------|---------|
| status | string | Filter by status | `?status=NEW` |
| source | string | Filter by source | `?source=WEBSITE` |
| search | string | Search by name/email/company | `?search=john` |
| page | number | Page number | `?page=1` |
| limit | number | Items per page | `?limit=10` |
| sort | string | Sort order | `?sort=latest` |


# Backend Setup

## Go to Backend Folder

```bash
cd backend
```

## Install Dependencies

```bash
npm install
```

## Create `.env`

```env
PORT=5000

MONGO_URI=YOUR_MONGODB_URL

JWT_ACCESS_SECRET=your_access_secret

JWT_REFRESH_SECRET=your_refresh_secret
```

## Run Backend

```bash
npm run dev
```

Backend running on:

```bash
http://localhost:5000
```

---

# Frontend Setup

## Go to Frontend Folder

```bash
cd front
```

## Install Dependencies

```bash
npm install
```

## Create `.env`

```env
VITE_API_URL=http://localhost:5000/api
```

## Run Frontend

```bash
npm run dev
```

Frontend running on:

```bash
http://localhost:5173
```

---

# Frontend Production Build

```bash
npm run build
```

Build files generate inside:

```bash
dist/
```