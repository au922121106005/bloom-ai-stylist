import { useState } from 'react'
import ProductCard from '../components/ProductCard'
import { productsData } from '../data/products'

import amourIcon from '../assets/images/amourIcon.png'
import elegantIcon from '../assets/images/elegantIcon.png'
import freshIcon from '../assets/images/freshIcon.png'
import luxuryIcon from '../assets/images/luxuryIcon.png'
import naturalIcon from '../assets/images/naturalIcon.png'

export default function Bouquets({ cart, setCart }) {
  const [filter, setFilter] = useState('all')

  const categories = [
    { key: 'all', label: 'All' },
    { key: 'amour', label: 'Amour' },
    { key: 'elegant', label: 'Elegant' },
    { key: 'fresh', label: 'Fresh' },
    { key: 'luxury', label: 'Luxury' },
    { key: 'natural', label: 'Natural' }
  ]

  const addToCart = (item) => {
    const updatedCart = [...cart, item]

    setCart(updatedCart)

    localStorage.setItem(
      'cart',
      JSON.stringify(updatedCart)
    )
  }

  const addToWishlist = (item) => {
    const existingWishlist =
      JSON.parse(localStorage.getItem('wishlist')) || []

    const alreadyExists = existingWishlist.find(
      product => product.id === item.id
    )

    if (alreadyExists) {
      alert('Already saved!')
      return
    }

    localStorage.setItem(
      'wishlist',
      JSON.stringify([...existingWishlist, item])
    )
  }

  const renderCollection = (
    category,
    title,
    subtitle,
    description,
    icon
  ) => (
    <section className="mb-28">

      {/* SECTION HEADER */}
      <div className="mb-12">

        <p className="uppercase tracking-[0.3em] text-xs text-gray-400 mb-4">
          {subtitle}
        </p>

        <div className="flex items-center gap-4 mb-4">
          <img
            src={icon}
            alt={title}
            className="w-12 h-12 object-contain opacity-90"
          />

          <h2 className="text-4xl font-light text-gray-900">
            {title}
          </h2>
        </div>

        <p className="text-gray-500 max-w-2xl">
          {description}
        </p>

      </div>

      {/* PRODUCTS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

        {productsData
          .filter(product => product.category === category)
          .map(product => (

            <div
              key={product.id}
              className="group transition duration-500 hover:-translate-y-3"
            >

              <ProductCard
                product={product}
                addToCart={addToCart}
                addToWishlist={addToWishlist}
              />

            </div>

          ))}

      </div>

    </section>
  )

  return (
    <div className="min-h-screen bg-[#faf7f5] px-6 md:px-20 py-16">

      {/* PAGE HEADER */}
      <div className="text-center mb-14">

        <p className="uppercase tracking-[0.3em] text-xs text-gray-400 mb-3">
          bloom Collections
        </p>

        <h1 className="text-5xl md:text-6xl font-extralight text-gray-900">
          Bouquets
        </h1>

        <p className="text-gray-500 mt-5 max-w-2xl mx-auto leading-relaxed">
          Discover handcrafted floral arrangements designed for every
          emotion, celebration, and unforgettable moment.
        </p>

      </div>

      {/* FILTER BUTTONS */}
      <div className="flex flex-wrap justify-center gap-4 mb-24">

        {categories.map(cat => (

          <button
            key={cat.key}
            onClick={() => setFilter(cat.key)}
            className={`
              px-6 py-2 rounded-full text-sm tracking-wide border transition-all duration-300

              ${filter === cat.key
                ? 'bg-black text-white scale-105 shadow-lg'
                : 'bg-white text-gray-600 border-gray-200 hover:border-black hover:scale-105'
              }
            `}
          >
            {cat.label}
          </button>

        ))}

      </div>

      {/* COLLECTIONS */}

      {(filter === 'all' || filter === 'amour') &&
        renderCollection(
          'amour',
          'Amour Collection',
          'Signature Romance',
          'Romantic floral arrangements crafted with soft roses and warm tones.',
          amourIcon
        )
      }

      {(filter === 'all' || filter === 'elegant') &&
        renderCollection(
          'elegant',
          'Elegant Collection',
          'Minimal Luxury',
          'Clean floral aesthetics with soft neutral palettes and timeless beauty.',
          elegantIcon
        )
      }

      {(filter === 'all' || filter === 'fresh') &&
        renderCollection(
          'fresh',
          'Fresh Collection',
          'Seasonal blooms',
          'Bright floral mixes inspired by spring mornings and golden sunlight.',
          freshIcon
        )
      }

      {(filter === 'all' || filter === 'luxury') &&
        renderCollection(
          'luxury',
          'Luxury Collection',
          'Premium Floral Art',
          'Dramatic statement bouquets designed for unforgettable moments.',
          luxuryIcon
        )
      }

      {(filter === 'all' || filter === 'natural') &&
        renderCollection(
          'natural',
          'Natural Collection',
          'Earth Inspired',
          'Rustic textures and grounded botanical arrangements inspired by nature.',
          naturalIcon
        )
      }

    </div>
  )
}