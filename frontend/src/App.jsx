import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useEffect, useState } from 'react'

import Toast from './components/Toast'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

import Home from './pages/Home'
import Bouquets from './pages/Bouquets'
import Saved from './pages/Saved'
import Stories from './pages/Stories'
import ChatPage from './pages/ChatPage'

import ProductDetails from './pages/ProductDetails'
import Cart from './pages/Cart'
import Payment from './pages/Payment'
import OrderSummary from './pages/OrderSummary'

import Feedback from './pages/Feedback'

import Login from './pages/Login'
import Register from './pages/Register'
import ForgotPassword from './pages/ForgotPassword'

function App() {

  const [cart, setCart] = useState(() => {

    const storedCart = localStorage.getItem('cart')

    return storedCart
      ? JSON.parse(storedCart)
      : []

  })

  const [isLoggedIn, setIsLoggedIn] = useState(
    () => !!localStorage.getItem('token')
  )

  const [toast, setToast] = useState(null)

  // ---------------------------------------
  // SAVE CART
  // ---------------------------------------

  useEffect(() => {

    localStorage.setItem(
      'cart',
      JSON.stringify(cart)
    )

  }, [cart])

  // ---------------------------------------
  // LOGOUT
  // ---------------------------------------

  const handleLogout = () => {

    localStorage.removeItem('token')
    localStorage.removeItem('cart')

    setCart([])
    setIsLoggedIn(false)

    setToast({
      message: 'Logged out successfully!',
      type: 'success'
    })

  }

  return (

    <Router>

      {/* TOAST */}

      {toast && (

        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />

      )}

      {/* NAVBAR */}

      <Navbar
        cart={cart}
        isLoggedIn={isLoggedIn}
        onLogout={handleLogout}
      />

      {/* ROUTES */}

      <Routes>

        {/* HOME */}

        <Route
          path="/"
          element={<Home />}
        />

        {/* MAIN PAGES */}

        <Route
          path="/bouquets"
          element={
            <Bouquets
              cart={cart}
              setCart={setCart}
            />
          }
        />

        <Route
          path="/saved"
          element={<Saved />}
        />

        <Route
          path="/stories"
          element={<Stories />}
        />

        {/* AI STYLIST */}

        <Route
          path="/ai-stylist"
          element={<ChatPage />}
        />

        {/* AUTH */}

        <Route
          path="/login"
          element={
            <Login
              setIsLoggedIn={setIsLoggedIn}
            />
          }
        />

        <Route
          path="/register"
          element={
            <Register
              setIsLoggedIn={setIsLoggedIn}
            />
          }
        />

        <Route
          path="/forgot-password"
          element={<ForgotPassword />}
        />

        {/* SHOPPING */}

        <Route
          path="/product/:id"
          element={
            <ProductDetails
              cart={cart}
              setCart={setCart}
            />
          }
        />

        <Route
          path="/cart"
          element={
            <Cart
              cart={cart}
              setCart={setCart}
              isLoggedIn={isLoggedIn}
            />
          }
        />

        <Route
          path="/checkout"
          element={
            <Payment
              cart={cart}
              setCart={setCart}
              isLoggedIn={isLoggedIn}
            />
          }
        />

        <Route
          path="/orders"
          element={
            <OrderSummary
              isLoggedIn={isLoggedIn}
            />
          }
        />

        {/* FEEDBACK */}

        <Route
          path="/feedback"
          element={<Feedback />}
        />

      </Routes>

      {/* FOOTER */}

      <Footer />

    </Router>

  )
}

export default App