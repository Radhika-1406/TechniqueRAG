🚀 TechniqueRag — Retrieval-Augmented Cyber Threat Intelligence System

TechniqueRag is a full-stack AI system that analyzes cyber-threat data using Retrieval-Augmented Generation (RAG) and transformer-based CTI models.
It combines a modern frontend UI with a powerful FastAPI backend and integrates Hugging Face’s CTI-BERT model for intelligent threat analysis.

This repository contains both frontend and backend for unified development, Git integration, and deployment.

📁 Project Structure
TechniqueRag/
│
├── frontend/        # React + Vite + Tailwind + shadcn UI
│   └── README.md     # Frontend documentation
│
├── backend/         # FastAPI + MongoDB + CTI-BERT pipeline
│   └── README.md     # Backend documentation
│
└── README.md         # (This file) Full project overview

🧠 Key Features

✅ Retrieval-Augmented CTI analysis
✅ Hugging Face CTI-BERT integration
✅ Backend REST API with protected routes
✅ JWT-based authentication (login / registration)
✅ MongoDB user system + stored logs
✅ Modern frontend UI (Lovable.dev + React + ShadCN)
✅ Full-stack folder structure ready for deployment
✅ GitHub-enabled for Bolt.new / Codespaces / local IDE

🛠️ Tech Stack
⚡ Frontend

React + Vite

TypeScript

Tailwind CSS

shadcn-ui / Material UI

Axios for API communication

Lovable.dev generated project base

⚙️ Backend

FastAPI

MongoDB / Mongoose

JWT authentication

Hugging Face CTI-BERT model

Python (uvicorn, pydantic, fastapi, transformers)

🔧 Local Setup
✅ Clone the repository
git clone https://github.com/<your-username>/TechniqueRag.git
cd TechniqueRag

✅ Run Frontend
cd frontend
npm install
npm run dev

✅ Run Backend

Copy .env.example → .env

Add your MongoDB, JWT, and Hugging Face keys

Install and run:

cd backend
pip install -r requirements.txt
uvicorn main:app --reload

🌐 API Overview
Auth Routes

POST /api/users/register

POST /api/users/login

GET /api/users/me (JWT required)

Threat Analysis

POST /api/analyze
Input: { "text": "..." }
Output: CTI-BERT model response

🚀 Deployment Guide
✅ Frontend

Use:

Vercel

Netlify

Cloudflare Pages

Lovable → Publish

✅ Backend

Use:

Railway

Render

AWS EC2

Azure App Service

✅ Database

MongoDB Atlas

✅ Best Practices

Do NOT expose your Hugging Face API key in frontend

Store secrets only in backend .env

Use SSL (HTTPS) for production

Keep frontend + backend in the same repo (this one)

🤝 Contributing

Pull requests, issues, and feature suggestions are welcome.

📄 License

MIT License