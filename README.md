# 🧠 Gradr – AI-Powered Resume Grader & Assistant

Gradr is a full-stack resume analysis tool powered by Claude 3 Haiku. It reads resumes and job descriptions, gives match scores, keyword analysis, formatting tips, and offers a real-time chat assistant — all through a clean, modern UI.

---

## 🚀 Live Demo

- **Frontend (Netlify):** [https://gradrapp.netlify.app](https://gradrapp.netlify.app)
- **Backend (Railway):** [https://gradr-production.up.railway.app](https://gradr-production.up.railway.app)

---

## ✅ Features

- 📄 Upload resume and job description (PDF/text)
- 🎯 Get structured JSON scoring using Claude 3 Haiku
- 📊 ATS-style score, keyword match, formatting tips
- 💬 Claude-powered real-time resume assistant
- 🎨 Clean UI built with Tailwind & Vite
- 🔒 Secure API with environment variables

---

## 🏗️ Architecture (Current Version)

```
Frontend (React)
       ↓
Backend (Node + Express)
       ↓
Claude 3 Haiku API (via OpenRouter)
```

---

## 📦 Tech Stack

| Layer       | Tech Used                                         |
|-------------|---------------------------------------------------|
| **Frontend**   | React, Vite, Tailwind CSS, Axios                  |
| **Backend**    | Node.js, Express, Multer, pdf-parse, dotenv       |
| **AI Model**   | Claude 3 Haiku via OpenRouter API                 |
| **Deployment** | Netlify (Frontend), Railway (Backend)             |

---

## ⚙️ Local Setup Guide

### 📥 Clone the Repository
```bash
git clone https://github.com/Swayamcodes/Gradr.git
cd Gradr
```

### 🎨 Frontend Setup
```bash
cd resume-grader-client
npm install
npm run dev
```

### ⚡ Backend Setup
```bash
cd resume-grader-backend
npm install
npm run start
```



## 💬 AI Prompting Strategy

### 1. Resume Grader (Claude)
- Sends the resume & job description to Claude
- Prompts Claude to return structured JSON with:
  - Match score (0–100)
  - Keyword match (matched + missing)
  - ATS optimization tips
  - Resume improvement suggestions (content, formatting, etc.)

### 2. AI Resume Assistant (Chat)
- Powered by Claude 3 Haiku
- Uses system prompt + chat memory
- Helps users improve resumes through interactive conversation

---

## 🔮 Roadmap 

> Planned upgrade to add real technical depth and scale.

- 🧠 **NLP Pipeline** (spaCy, TF-IDF, entity recognition)
- 🔍 **Semantic Matching** (sentence-transformers)
- 💾 **Database Integration** (PostgreSQL to store resumes, scores)
- ⚡ **Queue System** (Celery + Redis)
- 📊 **Analytics Dashboard**
- 🧪 **A/B Testing** for scoring logic
- 📚 **Skills Gap Analysis** + course suggestions
- 🤖 **Interview Question Generation**

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👤 Author

**[@Swayamcodes](https://github.com/Swayamcodes)**

- GitHub: [@Swayamcodes](https://github.com/Swayamcodes)
- LinkedIn: [Connect with me](https://www.linkedin.com/in/swayamcodes) *(optional - add your LinkedIn)*

---

## ⭐ Show your support

Give a ⭐️ if this project helped you!

---

<div align="center">
  <sub>Built with ❤️ by <a href="https://github.com/Swayamcodes">Swayam</a></sub>
</div>
