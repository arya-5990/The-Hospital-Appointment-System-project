# Hospital Appointment System

## Project Structure
- `client/`: React Frontend (Vite)
- `server/`: Node/Express Backend

## Setup & Run

### Backend
1. Navigate to server: `cd server`
2. Install dependencies: `npm install` (Already done)
3. Set your MongoDB URI in `.env` (Default is localhost)
4. Run server: `node server.js` or `npx nodemon server.js`
   - Server runs on http://localhost:5000

### Frontend
1. Navigate to client: `cd client`
2. Install dependencies: `npm install` (Already done)
3. Run dev server: `npm run dev`
   - Frontend runs on http://localhost:5173

## Features
- **Authentication**: Patient and Doctor registration/login.
- **Dashboard**: Role-based views.
- **Appointments**: 
    - Patients can lists doctors and book appointments.
    - Doctors/Patients can view their agenda.
    - Status tracking (Booked/Cancelled).
