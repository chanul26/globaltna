# GlobalTNA - Full-Stack Developer Intern Assessment

This is a mini Service Request Board built for the GlobalTNA engineering assessment. It features a Node.js/Express backend, a Next.js (App Router) frontend styled with Tailwind CSS, and a MongoDB database.

## Live Demo Links
* **Frontend (Vercel):** https://globaltna-dusky.vercel.app
* **Backend API (Render):** https://globaltna.onrender.com

## Architecture
This repository is structured as a monorepo containing two independent applications:
- `/backend`: REST API built with Node.js, Express, and Mongoose.
- `/frontend`: React UI built with Next.js 16 and Tailwind CSS v4.

---

## ⚙️ Setup & Run Instructions

### Prerequisites
- Node.js (v18+)
- MongoDB connection string (Atlas or local)

### 1. Backend Setup
1. Navigate to the backend directory: `cd backend`
2. Install dependencies: `npm install`
3. Create a `.env` file in the `/backend` directory:
```env
PORT=5001
MONGODB_URI=your_mongodb_connection_string_here
CLIENT_URL=http://localhost:3000