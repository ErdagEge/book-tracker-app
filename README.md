# 📚 BookTracker

BookTracker is a full-stack web application that helps you track your personal reading history. You can search for books using the Google Books API, add them to your library with custom notes, and update or delete your entries anytime.

Built with **React**, **Node.js/Express**, **MongoDB**, and **TypeScript**, it's a clean, minimal CRUD project perfect for readers and developers alike.

---

## ✨ Features

- 🔍 **Search books** using Google Books API
- 📖 **Track reading progress** with start and finish dates
- ⭐ **Rate and review** books you've read
- 🗂️ **Edit or delete** book entries in your library
- 📬 Stored in MongoDB, powered by a custom Express backend

---

## 🧰 Tech Stack

- **Frontend:** React + Vite + TypeScript + CSS
- **Backend:** Node.js + Express
- **Database:** MongoDB Atlas
- **API:** Google Books API

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/book-tracker-app.git
cd book-tracker-app
```

---

### 2. Set up the server

```bash
cd server
npm install
Create a .env file in the /server directory:
```

```bash
MONGO_URI=your_mongodb_connection_string
```

Start the backend:

```bash
npm run dev
```

---

### 3. Set up the client

```bash
cd ../client
npm install
npm run dev
```
Visit http://localhost:5173 to use the app.

---

### 🗃️ Project Structure

```bash
book-tracker-app/
├── client/       # React frontend
└── server/       # Express backend + MongoDB models
```

---

### 📦 Future Improvements
- 📊 Stats dashboard (pages read, average rating, etc.)
- 🔐 User authentication and multi-user support
- 🌙 Dark mode and responsive mobile layout
- 📁 Export/import reading history

---

### 📄 License
MIT License. Feel free to use, remix, and expand!


