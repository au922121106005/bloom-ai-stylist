import { useState, useEffect } from 'react'
import { getFeedbacks } from '../services/api'
import FeedbackForm from '../components/FeedbackForm'

export default function Feedback() {
  const [feedbacks, setFeedbacks] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchFeedbacks()
  }, [])

  const fetchFeedbacks = async () => {
    try {
      const response = await getFeedbacks()
      setFeedbacks(response.data)
    } catch (error) {
      console.error('Error fetching feedbacks:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleFeedbackSubmitted = (newFeedback) => {
    setFeedbacks([newFeedback, ...feedbacks])
  }

  return (
    <div className="min-h-screen py-12 px-4 bg-gradient-to-b from-pink-50 to-purple-50">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-800 mb-4">💬 Customer Feedback</h1>
          <p className="text-xl text-gray-600">
            Help us improve by sharing your thoughts and experiences
          </p>
        </div>

        {/* Feedback Form */}
        <div className="mb-16">
          <FeedbackForm onFeedbackSubmitted={handleFeedbackSubmitted} />
        </div>

        {/* Feedbacks Display */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">Recent Feedback from Customers</h2>

          {loading ? (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">Loading feedback...</p>
            </div>
          ) : feedbacks.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">No feedback yet. Be the first to share!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {feedbacks.map((feedback) => (
                <div
                  key={feedback.id}
                  className={`rounded-lg p-6 ${
                    feedback.is_featured
                      ? 'bg-gradient-to-br from-yellow-100 to-orange-100 border-2 border-yellow-400 shadow-lg'
                      : 'bg-pink-100 border-2 border-rose-500 shadow-md hover:shadow-lg transition-shadow'
                  }`}
                >
                  {/* Featured Badge */}
                  {feedback.is_featured && (
                    <div className="mb-2">
                      <span className="inline-block bg-yellow-400 text-gray-800 font-bold px-3 py-1 rounded-full text-xs">
                        ⭐ Featured
                      </span>
                    </div>
                  )}

                  {/* Rating */}
                  <div className="mb-3">
                    <p className="text-2xl">{feedback.rating_display}</p>
                  </div>

                  {/* Message */}
                  <p className="text-gray-800 mb-4 italic line-clamp-4">"{feedback.message}"</p>

                  {/* Author */}
                  <div className="border-t border-gray-300 pt-4">
                    <p className="font-semibold text-gray-800">{feedback.name}</p>
                    <p className="text-sm text-gray-600">{feedback.email}</p>
                    <p className="text-xs text-gray-500 mt-2">
                      {new Date(feedback.created_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
