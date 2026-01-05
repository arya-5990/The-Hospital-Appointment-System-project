# Hospital Appointment System - MediCare

A full-stack medical appointment management system built with the MERN stack (MongoDB, Express, React, Node.js). This application enables patients to find doctors and book appointments while allowing doctors to manage their patient interactions.

## 🚀 Tech Stack

- **Frontend**: React (Vite), Plain CSS (Glassmorphism Design), Lucide React (Icons), React Router
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (Atlas) with Mongoose ODM
- **Security**: JWT-ready structure, `bcryptjs` for password hashing

## ✨ Features

- **Role-Based Authentication**: 
    - Separate flows for **Patients** and **Doctors**.
    - Secure password hashing.
    - Password visibility toggle.
- **Dynamic Dashboard**:
    - Personalized views based on user role.
    - Quick actions and upcoming appointment summaries.
- **Appointment Management**:
    - **Patients**: Browse all doctors, book appointments via a modal, view status, and cancel.
    - **Doctors**: View upcoming appointments with patient details.
- **User Directory**:
    - **Find Doctors**: Patients can browse a list of all registered specialists.
    - **Patient List**: Doctors can view all registered patients in the system.
- **Responsive Design**: Modern UI with animations and responsive layouts.

## 🛠️ Setup & Installation

### Prerequisite
- Node.js installed on your machine.
- A MongoDB Atlas account (or local MongoDB).

### 1. Backend Setup (Server)
The backend runs on port `5000`.

```bash
cd server
npm install
```

**Configuration**:
Create a `.env` file in the `server/` directory:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
```

**Start Server**:
```bash
npm start
# OR
node server.js
```

### 2. Frontend Setup (Client)
The frontend runs on port `5173`.

```bash
cd client
npm install
```

**Start Client**:
```bash
npm run dev
```

## 🔗 Architecture

- **Auth**: Users are registered with a role (`patient` or `doctor`). Passwords are hashed before storage.
- **Appointments**: Linked to both a `patientId` and `doctorId`. Mongoose `populate` is used to join data for clear display.
- **Validation**: Backend handles duplicate usernames and connection errors gracefully.

## 📝 License
This project is open-source.
