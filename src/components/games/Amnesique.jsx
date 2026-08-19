import React, { useState, useRef, useEffect } from 'react';
import { Send, RefreshCw, AlertCircle } from 'lucide-react';

export default function Amnesique() {
  const [messages, setMessages] = useState([
    { role: 'model', content: "Bonjour ! Je me souviens d'avoir passé de superbes vacances cet été, mais... j'ai oublié un objet très important et un événement ! Posez-moi des questions pour m'aider à retrouver la mémoire." }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const messagesEndRef = useRef(null);
  
  // Exclude the initial greeting from the turn count to be fair to the student
  const turnCount = messages.filter(m => m.role === 'user').length;
  const maxTurns = 10;
  const isGameOver = turnCount >= maxTurns;

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading || isGameOver) return;

    const userMessage = input.trim();
    setInput('');
    setError(null);
    
    // Optimistic UI update
    const newMessages = [...messages, { role: 'user', content: userMessage }];
    setMessages(newMessages);
    setIsLoading(true);

    try {
      // The API endpoint is a Vercel Serverless Function
      const response = await fetch('/api/amnesique', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          history: messages, // Send past context
          message: userMessage,
          turnCount: turnCount + 1,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Une erreur s'est produite");
      }

      setMessages([...newMessages, { role: 'model', content: data.text }]);
    } catch (err) {
      console.error(err);
      setError(err.message);
      // Remove the user message if API failed, so they can try again
      setMessages(messages);
      setInput(userMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setMessages([
      { role: 'model', content: "Bonjour ! Je me souviens d'avoir passé de superbes vacances cet été, mais... j'ai oublié un objet très important et un événement ! Posez-moi des questions pour m'aider à retrouver la mémoire." }
    ]);
    setInput('');
    setError(null);
  };

  // Helper function to render bold markdown from the API
  const renderFormattedText = (text) => {
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={i} className="text-blue-700">{part.slice(2, -2)}</strong>;
      }
      return part;
    });
  };

  return (
    <div className="flex flex-col h-[calc(100vh-100px)] max-w-3xl mx-auto bg-gray-50 rounded-xl shadow-lg overflow-hidden border border-gray-200">
      {/* Header */}
      <div className="bg-blue-600 text-white p-4 flex justify-between items-center shadow-md z-10">
        <div>
          <h2 className="text-xl font-bold flex items-center gap-2">
            L'Amnésique en Ligne 🕵️
          </h2>
          <p className="text-blue-100 text-sm">Posez des questions pour l'aider !</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="bg-blue-700 px-3 py-1 rounded-full text-sm font-semibold border border-blue-500">
            🎯 Questions restantes : {maxTurns - turnCount}/{maxTurns}
          </div>
          <button 
            onClick={handleReset}
            className="p-2 bg-blue-700 hover:bg-blue-800 rounded-full transition-colors"
            title="Recommencer"
          >
            <RefreshCw size={20} />
          </button>
        </div>
      </div>

      {/* Error Banner */}
      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 m-4 rounded shadow-sm flex items-center gap-2">
          <AlertCircle size={20} />
          <p>{error}</p>
        </div>
      )}

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, index) => (
          <div 
            key={index} 
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div 
              className={`max-w-[80%] p-4 rounded-2xl shadow-sm ${
                msg.role === 'user' 
                  ? 'bg-blue-500 text-white rounded-br-none' 
                  : 'bg-white text-gray-800 rounded-bl-none border border-gray-100'
              }`}
            >
              <div className="whitespace-pre-wrap leading-relaxed">
                {msg.role === 'model' ? renderFormattedText(msg.content) : msg.content}
              </div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white p-4 rounded-2xl rounded-bl-none border border-gray-100 shadow-sm flex gap-2">
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white border-t border-gray-200">
        <form onSubmit={handleSubmit} className="flex gap-2 relative">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isLoading || isGameOver}
            placeholder={isGameOver ? "Le jeu est terminé. Cliquez sur Recommencer." : "Écrivez votre question en français..."}
            className="flex-1 p-3 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed transition-all shadow-inner"
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading || isGameOver}
            className="absolute right-2 top-2 p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
          >
            <Send size={18} />
          </button>
        </form>
      </div>
    </div>
  );
}
