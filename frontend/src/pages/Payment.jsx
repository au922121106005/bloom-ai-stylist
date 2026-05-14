import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createOrder } from '../services/api'

export default function Payment({ cart, setCart, isLoggedIn }) {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    cardName: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const total = cart.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const validateForm = () => {
    if (!formData.cardName || !formData.cardNumber || !formData.expiryDate || !formData.cvv) {
      setError('Please fill in all payment details')
      return false
    }
    if (!formData.email || !formData.phone || !formData.address || !formData.city || !formData.state || !formData.zipCode) {
      setError('Please fill in all address details')
      return false
    }
    if (formData.cardNumber.length !== 16) {
      setError('Card number must be 16 digits')
      return false
    }
    if (formData.cvv.length !== 3) {
      setError('CVV must be 3 digits')
      return false
    }
    return true
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (!isLoggedIn) {
      setError('Please login before completing payment.')
      return
    }

    if (!validateForm()) {
      return
    }

    setLoading(true)
    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Save order to localStorage
      const order = {
        date: new Date().toISOString(),
        items: cart,
        customerInfo: formData,
        totalAmount: (total * 1.1).toFixed(0)
      }
      
      const orderItems = cart.map(item => ({
        product_id: item.product_id || item.id,
        product_name: item.product_name || item.name,
        quantity: item.quantity || 1,
        price: item.price
      }))

      await createOrder({
        items: orderItems,
        total_price: total * 1.1,
        customerInfo: formData,
      })

      alert('Payment processed successfully! Thank you for your order.')
      setCart([])
      localStorage.setItem('cart', JSON.stringify([]))
      navigate('/orders')
    } catch (err) {
      console.error('Payment error', err)
      const message = err.response?.data?.detail || err.response?.data?.error || err.message || 'Payment failed. Please try again.'
      setError(message)
    } finally {
      setLoading(false)
    }
  }

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center py-12 px-4">
        <div className="text-center bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Login Required</h1>
          <p className="text-gray-600 mb-6">You need to login before you can proceed to payment.</p>
          <button
            onClick={() => navigate('/login')}
            className="bg-blue-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-blue-700 transition"
          >
            Go to Login
          </button>
        </div>
      </div>
    )
  }

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center py-12 px-4">
        <div className="text-center bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Your Cart is Empty</h1>
          <p className="text-gray-600 mb-6">Please add products to your cart before proceeding to payment.</p>
          <button
            onClick={() => navigate('/products')}
            className="bg-blue-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-blue-700 transition"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-12 text-center text-gray-800">Secure Payment</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Payment Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-lg p-8">
              {error && (
                <div className="bg-red-100 text-red-700 p-4 rounded-lg mb-6 border-l-4 border-red-500">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Payment Information Section */}
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-4 pb-4 border-b-2 border-gray-200">
                    💳 Payment Information
                  </h2>

                  <div className="space-y-4">
                    <div>
                      <label className="block font-semibold text-gray-800 mb-2">Cardholder Name</label>
                      <input
                        type="text"
                        name="cardName"
                        value={formData.cardName}
                        onChange={handleChange}
                        placeholder="John Doe"
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                      />
                    </div>

                    <div>
                      <label className="block font-semibold text-gray-800 mb-2">Card Number</label>
                      <input
                        type="text"
                        name="cardNumber"
                        value={formData.cardNumber}
                        onChange={(e) => {
                          const value = e.target.value.replace(/\D/g, '').slice(0, 16)
                          setFormData(prev => ({
                            ...prev,
                            cardNumber: value
                          }))
                        }}
                        placeholder="1234 5678 9012 3456"
                        maxLength="16"
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all font-mono text-lg tracking-widest"
                      />
                      <p className="text-sm text-gray-500 mt-1">Enter 16-digit card number</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block font-semibold text-gray-800 mb-2">Expiry Date</label>
                        <input
                          type="text"
                          name="expiryDate"
                          value={formData.expiryDate}
                          onChange={(e) => {
                            let value = e.target.value.replace(/\D/g, '')
                            if (value.length >= 2) {
                              value = value.slice(0, 2) + '/' + value.slice(2, 4)
                            }
                            setFormData(prev => ({
                              ...prev,
                              expiryDate: value.slice(0, 5)
                            }))
                          }}
                          placeholder="MM/YY"
                          maxLength="5"
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                        />
                      </div>

                      <div>
                        <label className="block font-semibold text-gray-800 mb-2">CVV</label>
                        <input
                          type="text"
                          name="cvv"
                          value={formData.cvv}
                          onChange={(e) => {
                            const value = e.target.value.replace(/\D/g, '').slice(0, 3)
                            setFormData(prev => ({
                              ...prev,
                              cvv: value
                            }))
                          }}
                          placeholder="123"
                          maxLength="3"
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Shipping Address Section */}
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-4 pb-4 border-b-2 border-gray-200">
                    📍 Shipping Address
                  </h2>

                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block font-semibold text-gray-800 mb-2">Email</label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="your@email.com"
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                        />
                      </div>

                      <div>
                        <label className="block font-semibold text-gray-800 mb-2">Phone</label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="+1 (555) 123-4567"
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block font-semibold text-gray-800 mb-2">Address</label>
                      <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        placeholder="123 Main Street"
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                      />
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block font-semibold text-gray-800 mb-2">City</label>
                        <input
                          type="text"
                          name="city"
                          value={formData.city}
                          onChange={handleChange}
                          placeholder="New York"
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                        />
                      </div>

                      <div>
                        <label className="block font-semibold text-gray-800 mb-2">State</label>
                        <input
                          type="text"
                          name="state"
                          value={formData.state}
                          onChange={handleChange}
                          placeholder="NY"
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                        />
                      </div>

                      <div>
                        <label className="block font-semibold text-gray-800 mb-2">Zip Code</label>
                        <input
                          type="text"
                          name="zipCode"
                          value={formData.zipCode}
                          onChange={handleChange}
                          placeholder="10001"
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-blue-600 text-white py-4 rounded-lg font-bold text-lg hover:bg-blue-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  {loading ? 'Processing Payment...' : `Pay ₹${(total * 1.1).toFixed(0)}`}
                </button>
              </form>
            </div>
          </div>

          {/* Order Summary */}
          <div>
            <div className="bg-white rounded-lg shadow-lg p-6 sticky top-20">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 pb-4 border-b-2 border-gray-200">
                Order Summary
              </h2>

              <div className="space-y-3 mb-6">
                {cart.map(item => (
                  <div key={item.id} className="flex justify-between items-center pb-3 border-b border-gray-200">
                    <div>
                      <p className="font-semibold text-gray-800">{item.name}</p>
                      <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                    </div>
                    <p className="font-bold text-gray-800">₹{(item.price * item.quantity)}</p>
                  </div>
                ))}
              </div>

              <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                <div className="flex justify-between text-gray-700">
                  <span>Subtotal:</span>
                  <span>₹{total}</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>Shipping:</span>
                  <span>Free</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>Tax (10%):</span>
                  <span>₹{(total * 0.1).toFixed(0)}</span>
                </div>
                <div className="flex justify-between text-xl font-bold text-gray-900 pt-3 border-t-2 border-gray-300">
                  <span>Total:</span>
                  <span>₹{(total * 1.1).toFixed(0)}</span>
                </div>
              </div>

              <button
                onClick={() => navigate('/cart')}
                className="w-full mt-6 bg-gray-300 text-gray-800 py-2 rounded-lg font-bold hover:bg-gray-400 transition"
              >
                ← Back to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
