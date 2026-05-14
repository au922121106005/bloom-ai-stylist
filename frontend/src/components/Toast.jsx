import { useEffect, useState } from 'react'

export default function Toast({ message, type = 'success', duration = 3000, onClose }) {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false)
      onClose && onClose()
    }, duration)

    return () => clearTimeout(timer)
  }, [duration, onClose])

  if (!isVisible) return null

  const bgColor = type === 'success' ? 'bg-green-500' : type === 'error' ? 'bg-red-500' : 'bg-blue-500'
  const icon = type === 'success' ? '✓' : type === 'error' ? '✕' : 'ℹ'

  return (
    <div className={`fixed top-8 left-1/2 transform -translate-x-1/2 ${bgColor} text-white px-6 py-4 rounded-lg shadow-lg flex items-center gap-3 animate-pulse z-[10000]`}>
      <span className="text-xl font-bold">{icon}</span>
      <span className="font-semibold">{message}</span>
    </div>
  )
}
