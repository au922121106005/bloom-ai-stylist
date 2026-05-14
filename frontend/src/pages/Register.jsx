import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { registerUser, loginUser } from '../services/api'

export default function Register({ setIsLoggedIn }) {

  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
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

    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match')
      return
    }

    setLoading(true)

    try {

      await registerUser({
        username: formData.username,
        email: formData.email,
        password: formData.password,
        password2: formData.confirmPassword
      })

      const loginResponse = await loginUser({
        email: formData.email,
        password: formData.password
      })

      localStorage.setItem(
        'token',
        loginResponse.data.access
      )

      setIsLoggedIn(true)

      navigate('/')

    } catch (error) {

      console.error(error)

      alert('Registration failed')

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
            Join bloom
          </p>

          <h1 className="
            text-5xl
            font-extralight
            text-mocha
            mb-4
          ">
            Create Account
          </h1>

          <p className="text-gray-500">
            Begin your floral experience with bloom
          </p>

        </div>

        {/* FORM */}

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          {/* USERNAME */}

          <div>

            <label className="
              block
              text-sm
              text-mocha
              mb-2
            ">
              Username
            </label>

            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Your username"
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

          {/* EMAIL */}

          <div>

            <label className="
              block
              text-sm
              text-mocha
              mb-2
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
              block
              text-sm
              text-mocha
              mb-2
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

          {/* CONFIRM PASSWORD */}

          <div>

            <label className="
              block
              text-sm
              text-mocha
              mb-2
            ">
              Confirm Password
            </label>

            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
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

          {/* BUTTON */}

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
              hover:scale-[1.01]
              transition-all
              duration-300
              disabled:opacity-50
              disabled:cursor-not-allowed
            "
          >
            {loading ? 'Creating Account...' : 'Join bloom'}
          </button>

        </form>

        {/* FOOTER */}

        <div className="
          mt-8
          text-center
          text-sm
          text-gray-500
        ">

          Already have an account?{' '}

          <Link
            to="/login"
            className="
              text-mocha
              hover:text-rose
              transition
            "
          >
            Login
          </Link>

        </div>

      </div>

    </div>
  )
}