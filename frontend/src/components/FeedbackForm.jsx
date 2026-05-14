import { useState } from 'react'
import { createFeedback } from '../services/api'
import Toast from './Toast'
import emailjs from '@emailjs/browser'

export default function FeedbackForm({
  onFeedbackSubmitted,
  userName = '',
  userEmail = ''
}) {

  const [name, setName] = useState(userName)
  const [email, setEmail] = useState(userEmail)
  const [rating, setRating] = useState(5)
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [toast, setToast] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!name.trim() || !email.trim() || !message.trim()) {
      setToast({
        message: 'Please fill in all fields',
        type: 'error'
      })
      return
    }

    if (message.trim().length < 10) {
      setToast({
        message: 'Message must be at least 10 characters long',
        type: 'error'
      })
      return
    }

    setLoading(true)

    try {

      const response = await createFeedback({
        name: name.trim(),
        email: email.trim(),
        rating: parseInt(rating),
        message: message.trim()
      })

      await emailjs.send(
        'service_9h6kf89',
        'service_9h6kf89',
        {
          name,
          email,
          rating,
          message
        },
        '6arZ9c6sqxQZV9Rs5'
      )

      setToast({
        message: 'Thank you for your feedback!',
        type: 'success'
      })

      setName('')
      setEmail('')
      setRating(5)
      setMessage('')

      if (onFeedbackSubmitted) {
        onFeedbackSubmitted(response.data)
      }

    } catch (error) {

      console.error('Error submitting feedback:', error)

      setToast({
        message: 'Failed to submit feedback. Please try again.',
        type: 'error'
      })

    } finally {
      setLoading(false)
    }
  }

  return (

    <div className="bg-[#fdfaf7] border border-gray-200 rounded-[2rem] shadow-sm p-10 max-w-3xl mx-auto">

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      {/* HEADER */}

      <div className="text-center mb-12">

        <p className="uppercase tracking-[0.3em] text-xs text-gray-400 mb-3">
          bloom Experience
        </p>

        <h2 className="text-5xl font-extralight text-gray-900 mb-4">
          Share Your Experience
        </h2>

        <p className="text-gray-500 max-w-xl mx-auto leading-relaxed">
          We’d love to hear how bloom became part of your
          special moments and celebrations.
        </p>

      </div>

      {/* FORM */}

      <form
        onSubmit={handleSubmit}
        className="space-y-8"
      >

        {/* NAME + EMAIL */}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* NAME */}

          <div>

            <label
              htmlFor="name"
              className="block text-xs uppercase tracking-[0.2em] text-gray-600 mb-3"
            >
              Your Name
            </label>

            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              required
              className="
                w-full
                px-5
                py-3
                border
                border-gray-300
                rounded-full
                bg-white
                focus:outline-none
                focus:border-black
                transition
              "
            />

          </div>

          {/* EMAIL */}

          <div>

            <label
              htmlFor="email"
              className="block text-xs uppercase tracking-[0.2em] text-gray-600 mb-3"
            >
              Email Address
            </label>

            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
              className="
                w-full
                px-5
                py-3
                border
                border-gray-300
                rounded-full
                bg-white
                focus:outline-none
                focus:border-black
                transition
              "
            />

          </div>

        </div>

        {/* RATING */}

        <div>

          <label
            htmlFor="rating"
            className="block text-xs uppercase tracking-[0.2em] text-gray-600 mb-3"
          >
            Rating
          </label>

          <select
            id="rating"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            className="
              w-full
              px-5
              py-3
              border
              border-gray-300
              rounded-full
              bg-white
              focus:outline-none
              focus:border-black
              transition
            "
          >
            <option value="5">★★★★★ Excellent</option>
            <option value="4">★★★★ Very Good</option>
            <option value="3">★★★ Good</option>
            <option value="2">★★ Fair</option>
            <option value="1">★ Poor</option>
          </select>

        </div>

        {/* MESSAGE */}

        <div>

          <label
            htmlFor="message"
            className="block text-xs uppercase tracking-[0.2em] text-gray-600 mb-3"
          >
            Your Feedback
          </label>

          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Tell us about your bloom experience..."
            rows="6"
            required
            className="
              w-full
              px-5
              py-4
              border
              border-gray-300
              rounded-3xl
              bg-white
              focus:outline-none
              focus:border-black
              transition
              resize-none
            "
          />

          <p className="text-xs text-gray-400 mt-2">
            Characters: {message.length} / Minimum: 10
          </p>

        </div>

        {/* BUTTON */}

        <button
          type="submit"
          disabled={loading}
          className="
            w-full
            bg-black
            text-white
            py-4
            rounded-full
            uppercase
            tracking-[0.2em]
            text-sm
            hover:opacity-90
            transition
            disabled:opacity-50
          "
        >
          {loading ? 'Submitting...' : 'Submit Feedback'}
        </button>

      </form>

    </div>
  )
}