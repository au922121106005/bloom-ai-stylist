# 📍 Complete Project Map & File Navigation

## 🗺️ Project Overview Map

```txt
                    BLOOM BOUQUET SHOP
                              │
                ┌─────────────┼─────────────┐
                │             │             │
           🌐 FRONTEND    ⚙️ BACKEND    📚 DOCS
           (React+Vite)  (Django+DRF)
                │             │             │
        http://5173        http://8000    README.md
                │             │             │
        ┌───────┼────┐   ┌────┼─────┐      │
        │       │    │   │    │     │      │
      Pages  Comp  API  Apps  Mgmt  Config │
        │       │    │   │    │     │      │
      ├─Home   │    └─→├─Products │        ├─ PROJECT_MAP.md
      ├─Shop   │       │          │        │
      ├─Cart   │       ├─Users    │        ├─ API_DOCUMENTATION.md
      ├─Login  │       │          │        │
      └─Register       └─Orders   │        └─ PROJECT_COMPLETION_REPORT.md
```

---

# 📁 File & Folder Guide

## 📂 Root Directory Files

```txt
Bloom-Bouquet-Shop/
├── README.md ............................ Complete guide
├── API_DOCUMENTATION.md ................. API reference
├── PROJECT_COMPLETION_REPORT.md ......... Status & checklist
├── PROJECT_MAP.md ....................... File navigation
└── package-lock.json
```

### What each file is for:
- **README.md** → Full project overview
- **API_DOCUMENTATION.md** → API endpoints & examples
- **PROJECT_COMPLETION_REPORT.md** → Completed features
- **PROJECT_MAP.md** → File navigation guide

---

# 🌐 Frontend Directory

```txt
frontend/
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── index.html
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── index.css
    ├── assets/
    │   └── images/
    ├── data/
    │   └── products.js
    ├── components/
    │   ├── Navbar.jsx
    │   ├── Footer.jsx
    │   ├── ProductCard.jsx
    │   └── CartItem.jsx
    ├── pages/
    │   ├── Home.jsx
    │   ├── Products.jsx
    │   ├── ProductDetails.jsx
    │   ├── Cart.jsx
    │   ├── Login.jsx
    │   └── Register.jsx
    └── services/
        └── api.js
```

---

# 🌸 Frontend Component Breakdown

## Components
- `Navbar.jsx` → Navigation bar
- `Footer.jsx` → Footer section
- `ProductCard.jsx` → Bouquet product cards
- `CartItem.jsx` → Shopping cart item

## Pages
- `Home.jsx` → Landing page
- `Products.jsx` → All bouquet products
- `ProductDetails.jsx` → Individual bouquet details
- `Cart.jsx` → Shopping cart page
- `Login.jsx` → User login
- `Register.jsx` → User registration

## Services
- `api.js` → Axios API configuration

---

# ⚙️ Backend Directory

```txt
backend/
├── manage.py
├── requirements.txt
├── db.sqlite3
├── bloom_project/
│   ├── settings.py
│   ├── urls.py
│   └── wsgi.py
└── apps/
    ├── products/
    │   ├── models.py
    │   ├── serializers.py
    │   ├── views.py
    │   ├── urls.py
    │   └── management/
    │       └── commands/
    │           └── populate_bouquets.py
    │
    ├── users/
    │   ├── models.py
    │   ├── serializers.py
    │   ├── views.py
    │   └── urls.py
    │
    └── orders/
        ├── models.py
        ├── serializers.py
        ├── views.py
        └── urls.py
```

---

# 🌸 Backend Apps

## Products App
Handles:
- Bouquet listings
- Product details
- Product APIs

## Users App
Handles:
- Login
- Registration
- User profiles

## Orders App
Handles:
- Cart
- Checkout
- Orders

---

# 🔗 Links & Access Points

## Frontend Pages

| Page | URL |
|------|-----|
| Home | http://localhost:5173/ |
| Products | http://localhost:5173/products |
| Cart | http://localhost:5173/cart |
| Login | http://localhost:5173/login |
| Register | http://localhost:5173/register |

