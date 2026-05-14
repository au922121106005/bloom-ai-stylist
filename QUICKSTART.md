# 🌸 Quick Start Guide — Bloom Bouquet Shop

## 🚀 One-Click Setup (Windows)

Run the setup script:

```bash
SETUP.bat

This will automatically:

✅ Create Python virtual environment
✅ Install Django & dependencies
✅ Create database & tables
✅ Populate bouquet products
✅ Install frontend dependencies
✅ Start the project setup

---

## Manual Setup

### 1. Backend Setup (5 minutes)

```bash
# Navigate to backend
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
.\venv\Scripts\activate

# Install dependencies
pip install Django==4.2.0 djangorestframework==3.14.0 django-cors-headers==4.2.0

# Setup database
python manage.py migrate --run-syncdb

# Populate bouquet products
python manage.py populate_bouquets

# Start backend server
python manage.py runserver

Backend will run on:

http://127.0.0.1:8000/
```

### 2. Frontend Setup (3 minutes)

```bash
# Open new terminal, navigate to frontend
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

---

## 🌷 What Works Out of the Box

✅ Browse bouquet collections
✅ View bouquet details
✅ Add bouquets to cart
✅ Shopping cart management
✅ User registration & login
✅ Order placement & checkout
✅ Responsive floral UI
✅ REST API integration
✅ Database support with SQLite
✅ Beautiful floral themed design

## 🌸 Bouquet Collections Included
# ❤️ Romantic Collection
✅Rose Whisper Bouquet
✅Crimson Love Arrangement
✅Eternal Rose Harmony
✅Blush Romance Bouquet
✅🤍 Elegant Collection
✅White Lily Grace
✅Ivory Serenity Bouquet
✅Pure Elegance Bloom
✅Soft Pearl Arrangement
✅🌼 Fresh Collection
✅Sunlight Meadow Bouquet
✅Golden Bloom Harmony
✅Spring Garden Delight
✅Morning Dew Florals
# 👑 Luxury Collection
✅Velvet Noir Bouquet
✅Royal Orchid Essence
✅Midnight Bloom Luxe
✅Golden Prestige Arrangement
## 🌿 Natural Collection
✅Wildflower Meadow Mix
✅Rustic Bloom Basket
✅Forest Whisper Bouquet
✅Earthy Garden Collection
## 🌐 URLs Reference
Page	URL
# 🌸 Frontend	http://localhost:5173

# 💐 Products	http://localhost:5173/products

# 🛒 Cart	http://localhost:5173/cart

# 🔐 Login	http://localhost:5173/login

# 📝 Register	http://localhost:5173/register

# ⚙️ Products API	http://127.0.0.1:8000/api/products/

# 👨‍💼 Admin Panel	http://127.0.0.1:8000/admin
## 🔥 API Endpoints
## Products API
# GET /api/products/
## GET /api/products/{id}/
# Users API
# POST /api/users/register/
# POST /api/users/login/
## Cart API
# GET /api/cart/
# POST /api/cart/
## Orders API
# GET /api/orders/
# POST /api/orders/


---

## 📞 Quick Support

### Issue: Backend server won't start
```bash
# Make sure you're in the backend folder and venv is activated
.\venv\Scripts\activate
python manage.py runserver
```

### Issue: Frontend won't start
```bash
# Make sure dependencies are installed
npm install

# Then start
npm run dev
```

### Issue: Products not showing
```bash
# Repopulate database
python manage.py populate_bouquets
```

---

## 💡 Tips & Tricks

1. **Access Admin Panel**: Navigate to http://127.0.0.1:8000/admin (no password needed in demo)

2. **Check Database**: Open `backend/db.sqlite3` with a SQLite browser

3. **View API Directly**: Visit http://127.0.0.1:8000/api/products/ in your browser

4. **Hot Reload**: Both frontend and backend support hot reload - just save files!

5. **Cart Data**: Cart is stored locally in browser, even after page refresh

---

## 🎓 Learning Paths

### Study React/Frontend
Navigate to `frontend/src/` and check:
- `pages/` - Page components with API calls
- `components/` - Reusable UI components  
- `services/api.js` - Axios configuration

### Study Django/Backend
Navigate to `backend/apps/` and check:
- `products/` - Product API endpoints
- `users/` - Authentication system
- `orders/` - Cart and order handling

---

## 🌐 URLs Reference

| Page | URL |
|------|-----|
| Home | http://localhost:5173 |
| Products | http://localhost:5173/products |
| Cart | http://localhost:5173/cart |
| Login | http://localhost:5173/login |
| Register | http://localhost:5173/register |
| API Products | http://127.0.0.1:8000/api/products/ |
| Admin Panel | http://127.0.0.1:8000/admin |

---

**Ready to explore? Open http://localhost:5173 in your browser! 🌸**
