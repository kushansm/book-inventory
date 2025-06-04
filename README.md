
# 📚 Book Hub- A Book Inventory Management System

A full-stack **MERN** (MongoDB, Express.js, React.js, Node.js) application to manage a book inventory.

---

## ✅ Features

- 📝 Add New Books with Title, Author, Price
- ✏️ Edit Existing Book Details
- 🗑️ Delete Books with Confirmation Modal
- 🔍 Search Books by ID
- 📃 Paginated List of All Books
- 🖼️ Image Upload Support via Cloudinary (or local option)
- 📊 Dashboard & Analytics (Planned/Upcoming)

<!-- > 🔐 **Authentication (Login/Signup)** – *Coming soon* -->

---

## 🛠️ Tech Stack

| Frontend     | Backend     | Database     | Others                            |
|--------------|-------------|--------------|-----------------------------------|
| React (Vite) | Express.js  | MongoDB Atlas| Axios, React Router, Bootstrap    |
| React Hooks  | Node.js     | Mongoose     | Cloudinary, Multer, Dotenv, CORS  |

---

## 🚀 Getting Started

### 📦 1. Clone the Repository

```bash
git clone https://github.com/kushansm/book-inventory-app.git
cd book-inventory-app


🔧 2. Setup Backend
cd backend
npm install
Create .env file:
env
Always show details

Then add these to env file
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret




then run
npm run dev
This will run the backend on http://localhost:5000

🌐 3. Setup Frontend
cd ../frontend
npm install
▶️ Start the Frontend App
npm run dev
Visit the frontend at: http://localhost:5173


📂 Folder Structure

book-inventory-app/
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── uploads/
│   ├── .env
│   └── server.js
└── frontend/
    ├── components/
    ├── pages/
    ├── App.jsx
    └── main.jsx
🧑‍💻 Author
Made with ❤️ by Kushan

Want to contribute? Feel free to fork and open a pull request!

