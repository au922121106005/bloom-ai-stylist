import Chatbot from '../components/Chatbot'

function ChatPage() {
  return (

    <div className="min-h-screen bg-[#faf7f5] py-20 px-6">

      {/* HERO */}

      <div className="text-center mb-14">

        <p className="uppercase tracking-[0.3em] text-xs text-rose-400 mb-4">
          Personalized Floral Styling
        </p>

        <h1 className="text-5xl md:text-6xl font-extralight text-gray-900 mb-6">
          AI Stylist
        </h1>

        <p className="max-w-2xl mx-auto text-gray-500 leading-relaxed text-lg">
          Discover bouquets tailored to your mood, aesthetic,
          celebration, and personality.
        </p>

      </div>

      {/* CHATBOT */}

      <Chatbot />

    </div>

  )
}

export default ChatPage