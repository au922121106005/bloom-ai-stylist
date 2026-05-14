import { Link, useNavigate } from 'react-router-dom'

export default function Navbar({ cart = [], isLoggedIn, onLogout }) {
  const navigate = useNavigate()

  return (
    <nav className="bg-[#faf7f5] border-b border-gray-200 px-6 md:px-16 py-5 flex items-center justify-between">

      {/* LOGO */}
      <Link to="/" className="text-xl font-light tracking-wide text-gray-900">
        🌸 bloom
      </Link>

      {/* CENTER LINKS */}
      <div className="hidden md:flex gap-8 text-gray-600 text-sm">

        <Link to="/" className="hover:text-black transition">Home</Link>

        <Link to="/bouquets" className="hover:text-black transition">
          Bouquets
        </Link>

        <Link to="/saved" className="hover:text-black transition">
          Saved
        </Link>

        <Link to="/stories" className="hover:text-black transition">
          Stories
        </Link>

        <Link to="/ai-stylist" className="hover:text-black transition">
          AI Stylist
        </Link>

      </div>

      {/* RIGHT ACTIONS */}
      <div className="flex items-center gap-4">

        <button
          onClick={() => navigate('/cart')}
          className="text-sm px-3 py-1 border rounded-full hover:bg-black hover:text-white transition"
        >
          🛒 {cart.length}
        </button>

        {isLoggedIn ? (
          <button
            onClick={onLogout}
            className="text-sm px-4 py-1 rounded-full bg-black text-white hover:bg-gray-800 transition"
          >
            Logout
          </button>
        ) : (
          <div className="flex gap-2">

            <button
              onClick={() => navigate('/login')}
              className="text-sm px-4 py-1 border rounded-full hover:bg-black hover:text-white transition"
            >
              Login
            </button>

            <button
              onClick={() => navigate('/register')}
              className="text-sm px-4 py-1 bg-black text-white rounded-full hover:opacity-90 transition"
            >
              Join
            </button>

          </div>
        )}

      </div>
    </nav>
  )
}