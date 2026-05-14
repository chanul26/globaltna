# GlobalTNA - Full-Stack Developer Intern Assessment

This is a mini Service Request Board built for the GlobalTNA engineering assessment. It features a Node.js/Express backend, a Next.js (App Router) frontend styled with Tailwind CSS, and a MongoDB database.

## Architecture
This repository is structured as a monorepo containing two independent applications:
- `/backend`: REST API built with Node.js, Express, and Mongoose.
- `/frontend`: React UI built with Next.js 16 and Tailwind CSS v4.

---

## ⚙️ Environment Variables

Before running the application, you must create the necessary environment files.

### Backend (`/backend/.env`)
Create a `.env` file in the `/backend` directory:
```env
PORT=5001
MONGODB_URI=your_mongodb_connection_string_here