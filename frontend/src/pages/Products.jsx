import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import CartSidebar from '../components/CartSidebar'
import Toast from '../components/Toast'
import { productsData } from '../data/products'

export default function Products({ setCart, cart }) {
  const location = useLocation()
  const [localCart, setLocalCart] = useState(cart)
  const [toast, setToast] = useState(null)

  const handleAddToCart = (product) => {
    const existingItem = localCart.find(item => item.id === product.id)

    if (existingItem) {
      alert(`${product.name} is already added to cart!`)
      return
    }

    const updatedCart = [...localCart, { ...product, quantity: 1 }]
    setLocalCart(updatedCart)
    setCart(updatedCart)

    setToast({
      message: `${product.name} added to cart!`,
      type: 'success'
    })
  }

  const handleRemove = (id) => {
    const updatedCart = localCart.filter(item => item.id !== id)
    setLocalCart(updatedCart)
    setCart(updatedCart)
  }

  const handleUpdate = (id, quantity) => {
    if (quantity <= 0) {
      handleRemove(id)
    } else {
      const updatedCart = localCart.map(item =>
        item.id === id ? { ...item, quantity } : item
      )
      setLocalCart(updatedCart)
      setCart(updatedCart)
    }
  }

  useEffect(() => {
    if (location.hash) {
      const targetId = location.hash.replace('#', '')
      const targetElement = document.getElementById(targetId)
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }
  }, [location.hash])

  return (
    <div className="min-h-screen max-w-7xl mx-auto px-4 py-12">

      {/* HEADER */}
      <h1 className="text-4xl font-light mb-12 text-center text-gray-800">
        🌸 Bouquet Collection
      </h1>

      <div className="flex gap-8">

        {/* 🌿 MASONRY GRID */}
        <div className="flex-1">
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">

            {productsData.map(product => (
              <div
                key={product.id}
                id={`product-${product.id}`}
                className="break-inside-avoid mb-6"
              >
                <ProductCard
                  product={product}
                  addToCart={handleAddToCart}
                />
              </div>
            ))}

          </div>
        </div>

        {/* 🛒 CART SIDEBAR */}
        <div className="w-[320px] hidden lg:block">
          <CartSidebar
            cart={localCart}
            onRemove={handleRemove}
            onUpdate={handleUpdate}
          />
        </div>

      </div>

      {/* TOAST */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

    </div>
  )
}