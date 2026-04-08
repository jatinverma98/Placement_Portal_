# 🎓 Placement Portal

A full-stack Placement Portal built to manage campus recruitment.
Companies can post jobs, students can apply, and admins can manage the entire placement process.

---

# 🚀 Features

### 👨‍🎓 Student

* Register & Login
* View all jobs
* Search & filter jobs
* Apply for jobs
* Track application status
* Get notifications

### 🏢 Company

* Register & Login
* Post new jobs
* View applicants
* Accept / Reject applications
* Manage job listings

### 🛠 Admin

* Manage students
* Manage companies
* Manage jobs
* Control application status
* Dashboard overview

---

# 🧱 Tech Stack

### Frontend

* React.js
* Tailwind CSS
* Axios
* React Router DOM

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose

### Authentication

* JWT (JSON Web Token)
* Protected Routes
* Role Based Access

---

# 📂 Project Structure

```
placement-portal
│
├── backend
│   ├── controllers
│   ├── models
│   ├── routes
│   ├── middleware
│   └── server.js
│
├── frontend
│   ├── components
│   ├── pages
│   ├── context
│   └── App.js
│
└── README.md
```

---

# ⚙️ Installation

## 1. Clone Repository

```
git clone https://github.com/your-username/Placement-Portal.git
cd Placement-Portal
```

---

## 2. Backend Setup

```
cd backend
npm install
```

Create `.env`

```
PORT=5000
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key
```

Run backend:

```
npm run dev
```

---

## 3. Frontend Setup

```
cd frontend
npm install
npm start
```

---

# 🔐 Environment Variables

Create `.env` file in backend:

```
PORT=5000
MONGO_URI=
JWT_SECRET=
```

---

# 📌 API Endpoints

### Auth

* POST /api/auth/register
* POST /api/auth/login
* POST /api/auth/logout

### Jobs

* GET /api/jobs
* POST /api/jobs
* GET /api/jobs/:id
* DELETE /api/jobs/:id

### Applications

* POST /api/apply
* GET /api/applications
* PUT /api/applications/:id

---

# 🎯 Future Improvements

* Resume upload
* Email notifications
* Admin dashboard analytics
* Interview scheduling
* Offer letter generation
* Real-time notifications

---

# 📸 Screenshots

(Add screenshots here)

---

# 🤝 Contributing

Pull requests are welcome. For major changes, please open an issue first.

---

# 📜 License

This project is open source and available under the MIT License.

---

# 👨‍💻 Author

Jatin Verma
Placement Portal Project
