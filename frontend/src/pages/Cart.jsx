import { useNavigate } from 'react-router-dom'

export default function Cart({ cart, setCart, isLoggedIn }) {
  const navigate = useNavigate()

  const removeItem = (id) => {
    const updatedCart = cart.filter(item => item.id !== id)
    setCart(updatedCart)
  }

  const updateQuantity = (id, quantity) => {
    if (quantity <= 0) {
      removeItem(id)
      return
    }

    const updatedCart = cart.map(item =>
      item.id === id
        ? { ...item, quantity }
        : item
    )

    setCart(updatedCart)
  }

  const total = cart.reduce(
    (sum, item) => sum + item.price * (item.quantity || 1),
    0
  )

  return (
    <div className="min-h-screen bg-[#faf7f5] px-6 md:px-20 py-16">

      <h1 className="text-4xl font-light text-center text-gray-900 mb-14">
        Your Cart
      </h1>

      {cart.length === 0 ? (
        <p className="text-center text-gray-400">
          Your cart is empty 🛒
        </p>
      ) : (
        <div className="max-w-5xl mx-auto space-y-6">

          {cart.map(item => (
            <div
              key={item.id}
              className="bg-white rounded-3xl p-5 flex gap-6 items-center shadow-sm"
            >

              <img
                src={item.image}
                alt={item.name}
                className="w-32 h-32 object-cover rounded-2xl"
              />

              <div className="flex-1">

                <h2 className="text-2xl font-light">
                  {item.name}
                </h2>

                <p className="text-gray-500 mt-2">
                  ₹{item.price}
                </p>

                <div className="flex items-center gap-3 mt-4">

                  <button
                    onClick={() =>
                      updateQuantity(
                        item.id,
                        (item.quantity || 1) - 1
                      )
                    }
                    className="w-8 h-8 rounded-full bg-gray-200"
                  >
                    -
                  </button>

                  <span>
                    {item.quantity || 1}
                  </span>

                  <button
                    onClick={() =>
                      updateQuantity(
                        item.id,
                        (item.quantity || 1) + 1
                      )
                    }
                    className="w-8 h-8 rounded-full bg-gray-200"
                  >
                    +
                  </button>

                </div>

              </div>

              <div className="text-right">

                <p className="text-xl font-semibold">
                  ₹{item.price * (item.quantity || 1)}
                </p>

                <button
                  onClick={() => removeItem(item.id)}
                  className="mt-4 text-red-500"
                >
                  Remove
                </button>

              </div>

            </div>
          ))}

          <div className="bg-white rounded-3xl p-8 shadow-sm">

            <div className="flex justify-between text-2xl">
              <span>Total</span>
              <span>₹{total}</span>
            </div>

            <button
              onClick={() => navigate('/checkout')}
              className="w-full mt-6 bg-black text-white py-4 rounded-full"
            >
              Proceed to Checkout
            </button>

          </div>

        </div>
      )}
    </div>
  )
}