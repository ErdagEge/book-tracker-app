
**BookTracker** is a modern full-stack web application that helps you track your reading journey. Search for books via the Google Books API, log your progress, leave ratings and reviews, and visualize your stats with a clean, user-friendly interface.

Built with **React**, **Node.js**, **MongoDB**, and **TypeScript**, BookTracker supports **multi-user authentication**, **dynamic dashboards**, and **custom notes** for every book.

---

## ✨ Features

- 🔐 **User Accounts** - Sign up, log in, and manage your private book library
- 🔍 **Book Search** - Search titles with the Google Books API
- 📖 **Library Management** - Track your reading with:
  - Custom start/finish dates
  - Personal notes and star ratings
  - Optional page count tracking
- 📊 **Statistics Dashboard** - Visualize books per month and total pages read
- 🗂️ **Edit/Delete Entries** - Easily update or remove any book
- 💾 **MongoDB Integration** - Data is stored per-user, securely in the cloud
- 🎨 **Responsive UI** - Styled with modern CSS for a smooth experience

---

## 🧰 Tech Stack

### Frontend
- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- CSS Modules

### Backend
- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- JWT for authentication
- Google Books API

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/ErdagEge/book-tracker-app.git
cd book-tracker-app
```

---

### 2. Set up the server

```bash
cd server
npm install
```

Create a .env file in the /server directory:

```bash
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

Start the server:

```bash
npm run dev
```

---

### 3. Set up the frontend

```bash
cd ../client
npm install
npm run dev
```

To run locally:

```bash
npm run dev
```

Visit http://localhost:5173 to use the app.

---

### 🗃️ Project Structure

```bash
book-tracker-app/
├── client/        # React frontend (Vite)
│   ├── components/
│   ├── pages/
│   └── styles/
└── server/        # Express backend + MongoDB models + auth
```

---

### 🧪 Testing

Basic testing written with Vitest (optional). To run tests:
```
cd client
npm run test
```

---

## 📦 Deployment

### Backend  
Deployed on [Render](https://render.com)

### Frontend  
Deployed on [Vercel](https://vercel.com)

---

## 📄 License

This project is licensed under the **MIT License**. Feel free to use, modify, and distribute it.

---

## 🙌 Acknowledgements

- [Google Books API](https://developers.google.com/books)
- [Chart.js](https://www.chartjs.org/) + [react-chartjs-2](https://react-chartjs-2.js.org/)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- [Vite](https://vitejs.dev/)
- [Render](https://render.com)
- [Vercel](https://vercel.com)

---

## 🌐 Try It Out!

👉 [Live App](https://your-deployment.vercel.app)** — give it a try!