---

# ⚙️ Backend APIs

| Endpoint | URL |
|----------|-----|
| Products | http://127.0.0.1:8000/api/products/ |
| Product Details | http://127.0.0.1:8000/api/products/{id}/ |
| Cart | http://127.0.0.1:8000/api/cart/ |
| Orders | http://127.0.0.1:8000/api/orders/ |
| Register | http://127.0.0.1:8000/api/users/register/ |
| Login | http://127.0.0.1:8000/api/users/login/ |

---

# 🎯 Navigation by Purpose

## 🚀 I want to START
→ Run frontend and backend servers

## 📖 I want to UNDERSTAND the project
→ Read `README.md`

## 🔌 I want to TEST APIs
→ Read `API_DOCUMENTATION.md`

## 🧑‍💻 I want to SEE THE CODE
→ Explore:
- `frontend/src/`
- `backend/apps/`

## ⚙️ I want to CONFIGURE something
→ Edit:
- `frontend/vite.config.js`
- `frontend/tailwind.config.js`
- `backend/bloom_project/settings.py`

## 📊 I want to SEE DATABASE
→ Open:
```txt
backend/db.sqlite3
```

---

# 📚 Documentation Map

```txt
README.md
 ├── Project Overview
 ├── Features
 ├── Technology Stack
 ├── Setup Instructions
 └── Deployment Notes

API_DOCUMENTATION.md
 ├── Products API
 ├── Users API
 ├── Cart API
 ├── Orders API
 └── Response Examples

PROJECT_COMPLETION_REPORT.md
 ├── Completed Features
 ├── QA Checklist
 ├── Technologies Used
 └── Status Summary

PROJECT_MAP.md
 ├── Folder Navigation
 ├── File Structure
 ├── Access URLs
 └── Learning Path
```

---

# 🎓 Learning Path

## Beginner Path
1. Open frontend app
2. Browse bouquet products
3. Add items to cart
4. Register user
5. Place an order

---

# 💾 Key Files To Know

## 🔴 Critical Files

```txt
backend/manage.py
backend/bloom_project/settings.py
frontend/src/App.jsx
frontend/src/services/api.js
```

## 🟡 Important Files

```txt
backend/db.sqlite3
frontend/package.json
backend/requirements.txt
frontend/tailwind.config.js
```

---

# 🚀 Quick Command Reference

## Backend

```bash
cd backend
python manage.py runserver
```

## Frontend

```bash
cd frontend
npm run dev
```

## Populate Bouquet Products

```bash
python manage.py populate_bouquets
```

---

# 📍 You Are Here

```txt
📁 Bloom-Bouquet-Shop/
   ├── README.md
   ├── API_DOCUMENTATION.md
   ├── PROJECT_COMPLETION_REPORT.md
   ├── PROJECT_MAP.md  👈
   ├── frontend/
   └── backend/
```

---

# 🎯 Next Steps

1. Open frontend app
2. Explore bouquet collections
3. Test APIs
4. Customize design
5. Add new features

---

# 📞 Where To Find Things

| Question | Location |
|----------|----------|
| Setup Instructions | README.md |
| API Usage | API_DOCUMENTATION.md |
| Features Completed | PROJECT_COMPLETION_REPORT.md |
| File Navigation | PROJECT_MAP.md |
| Frontend Code | frontend/src/ |
| Backend Code | backend/apps/ |

---

# 🌷 Bloom Bouquet Shop

A modern floral e-commerce application built using:

- React
- Django
- REST APIs
- SQLite
- Tailwind CSS

---

# 🚀 Ready To Use

## Frontend
```txt
http://localhost:5173/
```

## Backend
```txt
http://127.0.0.1:8000/
```

## Admin
```txt
http://127.0.0.1:8000/admin
```

---

# 🌸 Enjoy Your Bloom Bouquet Shop 🌸