# MediTrack

Hospital appointment and patient management app. I built this as a full stack project to practice React and Spring Boot together.

It covers the main flow: patients book visits, doctors update appointment status, and admin can view hospital data. Still a work in progress but everything runs locally.

## What it does

**Login / Register**
- JWT based auth
- Admin, Doctor, and Patient roles

**Patient**
- Book appointments
- View and cancel visits
- Browse doctors by department

**Doctor**
- See assigned appointments
- Update status (pending, confirmed, completed)
- Basic patient list from visits

**Admin**
- Dashboard stats
- Manage doctors, patients, appointments
- Departments

## Tech stack

| Layer    | Technology |
|----------|------------|
| Frontend | React, React Router, Axios, Tailwind, Context API |
| Backend  | Spring Boot 3, Java 17, JWT |
| Database | MongoDB |

## Folder structure

```
meditrack-healthcare-platform/
├── backend/
├── frontend/
└── README.md
```

## How to run

**Requirements:** Java 17+, Node 18+, MongoDB

1. Start MongoDB (local or Atlas)

2. Backend:
```bash
cd backend
mvn spring-boot:run
```
Runs on http://localhost:8080

Sample data loads on first run.

3. Frontend:
```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```
Runs on http://localhost:5173

Copy `backend/.env.example` and set `MONGODB_URI` if needed.

## Demo logins

| Role    | Email                   | Password   |
|---------|-------------------------|------------|
| Admin   | admin@meditrack.com     | admin123   |
| Doctor  | dr.sharma@meditrack.com | doctor123  |
| Patient | john.doe@email.com      | patient123 |

## API (main routes)

Base: `http://localhost:8080/api`

| Method | Endpoint | Who |
|--------|----------|-----|
| POST | /auth/login, /auth/register | Public |
| GET | /departments, /doctors | Public |
| GET | /admin/dashboard | Admin |
| GET | /doctor/appointments | Doctor |
| POST | /patient/appointments | Patient |

## Screenshots

Add these later when testing:
- landing page
- admin dashboard
- booking page

## Later ideas

- email when appointment is confirmed
- dark mode
- better charts on admin page
- tests for backend

## Notes

Make sure MongoDB is running before starting the backend. I forgot that a few times during development.

Change `JWT_SECRET` in production if you deploy this anywhere.

---

MediTrack, 2026
