# Placement Portal — Scalable Campus Recruitment Platform

A production-ready Placement Portal designed to streamline campus hiring workflows across students, recruiters, and administrators. The system is built with a modular architecture, RESTful APIs, role-based access control, and scalable data modeling to support real-world deployment scenarios.

This project demonstrates backend engineering principles including API design, authentication, filtering, pagination, and maintainable service structure suitable for cloud deployment (AWS / Azure).

---

# Architecture Overview

The platform follows a standard client–server architecture:

* Frontend: SPA consuming REST APIs
* Backend: Stateless REST service
* Database: Document-based persistence
* Auth: Token-based (JWT)
* Deployment-ready for cloud environments

```
Client (React)
      │
      ▼
REST API (Node.js / Express)
      │
      ▼
MongoDB Database
```

---

# Core Capabilities

## Student Workflow

* Account registration & authentication
* Browse available opportunities
* Search, filter, and paginate job listings
* Apply to jobs
* Track application status
* Receive updates

## Recruiter / Company Workflow

* Company authentication
* Create job postings
* View applicants
* Shortlist / reject candidates
* Manage active job listings

## Admin Controls

* Manage students and companies
* Monitor job postings
* Control application lifecycle
* System-wide moderation

---

# Tech Stack

### Application Layer

* Node.js
* Express.js
* MongoDB
* Mongoose ODM

### Frontend

* React.js
* React Router
* Axios
* Tailwind CSS (optional)

### Authentication & Security

* JWT-based authentication
* Role-based authorization
* Protected API routes
* Middleware-driven access control

---

# Key Engineering Highlights

* RESTful API design
* Scalable folder structure
* Separation of concerns (routes, controllers, models)
* Query-based filtering & search
* Pagination support
* Company-based filtering
* Sorting support
* Status-driven application workflow
* Error handling middleware
* Environment-based configuration

---

# Project Structure

```
placement-portal
│
├── controllers
├── models
├── routes
├── middleware
├── config
├── utils
├── server.js
│
└── frontend (optional)
```

---

# API Design

## Authentication

POST /api/auth/register
POST /api/auth/login
POST /api/auth/logout

---

## Jobs

GET /api/jobs
POST /api/jobs
GET /api/jobs/:id
DELETE /api/jobs/:id

Supports:

* keyword search
* department filter
* company filter
* pagination
* sorting

Example:

```
/api/jobs?keyword=developer&company=Google&page=1&sort=latest
```

---

## Applications

POST /api/applications
GET /api/applications
PUT /api/applications/:id

Status Flow:

```
pending → shortlisted → accepted / rejected
```

---

# Environment Configuration

Create a `.env` file:

```
PORT=5000
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret
NODE_ENV=development
```

---

# Local Development

Clone repository

```
git clone https://github.com/your-username/placement-portal.git
cd placement-portal
```

Install dependencies

```
npm install
```

Run server

```
npm run dev
```

---

# Scalability Considerations

This system is designed with cloud deployment in mind:

* Stateless backend (horizontal scaling ready)
* Environment-based config
* MongoDB Atlas compatible
* API gateway compatible
* Containerization ready (Docker)
* CDN friendly frontend deployment

---

# Deployment Options

AWS

* EC2 / Elastic Beanstalk
* MongoDB Atlas
* S3 + CloudFront (frontend)

Azure

* Azure App Service
* Azure Cosmos DB (Mongo API)
* Azure Static Web Apps

---

# Future Enhancements

* Resume upload (S3 / Blob storage)
* Email notifications (SES / SendGrid)
* Real-time updates (WebSockets)
* Admin analytics dashboard
* Interview scheduling
* Offer letter generation
* Multi-college support
* RBAC permission matrix

---

# License

MIT License

---

# Author

Jatin Verma
Placement Portal — Backend Engineering Project
