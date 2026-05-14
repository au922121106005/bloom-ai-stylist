import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getOrders } from '../services/api'

export default function OrderSummary({ isLoggedIn }) {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    if (!isLoggedIn) {
      setLoading(false)
      return
    }
    if (!isLoggedIn) {
      setLoading(false)
      return
    }

    const fetchOrders = async () => {
      try {
        const response = await getOrders()
        setOrders(response.data)
      } catch (error) {
        const storedOrders = localStorage.getItem('orders')
        if (storedOrders) {
          try {
            setOrders(JSON.parse(storedOrders))
          } catch (error) {
            console.error('Error loading orders:', error)
          }
        }
      } finally {
        setLoading(false)
      }
    }
    fetchOrders()
  }, [isLoggedIn])

  const calculateTotal = (items) => {
    return (items || []).reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0)
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center py-12 px-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800">Loading...</h1>
        </div>
      </div>
    )
  }

  if (!isLoggedIn) {
    return (
      <div className="fixed inset-0 z-50 bg-black/30 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-2xl p-10 max-w-xl w-full border border-gray-200">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Login Required</h1>
          <p className="text-gray-600 mb-6">You must log in to view your orders, access the cart section, and complete purchases.</p>
          <div className="flex flex-col sm:flex-row justify-end gap-3 mt-6">
            <button
              type="button"
              className="px-5 py-3 rounded-lg border border-gray-300 hover:bg-gray-100 text-gray-700"
              onClick={() => navigate('/')}
            >
              Back to Home
            </button>
            <Link
              to="/login"
              className="px-5 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700 text-center"
            >
              Login Now
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-12 text-center">📋 Order Summary</h1>

        {orders.length === 0 ? (
          <div className="bg-white rounded-lg shadow-lg p-12 text-center">
            <h2 className="text-2xl font-bold text-gray-600 mb-4">No Orders Yet</h2>
            <p className="text-gray-500 mb-6">You haven't placed any orders yet. Start shopping now!</p>
            <Link
              to="/products"
              className="inline-block bg-pink-500 text-white px-8 py-3 rounded-lg font-bold hover:bg-pink-600 transition"
            >
              Continue Shopping →
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition">
                <div className="bg-gradient-to-r from-pink-500 to-purple-500 px-6 py-4">
                  <div className="flex justify-between items-center">
                    <h2 className="text-xl font-bold text-white">Order #{orders.length - index}</h2>
                    <span className="bg-white text-pink-500 px-4 py-2 rounded-full font-bold text-sm">
                      {new Date(order.created_at).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  {/* Order Info */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6 pb-6 border-b border-gray-200">
                    <div>
                      <p className="text-gray-600 text-sm font-semibold">Customer</p>
                      <p className="text-gray-800 font-bold">{order.customer_name || order.user?.username || 'Guest'}</p>
                    </div>
                    <div>
                      <p className="text-gray-600 text-sm font-semibold">Email</p>
                      <p className="text-gray-800 font-bold">{order.customer_email || order.user?.email || 'guest@example.com'}</p>
                    </div>
                    <div>
                      <p className="text-gray-600 text-sm font-semibold">Status</p>
                      <p className="text-gray-800 font-bold">{order.status}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6 pb-6 border-b border-gray-200">
                    <div>
                      <p className="text-gray-600 text-sm font-semibold">Payment Name</p>
                      <p className="text-gray-800 font-bold">{order.payment_info?.cardName || 'N/A'}</p>
                    </div>
                    <div>
                      <p className="text-gray-600 text-sm font-semibold">Card Number</p>
                      <p className="text-gray-800 font-bold">{order.payment_info?.cardNumber || 'N/A'}</p>
                    </div>
                    <div>
                      <p className="text-gray-600 text-sm font-semibold">Expiry / CVV</p>
                      <p className="text-gray-800 font-bold">{order.payment_info ? `${order.payment_info?.expiryDate || '-'} / ${order.payment_info?.cvv || '-'}` : 'N/A'}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6 pb-6 border-b border-gray-200">
                    <div>
                      <p className="text-gray-600 text-sm font-semibold">Phone</p>
                      <p className="text-gray-800 font-bold">{order.customer_phone || 'N/A'}</p>
                    </div>
                    <div className="md:col-span-2">
                      <p className="text-gray-600 text-sm font-semibold">Shipping Address</p>
                      <p className="text-gray-800 font-bold">
                        {order.shipping_address || '-'}
                        {order.shipping_city ? `, ${order.shipping_city}` : ''}
                        {order.shipping_state ? `, ${order.shipping_state}` : ''}
                        {order.shipping_zip_code ? `, ${order.shipping_zip_code}` : ''}
                      </p>
                    </div>
                  </div>

                  {/* Order Metadata */}
                  <div className="mb-6 pb-6 border-b border-gray-200">
                    <p className="text-gray-600 text-sm font-semibold mb-2">Order Date</p>
                    <p className="text-gray-800 font-bold">{new Date(order.created_at).toLocaleString()}</p>
                  </div>

                  {/* Order Items and Summary */}
                  <div>
                    <p className="text-gray-600 text-sm font-semibold mb-3">Order Items</p>
                    <div className="space-y-2 mb-3">
                      {(order.items || []).map((item, itemIndex) => (
                        <div key={itemIndex} className="flex gap-3 items-center bg-gray-50 p-2 rounded">
                          <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-sm font-semibold text-gray-700">
                            {item.product_name.slice(0, 2).toUpperCase()}
                          </div>
                          <p className="text-xs font-semibold text-gray-800 flex-1 min-w-0 truncate">{item.product_name}</p>
                          <p className="text-xs text-gray-600 flex-shrink-0">₹{item.price} × {item.quantity}</p>
                          <p className="text-xs font-bold text-green-600 flex-shrink-0 w-12 text-right">₹{item.price * item.quantity}</p>
                        </div>
                      ))}
                    </div>

                    {/* Price Summary in Single Line */}
                    <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-3 rounded-lg border-2 border-blue-200">
                      <div className="flex gap-6 items-center justify-between text-xs">
                        <div className="flex items-center gap-2">
                          <span className="text-gray-700 font-semibold">Subtotal:</span>
                          <span className="text-gray-800 font-bold">₹{calculateTotal(order.items)}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-gray-700 font-semibold">Tax (10%):</span>
                          <span className="text-gray-800 font-bold">₹{(calculateTotal(order.items) * 0.1).toFixed(0)}</span>
                        </div>
                        <div className="flex items-center gap-2 px-4 py-2 bg-white rounded border-2 border-green-500">
                          <span className="text-gray-800 font-bold">Total Amount:</span>
                          <span className="text-green-600 font-bold">₹{(calculateTotal(order.items) * 1.1).toFixed(0)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
