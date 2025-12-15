<<<<<<< HEAD
# Techniquerag Backend (Ready-to-run)

This backend provides:
- User registration & login with JWT
- Protected `/api/analyze` endpoint that calls Hugging Face's CTI-BERT model (`ibm-research/CTI-BERT` by default)

## Setup

1. Copy `.env.example` to `.env` and fill values:
   ```
   MONGO_URI=mongodb://localhost:27017/techniquerag
   JWT_SECRET=your_jwt_secret_here
   HF_API_KEY=hf_your_huggingface_token_here
   HF_MODEL=ibm-research/CTI-BERT
   PORT=5000
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Run:
   ```
   npm start
   ```

## API Endpoints

- `POST /api/users/register`  
  Body: `{ "username": "...", "email": "...", "password": "..." }`  
  Returns user object with token.

- `POST /api/users/login`  
  Body: `{ "email": "...", "password": "..." }`  
  Returns user object with token.

- `GET /api/users/me`  
  Headers: `Authorization: Bearer <token>`  
  Returns current user.

- `POST /api/analyze` (protected)  
  Headers: `Authorization: Bearer <token>`  
  Body: `{ "text": "Threat report text..." }`  
  Returns raw Hugging Face model response (CTI-BERT output).

## Security note
- Keep the `HF_API_KEY` secret. Do NOT store it in frontend code. Use this backend as a proxy to keep the token safe.

## Customization
- To change model, set `HF_MODEL` in `.env` to another Hugging Face model id or full inference URL.
- You can adapt controllers to transform the HF output into more user-friendly structures or map to MITRE IDs.

Enjoy — let me know if you want:
- Response parsing & highlighting examples
- Rate limiting / quota management
- Deployment instructions (Heroku / Render / Railway / AWS)
=======
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
>>>>>>> 47227574d37bb57f2fb2d578a8c9afb3fbc1f6f3
