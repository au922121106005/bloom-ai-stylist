import { useEffect, useState } from 'react'
import ProductCard from '../components/ProductCard'
import { productsData } from '../data/products'
import nature from '../assets/images/nature.png'
import asianflower from '../assets/images/asianflower.png'
import bouquet from '../assets/images/bouquet.png'
import heroImage from '../assets/images/heroImage.jpg'
import ScrollReveal from '../components/ScrollReveal'

export default function Home() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const featuredIds = [2, 14, 13]
    const featured = productsData.filter(p => featuredIds.includes(p.id))
    setProducts(featured)
    setLoading(false)
  }, [])

  return (
    <div className="bg-[#faf7f5] min-h-screen">

      {/* 🌸 HERO */}
      <ScrollReveal>
        <div className="flex flex-col md:flex-row items-center justify-between px-6 md:px-24 py-28 gap-14">

          <div className="md:w-1/2 space-y-6">

            <p className="uppercase tracking-[0.3em] text-gray-400 text-xs">
              Luxury Floral Studio
            </p>

            <h1 className="text-5xl md:text-6xl font-extralight leading-[1.1] text-gray-900">
              Flowers that <br />
              <span className="font-light italic text-gray-700">speak emotions</span>
            </h1>

            <p className="text-gray-500 text-lg leading-relaxed max-w-md">
              Handcrafted bouquets designed like art — inspired by nature, made for moments that matter.
            </p>

            <div className="flex gap-4 pt-2">
              <a href="/bouquets" className="px-7 py-3 bg-black text-white rounded-full text-sm">
                Explore Collection
              </a>
              <a href="/bouquets" className="px-7 py-3 border border-gray-300 text-gray-700 rounded-full text-sm">
                Custom Orders
              </a>
            </div>

          </div>

          <div className="md:w-1/2 relative">
            <div className="w-full h-[460px] rounded-[50px] overflow-hidden shadow-2xl relative">

              <img
                src={heroImage}
                className="w-full h-full object-cover scale-105 hover:scale-110 transition duration-700"
                alt="hero bouquet"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>

            </div>

            <div className="absolute -bottom-10 -left-8 bg-white/90 backdrop-blur-xl p-5 rounded-2xl shadow-xl w-48">
              <p className="text-xs text-gray-500">Featured</p>
              <p className="font-light text-gray-900 mt-1">Spring Roses</p>
              <p className="text-xs text-gray-400 mt-2">Fresh seasonal pick</p>
            </div>

          </div>

        </div>
      </ScrollReveal>

      {/* 🌿 FEATURE STRIP */}
      <ScrollReveal>
        <div className="px-6 md:px-20 py-16 border-t border-b border-gray-200">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 text-center text-gray-700">

            <div className="flex flex-col items-center gap-3">
              <img src={nature} className="w-10 h-10 opacity-80" alt="" />
              <p className="text-sm font-medium">Farm Fresh Florals</p>
              <p className="text-xs text-gray-500">Handpicked daily blooms</p>
            </div>

            <div className="flex flex-col items-center gap-3">
              <img src="https://cdn-icons-png.flaticon.com/512/1048/1048313.png" className="w-10 h-10 opacity-80" alt="" />
              <p className="text-sm font-medium">Same Day Delivery</p>
              <p className="text-xs text-gray-500">Fast & reliable</p>
            </div>

            <div className="flex flex-col items-center gap-3">
              <img src={bouquet} className="w-10 h-10 opacity-80" alt="" />
              <p className="text-sm font-medium">Custom Bouquets</p>
              <p className="text-xs text-gray-500">Made for moments</p>
            </div>

            <div className="flex flex-col items-center gap-3">
              <img src={asianflower} className="w-10 h-10 opacity-80" alt="" />
              <p className="text-sm font-medium">Seasonal Collections</p>
              <p className="text-xs text-gray-500">Fresh every season</p>
            </div>

          </div>
        </div>
      </ScrollReveal>

      {/* 🌼 FEATURED GRID */}
      <ScrollReveal>
        <div className="px-6 md:px-20 py-28">

          <div className="mb-16 text-center">
            <h2 className="text-3xl font-light">Featured Bouquets</h2>
            <p className="text-gray-500 mt-3">
              A curated selection of our most loved arrangements
            </p>
          </div>

          {loading ? (
            <p className="text-center text-gray-500">Loading...</p>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 auto-rows-[200px]">

              {products.map((product, index) => (
                <div
                  key={product.id}
                  id={`product-${product.id}`}
                  className={`relative overflow-hidden rounded-3xl group
                    ${index === 0 ? "col-span-2 row-span-2" : ""}
                  `}
                >

                  <img
                    src={product.image}
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
                    alt=""
                  />

                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition"></div>

                  <div className="absolute bottom-0 left-0 p-6 text-white">
                    <h3 className="text-lg font-light">{product.name}</h3>
                    <p className="text-xs text-white/80">₹{product.price}</p>
                  </div>

                </div>
              ))}

            </div>
          )}

        </div>
      </ScrollReveal>

      {/* 🌸 CLOSING */}
      <ScrollReveal>
        <div className="px-6 md:px-20 pb-28">

          <div className="relative overflow-hidden rounded-[40px] bg-gradient-to-br from-[#f5f1ee] to-white p-16 text-center">

            <div className="relative z-10 max-w-3xl mx-auto">

              <h3 className="text-3xl font-light">Not just flowers. A feeling.</h3>

              <p className="text-gray-600 mt-5">
                Every bouquet is designed like a story — simple, emotional, unforgettable.
              </p>

            </div>

          </div>

        </div>
      </ScrollReveal>

    </div>
  )
}