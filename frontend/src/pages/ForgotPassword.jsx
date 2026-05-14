import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import Toast from '../components/Toast'
import { resetPassword } from '../services/api'

export default function ForgotPassword() {

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  })

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [error, setError] = useState('')
  const [toast, setToast] = useState(null)

  const navigate = useNavigate()

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })

  }

  const handleSubmit = async (e) => {

    e.preventDefault()

    setError('')

    if (
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      setError('Please complete all fields')
      return
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
      return
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters')
      return
    }

    try {

      const response = await resetPassword({
        email: formData.email,
        password: formData.password,
        password2: formData.confirmPassword
      })

      const successMsg =
        response?.data?.message ||
        response?.data?.detail ||
        'Password reset successful! Please login.'

      setToast({
        message: successMsg,
        type: 'success'
      })

      setTimeout(() => navigate('/login'), 2000)

    } catch (err) {

      console.error(err)

      const serverError = err?.response?.data

      const cleanError =
        serverError?.email?.[0] ||
        serverError?.password?.[0] ||
        serverError?.non_field_errors?.[0] ||
        serverError?.detail ||
        serverError?.error ||
        'Password reset failed. Please try again.'

      setError(cleanError)

    }
  }

  return (

    <div className="min-h-screen bg-cream flex items-center justify-center px-6 py-20">

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      <div className="
        w-full
        max-w-md
        bg-white
        rounded-[2rem]
        shadow-xl
        border
        border-blush
        p-10
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
            bloom Account Recovery
          </p>

          <h1 className="
            text-5xl
            font-extralight
            text-mocha
            mb-4
          ">
            Reset Password
          </h1>

          <p className="
            text-gray-500
            leading-relaxed
          ">
            Create a new password to continue your floral journey
          </p>

        </div>

        {/* ERROR */}

        {error && (

          <div className="
            bg-[#fff1f2]
            border
            border-blush
            text-mocha
            px-4
            py-3
            rounded-xl
            mb-6
            text-sm
          ">
            {error}
          </div>

        )}

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

          <div className="relative">

            <label className="
              text-sm
              text-mocha
              mb-2
              block
            ">
              New Password
            </label>

            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
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

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="
                absolute
                right-4
                top-[3.3rem]
                text-sm
                text-gray-400
                hover:text-rose
                transition
              "
            >
              {showPassword ? 'Hide' : 'Show'}
            </button>

          </div>

          {/* CONFIRM PASSWORD */}

          <div className="relative">

            <label className="
              text-sm
              text-mocha
              mb-2
              block
            ">
              Confirm Password
            </label>

            <input
              type={showConfirmPassword ? 'text' : 'password'}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="••••••••"
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

            <button
              type="button"
              onClick={() =>
                setShowConfirmPassword(!showConfirmPassword)
              }
              className="
                absolute
                right-4
                top-[3.3rem]
                text-sm
                text-gray-400
                hover:text-rose
                transition
              "
            >
              {showConfirmPassword ? 'Hide' : 'Show'}
            </button>

          </div>

          {/* BUTTON */}

          <button
            type="submit"
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
            "
          >
            Reset Password
          </button>

        </form>

        {/* LOGIN LINK */}

        <div className="
          mt-8
          text-center
          text-sm
          text-gray-500
        ">

          Remembered your password?{' '}

          <Link
            to="/login"
            className="
              text-mocha
              hover:text-rose
              transition
            "
          >
            Login here
          </Link>

        </div>

      </div>

    </div>
  )
}