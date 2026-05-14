import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getProduct } from '../services/api'

export default function ProductDetails({ setCart, cart }) {
  const { id } = useParams()
  const navigate = useNavigate()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [quantity, setQuantity] = useState(1)

  useEffect(() => {
    fetchProduct()
  }, [id])

  const fetchProduct = async () => {
    try {
      const response = await getProduct(id)
      setProduct(response.data)
      setLoading(false)
    } catch (error) {
      console.error('Error fetching product:', error)
      setLoading(false)
    }
  }

  const handleAddToCart = () => {
    if (product) {
      setCart(prev => {
        const existingItem = prev.find(item => item.id === product.id)
        if (existingItem) {
          alert(`${product.name} is already added to cart!`)
          return prev
        } else {
          return [...prev, { ...product, quantity }]
        }
      })
      if (!cart.find(item => item.id === product.id)) {
        alert(`Added ${quantity} to cart!`)
        navigate('/cart')
      }
    }
  }

  if (loading) return <div className="text-center py-12 text-xl">Loading...</div>
  if (!product) return <div className="text-center py-12 text-xl text-red-500">Product not found</div>

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <button 
        onClick={() => navigate('/products')}
        className="mb-6 bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600"
      >
        ← Back to Products
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white p-8 rounded-lg shadow-lg">
        <div className="bg-cream rounded-lg flex items-center justify-center">
          <img 
            src={product.image} 
            alt={product.name}
            className="max-w-full h-auto max-h-96"
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/400?text=' + product.name
            }}
          />
        </div>

        <div>
          <h1 className="text-4xl font-bold mb-4 text-gray-800">{product.name}</h1>
          <p className="text-2xl font-bold text-green-500 mb-4">₹{product.price}</p>
          <p className="text-gray-700 mb-6 text-lg">{product.description}</p>

          <div className="mb-6">
            <label className="block font-bold mb-2">Quantity:</label>
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400 font-bold"
              >
                -
              </button>
              <span className="text-2xl font-bold">{quantity}</span>
              <button 
                onClick={() => setQuantity(quantity + 1)}
                className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400 font-bold"
              >
                +
              </button>
            </div>
          </div>

          <button
            onClick={handleAddToCart}
            className="w-full bg-pink-500 text-white py-3 rounded-lg font-bold text-lg hover:bg-pink-600 transition"
          >
            Add to Cart
          </button>

          <div className="mt-8 p-4 bg-cream rounded-lg">
            <h3 className="font-bold mb-2">Product Details:</h3>
            <ul className="text-gray-600">
              <li>✓ Premium quality ingredient</li>
              <li>✓ Freshly made</li>
              <li>✓ Fast and safe delivery</li>
              <li>✓ 100% Satisfaction guaranteed</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
