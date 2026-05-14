# 🌸 Bloom Bouquet Shop — Full Stack Floral E-Commerce Application

## A fully functional modern floral bouquet e-commerce website built using React (Vite), Django REST Framework, and SQLite.

---

# 🚀 Project Overview

Bloom Bouquet Shop is a complete full stack floral shopping application featuring:

- 🌐 React + Vite frontend
- ⚙️ Django REST Framework backend
- 💾 SQLite database
- 🛒 Shopping cart system
- 🔐 User authentication
- 📦 Order management
- 🎨 Responsive floral UI using Tailwind CSS

---

# 📊 System Status

- ✅ Backend Server: Running on `http://127.0.0.1:8000/`
- ✅ Frontend Server: Running on `http://localhost:5173/`
- ✅ Admin Panel: `http://127.0.0.1:8000/admin`
- ✅ Database: SQLite (`backend/db.sqlite3`)

---

# 🌐 Available URLs

## 🌸 Frontend

| Page | URL |
|------|------|
| Home Page | http://localhost:5173/ |
| Products Page | http://localhost:5173/products |
| Shopping Cart | http://localhost:5173/cart |
| Login | http://localhost:5173/login |
| Register | http://localhost:5173/register |

---

## ⚙️ Backend API

| API | URL |
|------|------|
| Products List | http://127.0.0.1:8000/api/products/ |
| Single Product | http://127.0.0.1:8000/api/products/{id}/ |
| Cart API | http://127.0.0.1:8000/api/cart/ |
| Orders API | http://127.0.0.1:8000/api/orders/ |
| Register API | http://127.0.0.1:8000/api/users/register/ |
| Login API | http://127.0.0.1:8000/api/users/login/ |

---

# 💐 Bouquet Collections

## ❤️ Amour Collection

- Rose Whisper Bouquet
- Crimson Love Arrangement
- Eternal Rose Harmony
- Blush Romance Bouquet

---

## 🤍 Elegant Collection

- White Lily Grace
- Ivory Serenity Bouquet
- Pure Elegance Bloom
- Soft Pearl Arrangement

---

## 🌼 Fresh Collection

- Sunlight Meadow Bouquet
- Golden Bloom Harmony
- Spring Garden Delight
- Morning Dew Florals

---

## 👑 Luxury Collection

- Velvet Noir Bouquet
- Royal Orchid Essence
- Midnight Bloom Luxe
- Golden Prestige Arrangement

---

## 🌿 Natural Collection

- Wildflower Meadow Mix
- Rustic Bloom Basket
- Forest Whisper Bouquet
- Earthy Garden Collection

---

# 📁 Project Structure

```bash
bloom_FullStack_Project/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   │
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── index.html
│
├── backend/
│   ├── bloom_project/
│   ├── apps/
│   │   ├── products/
│   │   ├── users/
│   │   └── orders/
│   │
│   ├── manage.py
│   ├── requirements.txt
│   └── db.sqlite3
│
├── README.md
├── QUICKSTART.md
├── API_DOCUMENTATION.md
├── PROJECT_MAP.md
├── PROJECT_COMPLETION_REPORT.md
└── SETUP.bat
```

---

# 🛠️ Technology Stack

## 🌐 Frontend Stack

- React 18
- Vite 5
- React Router DOM
- Axios
- Tailwind CSS

---

## ⚙️ Backend Stack

- Python 3
- Django 4.2
- Django REST Framework
- SQLite
- django-cors-headers

---

# 🚀 How To Run The Project

## ⚙️ Backend Setup

```bash
cd backend

python -m venv venv

.\venv\Scripts\activate

pip install -r requirements.txt

python manage.py migrate --run-syncdb

python manage.py populate_bouquets

python manage.py runserver
```

Backend runs on:

```bash
http://127.0.0.1:8000/
```

---

## 🌸 Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

Frontend runs on:

```bash
http://localhost:5173/
```

---

# ✨ Key Features

## 🌷 User Features

- ✅ Browse bouquet collections
- ✅ View bouquet details
- ✅ Add products to cart
- ✅ Update cart quantities
- ✅ Remove cart items
- ✅ User registration & login
- ✅ Checkout & order placement
- ✅ Responsive floral design

---

## 🔧 Backend Features

- ✅ REST API using Django REST Framework
- ✅ Product APIs
- ✅ User Authentication APIs
- ✅ Cart APIs
- ✅ Orders APIs
- ✅ SQLite database integration
- ✅ CORS enabled
- ✅ Product population command
