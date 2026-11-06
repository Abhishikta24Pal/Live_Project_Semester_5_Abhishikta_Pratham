# 🧠 Mental Health Space

**A digital platform designed to promote emotional well-being through AI-powered support, guided audio experiences, and access to professional help.**

## 🌿 About the Project

Mental Health Space is a full-stack mental wellness web application developed to make emotional support more accessible. It combines AI-powered interactions, supportive storytelling, audio resources, and professional assistance to create a safe and supportive digital environment.

## ✨ Key Features

- **AI Support Buddy:** Provides conversational emotional support using the Google Gemini API.
- **Stories of Others:** Offers supportive, AI-generated stories and reflections to help users feel understood and less alone.
- **Audio Support:** Provides downloadable and streamable audio resources for everyday emotional challenges.
- **Professional Help:** Helps users access professional mental health assistance.
- **Real-Time Communication:** Uses a signalling server to support real-time communication functionality.

## 🛠️ Tech Stack

| Category | Technologies |
|---|---|
| Frontend | React.js, Vite, JavaScript, Tailwind CSS |
| Backend | Node.js, Express.js |
| AI Integration | Google Gemini API |
| Real-Time Communication | WebRTC, Signalling Server |
| Development Tools | Git, GitHub, npm |

## 📂 Project Structure

```text
Mental-Health-Space/
│
├── backend/
│   ├── main/
│   │   ├── controllers/
│   │   ├── routes/
│   │   ├── audio/
│   │   └── server.js
│   │
│   └── signaling/
│
├── frontend/
│   ├── public/
│   └── src/
│       ├── components/
│       ├── pages/
│       └── ...
│
└── README.md
```

## ⚙️ Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/Abhishikta24Pal/Live_Project_Semester_5_Abhishikta_Pratham.git

cd Live_Project_Semester_5_Abhishikta_Pratham
```

### 2. Install Frontend Dependencies

```bash
cd frontend
npm install
```

### 3. Install Backend Dependencies

Open another terminal:

```bash
cd backend/main
npm install
```

### 4. Configure Environment Variables

Create `.env` files in the appropriate directories.

**Backend (`backend/main/.env`):**

```env
PORT=5000
GEMINI_API_KEY=your_gemini_api_key
```

**Frontend (`frontend/.env.local`):**

```env
VITE_API_BASE=http://localhost:5000
```

Replace the placeholder with your actual API key. Never commit secret environment variables to GitHub.

### 5. Run the Application

**Start the backend:**

```bash
cd backend/main
node server.js
```

**Start the frontend:**

```bash
cd frontend
npm run dev
```

Open the local URL provided by Vite in your browser.

## 🔌 API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/` | Backend health check |
| GET | `/api/audio` | Fetch available audio tracks |
| GET | `/api/audio/:filename` | Stream an audio file |
| POST | `/api/gemini/generate` | Generate AI-supported content |

*Additional endpoints may be available for other application features.*

## 🔐 Security & Privacy

- API credentials are maintained through environment variables.
- Gemini API requests are handled through the backend.
- CORS is configured for frontend-backend communication.
- The platform is intended as a supportive wellness resource, not a replacement for professional diagnosis or treatment.

## 🚀 Future Enhancements

- Enhanced AI-powered personalized wellness experiences.
- Expanded audio and storytelling libraries.
- Improved access to mental health professionals.
- Additional privacy and security enhancements.

## 👩‍💻 Developer

**Abhishikta Pal**
**Pratham Dhingra**

GitHub: [@Abhishikta24Pal](https://github.com/Abhishikta24Pal)

---

⭐ If you find this project meaningful, consider giving the repository a star!

**Mental Health Space — Because every emotion deserves to be heard.**