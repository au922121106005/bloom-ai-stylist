import { useEffect, useState } from 'react'

export default function Saved() {
  const [wishlist, setWishlist] = useState([])

  useEffect(() => {
    const stored =
      JSON.parse(localStorage.getItem('wishlist')) || []

    setWishlist(stored)
  }, [])

  return (
    <div className="min-h-screen bg-[#faf7f5] px-6 md:px-20 py-16">

      <h1 className="text-4xl font-light text-center text-gray-900 mb-14">
        Saved Bouquets
      </h1>

      {wishlist.length === 0 ? (
        <p className="text-center text-gray-400">
          No saved bouquets yet 🌸
        </p>
      ) : (
        <div className="grid md:grid-cols-3 gap-8">

          {wishlist.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-[30px] overflow-hidden shadow-sm"
            >
              <img
                src={item.image}
                className="w-full h-[350px] object-cover"
              />

              <div className="p-5">
                <h3 className="text-xl font-light">
                  {item.name}
                </h3>

                <p className="text-gray-500 mt-2">
                  ₹{item.price}
                </p>
              </div>
            </div>
          ))}

        </div>
      )}
    </div>
  )
}