import { useState, useRef } from 'react'
import { sendChatMessage } from '../services/api'
import Lottie from 'lottie-react'
import chatBot from '../assets/images/chatBot.json'

function Chatbot() {

  const [messages, setMessages] = useState([
    {
      id: 1,
      text:
        "Hello beautiful 🌸 I'm bloom AI Stylist. Tell me your vibe, favorite flowers, occasion, aesthetic, or color palette and I’ll recommend the perfect bouquet.",
      sender: 'bot'
    }
  ])

  const [inputMessage, setInputMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const recognitionRef = useRef(null)

  const [isListening, setIsListening] = useState(false)
  const [voiceError, setVoiceError] = useState('')

  // -----------------------------------
  // VOICE RECOGNITION
  // -----------------------------------

  const startListening = () => {

    setVoiceError('')

    const SpeechRecognition =
      window.SpeechRecognition ||
      window.webkitSpeechRecognition

    if (!SpeechRecognition) {

      setVoiceError('Voice recognition not supported.')
      return

    }

    recognitionRef.current = new SpeechRecognition()

    recognitionRef.current.continuous = false
    recognitionRef.current.interimResults = false
    recognitionRef.current.lang = 'en-US'

    recognitionRef.current.onresult = async (event) => {

      const text = event.results[0][0].transcript

      setInputMessage(text)
      setIsListening(false)

      // USER MESSAGE

      const userMsg = {
        id: Date.now(),
        text: text,
        sender: 'user'
      }

      setMessages(prev => [...prev, userMsg])

      setIsLoading(true)

      try {

        const res = await sendChatMessage(text)

        const botReply =
          res?.data?.reply ||
          res?.data?.response ||
          "🌸 Sorry, I couldn't understand that."

        setMessages(prev => [
          ...prev,
          {
            id: Date.now() + 1,
            text: botReply,
            sender: 'bot'
          }
        ])

      } catch (err) {

        console.error(err)

        setMessages(prev => [
          ...prev,
          {
            id: Date.now() + 1,
            text: '🌸 Voice request failed.',
            sender: 'bot'
          }
        ])

      }

      setIsLoading(false)

    }

    recognitionRef.current.onerror = () => {

      setVoiceError('Voice recognition error.')
      setIsListening(false)

    }

    recognitionRef.current.onend = () => {

      setIsListening(false)

    }

    recognitionRef.current.start()

    setIsListening(true)

  }

  const stopListening = () => {

    if (recognitionRef.current) {
      recognitionRef.current.stop()
    }

    setIsListening(false)

  }

  // -----------------------------------
  // SEND MESSAGE
  // -----------------------------------

  const sendMessage = async () => {

    if (!inputMessage.trim()) return

    const userMsg = {
      id: Date.now(),
      text: inputMessage,
      sender: 'user'
    }

    setMessages(prev => [...prev, userMsg])

    const current = inputMessage

    setInputMessage('')
    setIsLoading(true)

    try {

      const res = await sendChatMessage(current)

      const botReply =
        res?.data?.reply ||
        res?.data?.response ||
        "I'm here 🌸 but I couldn't understand that."

      setMessages(prev => [
        ...prev,
        {
          id: Date.now() + 1,
          text: botReply,
          sender: 'bot'
        }
      ])

    } catch (err) {

      console.error(err)

      setMessages(prev => [
        ...prev,
        {
          id: Date.now() + 1,
          text:
            '🌸 Backend not connected or API error. Check Django API.',
          sender: 'bot'
        }
      ])

    }

    setIsLoading(false)

  }

  // -----------------------------------
  // UI
  // -----------------------------------

  return (

    <div className="max-w-4xl mx-auto px-4 py-10">

      {/* BOT ANIMATION */}

      <div className="flex justify-center mb-6">

        <div className="w-64">
          <Lottie
            animationData={chatBot}
            loop={true}
          />
        </div>

      </div>

      {/* HEADER */}

      <div className="
        bg-gradient-to-r
        from-rose
        via-lavender
        to-[#b8a2cc]
        p-6
        rounded-[2rem]
        shadow-lg
        border
        border-blush
      ">

        <h2 className="
          text-3xl
          font-light
          text-white
        ">
          🌸 bloom AI Stylist
        </h2>

        <p className="
          text-white/90
          mt-2
          text-sm
          tracking-wide
        ">
          Personalized bouquet recommendations
        </p>

      </div>

      {/* CHAT CONTAINER */}

      <div className="
        h-[500px]
        overflow-y-auto
        p-6
        bg-cream
        mt-5
        rounded-[2rem]
        border
        border-blush
        shadow-sm
      ">

        {messages.map(msg => (

          <div
            key={msg.id}
            className={`
              mb-4
              flex
              ${msg.sender === 'user'
                ? 'justify-end'
                : 'justify-start'
              }
            `}
          >

            <div
              className={`
                px-5
                py-3
                rounded-3xl
                max-w-[75%]
                text-sm
                leading-relaxed
                shadow-sm
                ${msg.sender === 'user'
                  ? 'bg-rose text-white'
                  : 'bg-white border border-blush text-mocha'
                }
              `}
            >
              {msg.text}
            </div>

          </div>

        ))}

        {isLoading && (

          <p className="
            text-mocha
            text-sm
            italic
          ">
            Thinking 🌸...
          </p>

        )}

      </div>

      {/* INPUT AREA */}

      <div className="flex gap-3 mt-5">

        {/* INPUT */}

        <input
          value={inputMessage}
          onChange={(e) =>
            setInputMessage(e.target.value)
          }
          onKeyDown={(e) =>
            e.key === 'Enter' && sendMessage()
          }
          placeholder="Describe your dream bouquet..."
          className="
            flex-1
            px-5
            py-4
            rounded-full
            border
            border-blush
            bg-white
            text-mocha
            placeholder:text-gray-400
            focus:outline-none
            focus:ring-2
            focus:ring-rose
            transition
          "
        />

        {/* SEND BUTTON */}

        <button
          onClick={sendMessage}
          className="
            bg-rose
            text-white
            px-6
            rounded-full
            shadow-md
            hover:opacity-90
            active:scale-95
            transition-all
          "
        >
          Send
        </button>

        {/* MIC BUTTON */}

        <button
          onClick={
            isListening
              ? stopListening
              : startListening
          }
          className="
            bg-lavender
            text-white
            px-5
            rounded-full
            shadow-md
            hover:opacity-90
            active:scale-95
            transition-all
          "
        >
          {isListening ? '🛑' : '🎤'}
        </button>

      </div>

      {/* VOICE ERROR */}

      {voiceError && (

        <p className="
          text-red-400
          text-sm
          mt-3
        ">
          {voiceError}
        </p>

      )}

    </div>

  )
}

export default Chatbot