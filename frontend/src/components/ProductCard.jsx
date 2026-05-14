export default function ProductCard({
  product,
  addToCart,
  addToWishlist
}) {
  return (
    <div className="break-inside-avoid group cursor-pointer">

      <div className="relative overflow-hidden rounded-[32px]">

        {/* IMAGE */}
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-[420px] object-cover group-hover:scale-110 transition duration-700"
        />

        {/* DARK OVERLAY */}
        <div className="absolute inset-0 bg-black/10 group-hover:bg-black/35 transition duration-500"></div>

        {/* CONTENT */}
        <div className="absolute bottom-0 left-0 w-full p-6 text-white">

          <div className="translate-y-8 group-hover:translate-y-0 transition duration-500">

            <div className="flex justify-between items-start">

              <div>
                <h3 className="text-xl font-light">
                  {product.name}
                </h3>

                <p className="text-sm text-white/80 mt-1">
                  ₹{product.price}
                </p>
              </div>

              <button
                onClick={() => addToWishlist(product)}
                className="text-xl hover:text-red-300 transition"
              >
                ♥
              </button>

            </div>

            <p className="text-sm text-white/80 mt-3 opacity-0 group-hover:opacity-100 transition duration-500">
              {product.description}
            </p>

            {/* BUTTONS */}
            <div className="flex gap-3 mt-5 opacity-0 group-hover:opacity-100 transition duration-500">

              <button
                onClick={() => addToCart(product)}
                className="flex-1 bg-white text-black py-3 rounded-full text-sm hover:bg-gray-200 transition"
              >
                Add to Cart
              </button>

              <button
                onClick={() => addToWishlist(product)}
                className="px-5 border border-white rounded-full text-sm hover:bg-white hover:text-black transition"
              >
                Save
              </button>

            </div>

          </div>

        </div>

      </div>

    </div>
  )
}