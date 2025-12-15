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
