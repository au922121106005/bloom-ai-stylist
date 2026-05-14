import { Link } from 'react-router-dom'

export default function CartSidebar({ cart, onRemove, onUpdate }) {
  const total = cart.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0)

  return (
    <div className="w-full bg-white rounded-lg shadow-lg p-6 h-fit sticky top-20">
      <h2 className="text-2xl font-bold text-gray-800 mb-4 pb-4 border-b-2 border-gray-200">
        🛒 Cart ({cart.length})
      </h2>

      {cart.length === 0 ? (
        <p className="text-gray-500 text-center py-8">Your cart is empty</p>
      ) : (
        <>
          <div className="space-y-2 mb-6 max-h-96 overflow-y-auto">
            {cart.map(item => (
              <div key={item.id} className="bg-gray-50 rounded-lg p-2 flex gap-2 items-center border border-gray-200 hover:shadow-lg transition">
                {/* Image */}
                <img 
                  src={item.image} 
                  alt={item.name}
                  className="w-14 h-14 object-cover rounded flex-shrink-0"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/100?text=' + item.name
                  }}
                />
                
                {/* Quantity Controls */}
                <div className="flex items-center gap-0.5 flex-shrink-0">
                  <button
                    onClick={() => onUpdate(item.id, Math.max(1, (item.quantity || 1) - 1))}
                    className="bg-red-500 hover:bg-red-600 text-white px-1.5 py-0.5 rounded font-bold text-xs w-6 h-6 flex items-center justify-center"
                  >
                    −
                  </button>
                  <span className="font-semibold text-gray-800 text-xs w-6 text-center">{item.quantity || 1}</span>
                  <button
                    onClick={() => onUpdate(item.id, (item.quantity || 1) + 1)}
                    className="bg-green-500 hover:bg-green-600 text-white px-1.5 py-0.5 rounded font-bold text-xs w-6 h-6 flex items-center justify-center"
                  >
                    +
                  </button>
                </div>
                
                {/* Price */}
                <div className="text-sm font-bold text-green-600 flex-shrink-0 min-w-fit px-2">
                  ₹{(item.price * (item.quantity || 1))}
                </div>
                
                {/* Delete */}
                <button
                  onClick={() => onRemove(item.id)}
                  className="text-red-600 hover:text-red-800 font-bold flex-shrink-0 text-lg w-6 text-center"
                >
                  ×
                </button>
              </div>
            ))}
          </div>

          <div className="bg-gray-50 rounded-lg p-3 mb-4 space-y-2 text-sm">
            <div className="flex justify-between text-gray-700">
              <span>Subtotal:</span>
              <span>₹{total}</span>
            </div>
            <div className="flex justify-between text-gray-700 text-xs">
              <span>Tax (10%):</span>
              <span>₹{(total * 0.1).toFixed(0)}</span>
            </div>
            <div className="flex justify-between font-bold text-gray-900 pt-2 border-t border-gray-300">
              <span>Total:</span>
              <span>₹{(total * 1.1).toFixed(0)}</span>
            </div>
          </div>

          <div className="space-y-2">
            <Link
              to="/cart"
              className="block text-center bg-blue-600 text-white py-2 rounded-lg font-bold hover:bg-blue-700 transition text-sm"
            >
              View Full Cart
            </Link>
            <Link
              to="/payment"
              className="block text-center bg-green-600 text-white py-2 rounded-lg font-bold hover:bg-green-700 transition text-sm"
            >
              Buy Now
            </Link>
          </div>
        </>
      )}
    </div>
  )
}
