import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import API from '../services/api'

export default function Login({ setIsLoggedIn }) {

  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })

  }

  const handleSubmit = async (e) => {

    e.preventDefault()

    setLoading(true)

    try {

      const response = await API.post('/users/login/', formData)

      localStorage.setItem(
        'token',
        response.data.access
      )

      setIsLoggedIn(true)

      navigate('/')

    } catch (error) {

      console.error(error)

      alert('Invalid email or password')

    } finally {

      setLoading(false)

    }
  }

  return (

    <div className="min-h-screen bg-cream flex items-center justify-center px-6 py-20">

      <div className="
        w-full
        max-w-md
        bg-white
        rounded-[2rem]
        shadow-xl
        p-10
        border
        border-blush
      ">

        {/* HEADER */}

        <div className="text-center mb-10">

          <p className="
            uppercase
            tracking-[0.3em]
            text-xs
            text-rose
            mb-4
          ">
            Welcome Back
          </p>

          <h1 className="
            text-5xl
            font-extralight
            text-mocha
            mb-4
          ">
            bloom
          </h1>

          <p className="text-gray-500">
            Login to continue your floral journey
          </p>

        </div>

        {/* FORM */}

        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >

          {/* EMAIL */}

          <div>

            <label className="
              text-sm
              text-mocha
              mb-2
              block
            ">
              Email Address
            </label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              required
              className="
                w-full
                px-5
                py-4
                rounded-xl
                border
                border-blush
                bg-cream
                text-mocha
                placeholder:text-gray-400
                focus:outline-none
                focus:ring-2
                focus:ring-rose
                transition
              "
            />

          </div>

          {/* PASSWORD */}

          <div>

            <label className="
              text-sm
              text-mocha
              mb-2
              block
            ">
              Password
            </label>

            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              required
              className="
                w-full
                px-5
                py-4
                rounded-xl
                border
                border-blush
                bg-cream
                text-mocha
                placeholder:text-gray-400
                focus:outline-none
                focus:ring-2
                focus:ring-rose
                transition
              "
            />

          </div>

          {/* FORGOT PASSWORD */}

          <div className="flex justify-end">

            <Link
              to="/forgot-password"
              className="
                text-sm
                text-mocha
                hover:text-rose
                transition
              "
            >
              Forgot Password?
            </Link>

          </div>

          {/* LOGIN BUTTON */}

          <button
            type="submit"
            disabled={loading}
            className="
              w-full
              py-4
              rounded-xl
              bg-gradient-to-r
              from-rose
              to-lavender
              text-white
              font-medium
              shadow-md
              hover:opacity-90
              active:scale-[0.98]
              transition-all
              duration-300
              disabled:opacity-50
              disabled:cursor-not-allowed
            "
          >
            {loading ? 'Signing In...' : 'Login'}
          </button>

        </form>

        {/* REGISTER */}

        <div className="
          mt-8
          text-center
          text-sm
          text-gray-500
        ">

          Don’t have an account?{' '}

          <Link
            to="/register"
            className="
              text-mocha
              hover:text-rose
              transition
            "
          >
            Join bloom
          </Link>

        </div>

      </div>

    </div>
  )
}