// filepath: frontend/src/components/VoiceOrder.jsx
import { useState, useRef, useEffect } from 'react';
import API from '../services/api';

function VoiceOrder() {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [orderResult, setOrderResult] = useState(null);
  const [error, setError] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  
  const recognitionRef = useRef(null);

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    
    if (!SpeechRecognition) {
      setError('Your browser does not support voice recognition. Please use Chrome or Edge.');
      return;
    }

    recognitionRef.current = new SpeechRecognition();
    recognitionRef.current.continuous = false;
    recognitionRef.current.interimResults = true;
    recognitionRef.current.lang = 'en-US';

    recognitionRef.current.onresult = (event) => {
      const current = event.resultIndex;
      const transcriptText = event.results[current][0].transcript;
      setTranscript(transcriptText);
    };

    recognitionRef.current.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
      setIsListening(false);
      if (event.error === 'not-allowed') {
        setError('Microphone access denied. Please allow microphone access.');
      } else {
        setError('Voice recognition error. Please try again.');
      }
    };

    recognitionRef.current.onend = () => {
      setIsListening(false);
      if (transcript) {
        submitOrder(transcript);
      }
    };

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, [transcript]);

  const startListening = () => {
    setError('');
    setOrderResult(null);
    setTranscript('');
    
    if (recognitionRef.current) {
      try {
        recognitionRef.current.start();
        setIsListening(true);
      } catch (err) {
        console.error('Error starting recognition:', err);
      }
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };

  const submitOrder = async (text) => {
    setIsProcessing(true);
    try {
      const response = await API.post('/order/voice/', {

        // ✅ FIX: changed key
        text: text

      });

      console.log(response.data); // ✅ FIX: debug

      setOrderResult(response.data);

    } catch (err) {
      console.error('Error submitting order:', err);

      let errorText = 'Failed to process order. Please try again.';

      // ✅ FIX: safer error handling
      if (err.response?.data?.error) {
        errorText = err.response.data.error;
      }

      setError(errorText);
    } finally {
      setIsProcessing(false);
    }
  };

  const resetOrder = () => {
    setTranscript('');
    setOrderResult(null);
    setError('');
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">

        {/* Header */}
        <div className="bg-purple-600 text-white p-4 flex items-center gap-3">
          <span className="text-2xl">🎤</span>
          <h2 className="text-xl font-bold">Voice Order</h2>
        </div>

        <div className="p-6">

          {/* Error */}
          {error && (
            <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
              {error}
            </div>
          )}

          {/* Voice Button */}
          <div className="text-center mb-6">
            <button
              onClick={isListening ? stopListening : startListening}
              disabled={isProcessing}
              className={`w-32 h-32 rounded-full flex items-center justify-center text-4xl ${
                isListening ? 'bg-red-500 animate-pulse' : 'bg-purple-600'
              }`}
            >
              {isListening ? '🛑' : '🎤'}
            </button>

            <p className="mt-4">
              {isListening ? 'Listening...' : 'Click to speak'}
            </p>
          </div>

          {/* Transcript */}
          {transcript && (
            <p className="mb-4">📝 {transcript}</p>
          )}

          {/* Loading */}
          {isProcessing && <p>Processing...</p>}

          {/* Result */}
          {orderResult && (
            <div className="p-4 bg-green-100 rounded">

              {/* ✅ FIX: use status instead of success */}
              <h4>
                {orderResult.status === "success"
                  ? '✅ Order Received'
                  : '⚠️ Issue'}
              </h4>

              <p>{orderResult.message}</p>

              <button onClick={resetOrder}>New Order</button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

export default VoiceOrder;