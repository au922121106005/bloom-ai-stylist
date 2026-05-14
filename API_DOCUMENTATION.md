# 🌸 Bloom Bouquet API Documentation

## Bloom API Base URL
```
http://127.0.0.1:8000/api
```


---

# Products API

## Get All Products
```
GET /api/products/
```

**Response Example:**
```json
[
  {
    "id": 1,
    "name": "Rose Whisper Bouquet",
    "description": "Elegant romantic bouquet with soft rose petals and premium floral styling.",
    "price": "199.00",
    "image": "/src/assets/images/roseWhisperBouquet.jpg",
    "created_at": "2026-05-14T10:30:22Z"
  },
  {
    "id": 2,
    "name": "Crimson Love Arrangement",
    "description": "Luxury crimson floral arrangement crafted for romantic occasions.",
    "price": "249.00",
    "image": "/src/assets/images/crimsonLoveArrangement.jpg",
    "created_at": "2026-05-14T10:30:22Z"
  }
]
```

### Get Single Product
```
GET /api/products/{id}/
```

**Example:**
```
GET /api/products/1/
```

**Response:**
```json
{
  "id": 1,
  "name": "Rose Whisper Bouquet",
  "description": "Elegant romantic bouquet with soft rose petals and premium floral styling.",
  "price": "199.00",
  "image": "/src/assets/images/roseWhisperBouquet.jpg",
  "created_at": "2026-05-14T10:30:22Z"
}
```

---

## Users API

### Register User
```
POST /api/users/register/
```

**Request Body:**
```json
{
  "username": "angel",
  "email": "angel@example.com",
  "password": "securepassword123",
  "password2": "securepassword123"
}
```

**Response (201 Created):**
```json
{
  "message": "User registered successfully",
  "user": {
    "id": 1,
    "username": "angel",
    "email": "angel@example.com",
    "first_name": "",
    "last_name": ""
  }
}
```

### Login User
```
POST /api/users/login/
```

**Request Body:**
```json
{
  "email": "angel@example.com",
  "password": "securepassword123"
}
```

**Response (200 OK):**
```json
{
  "message": "Login successful",
  "user": {
    "id": 1,
    "username": "angel",
    "email": "angel@example.com",
    "first_name": "",
    "last_name": ""
  },
  "token": "sampleauthtoken"
}
```

### Get User Profile
```
GET /api/users/profile/
```

**Authentication:** Required

**Response:**
```json
{
  "id": 1,
  "user": {
    "id": 1,
    "username": "angel",
    "email": "angel@example.com"
  },
  "phone": "",
  "address": "",
  "created_at": "2026-05-14T10:30:22Z"
}
```

---

## Cart API

### Get Cart
```
GET /api/cart/
```

**Response:**
```json
{
  "id": 1,
  "user": 1,
  "items": [
    {
      "id": 1,
      "product_id": 1,
      "product_name": "Rose Whisper Bouquet",
      "quantity": 1,
      "price": "199.00"
    }
  ],
  "created_at": "2026-05-14T10:30:22Z"
}
```

### Add to Cart
```
POST /api/cart/
```

**Request Body:**
```json
{
  "product_id": 1,
  "product_name": "Rose Whisper Bouquet",
  "quantity": 1,
  "price": "199.00"
}
```

**Response:**
```json
{
  "id": 1,
  "user": 1,
  "items": [
    {
      "id": 1,
      "product_id": 1,
      "product_name": "Rose Whisper Bouquet",
      "quantity": 1,
      "price": "199.00"
    }
  ],
  "created_at": "2026-05-14T10:30:22Z"
}
```

### Remove from Cart
```
DELETE /api/cart/{item_id}/
```

**Example:**
```
DELETE /api/cart/1/
```

**Response:**
```json
{
  "id": 1,
  "user": 1,
  "items": [],
  "created_at": "2026-05-14T10:30:22Z"
}
```

---

## Orders API

### Get User Orders
```
GET /api/orders/
```

**Response:**
```json
[
  {
    "id": 1,
    "user": 1,
    "total_price": "199.00",
    "status": "pending",
    "items": [
      {
        "id": 1,
        "product_id": 1,
        "product_name": "Rose Whisper Bouquet",
        "quantity": 1,
        "price": "199.00"
      }
    ],
    "created_at": "2026-05-14T10:30:22Z"
  }
]
```

### Create Order
```
POST /api/orders/
```

**Note:** Creates an order from the current cart. Cart must have items.

**Request Body:** (empty or null)
```json
{}
```

**Response (201 Created):**
```json
{
  "id": 1,
  "user": 1,
  "total_price": "199.00",
  "status": "pending",
  "items": [
    {
      "id": 1,
      "product_id": 1,
      "product_name": "Rose Whisper Bouquet",
      "quantity": 1,
      "price": "199.00"
    }
  ],
  "created_at": "2026-05-14T10:30:22Z"
}
```

---

## Error Responses

### 400 Bad Request
```json
{
  "error": "Invalid request data"
}
```

### 401 Unauthorized
```json
{
  "error": "Invalid credentials"
}
```

### 404 Not Found
```json
{
  "error": "Resource not found"
}
```

### 500 Internal Server Error
```json
{
  "error": "Server error message"
}
```

---

## Testing with cURL

### Get Products
```bash
curl http://127.0.0.1:8000/api/products/
```

### Register User
```bash
curl -X POST http://127.0.0.1:8000/api/users/register/ \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "email": "test@example.com",
    "password": "testpass123",
    "password2": "testpass123"
  }'
```

### Login
```bash
curl -X POST http://127.0.0.1:8000/api/users/login/ \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "password": "testpass123"
  }'
```

### Add to Cart
```bash
curl -X POST http://127.0.0.1:8000/api/cart/ \
  -H "Content-Type: application/json" \
  -d '{
    "product_id": 1,
    "product_name": "Rose Whisper Bouquet",
    "quantity": 1,
    "price": "199.00"
  }'
```

---

## Status Codes

| Code | Meaning | Common Cause |
|------|---------|-------------|
| 200 | OK | Request successful |
| 201 | Created | Resource created |
| 400 | Bad Request | Invalid data |
| 401 | Unauthorized | Auth required |
| 404 | Not Found | Resource missing |
| 500 | Server Error | Server problem |

---

## Notes

1. **Authentication**: Current demo doesn't require authentication (simplified for learning)
2. **CORS**: Enabled for `http://localhost:5173`
3. **Pagination**: Products endpoint supports pagination (default 10 per page)
4. **Images**: Images are loaded from external URLs (Unsplash)

For production, implement:
- JWT token-based authentication
- Request rate limiting
- Input validation
- Database optimization
- Security headers


## Future Improvements
- JWT authentication
- Online payment integration
- Real-time order tracking
- AI-powered bouquet customization
- Email notifications
- Admin dashboard