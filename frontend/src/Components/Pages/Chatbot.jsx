import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const Chatbot = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: 'Hello! I am AI Librarybot, your personal library assistant. Ask me anything about books, authors, or just chat!',
      sender: 'ai',
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message to chat
    const userMessage = {
      id: messages.length + 1,
      text: input,
      sender: 'user',
    };
    setMessages([...messages, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // Send query to backend
      const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/chat`, {
        query: input,
      });

      // Add AI response to chat
      const aiMessage = {
        id: messages.length + 2,
        text: data.type === 'text' ? data.data : 'I found some books for you!',
        sender: 'ai',
        type: data.type,
        content: data.data,
      };
      setMessages([...messages, userMessage, aiMessage]);
    } catch (error) {
      toast.error('Failed to get response from AI');
      console.error(error);
      
      // Add error message
      const errorMessage = {
        id: messages.length + 2,
        text: 'I apologize, but I encountered an error. Please try again later.',
        sender: 'ai',
      };
      setMessages([...messages, userMessage, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-12 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
            <span className="text-lime-600">AI Librarybot</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Your intelligent library assistant, powered by Gemini AI. Ask me anything about books, authors, or just have a chat!
          </p>
        </div>

        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
          {/* Chat Header */}
          <div className="bg-gradient-to-r from-lime-600 to-lime-700 text-white p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-semibold">AI Librarybot</h3>
                  <p className="text-sm opacity-90">Online and ready to help</p>
                </div>
              </div>
            </div>
          </div>

          {/* Chat Messages */}
          <div className="h-[550px] overflow-y-auto p-6 space-y-6 bg-gray-50">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {message.sender === 'ai' && (
                  <div className="w-10 h-10 rounded-full bg-lime-600 flex-shrink-0 flex items-center justify-center text-white font-bold mr-3">
                    AI
                  </div>
                )}
                <div
                  className={`max-w-[80%] rounded-lg ${message.sender === 'user' 
                    ? 'bg-lime-600 text-white rounded-br-none shadow-md' 
                    : 'bg-white text-gray-800 rounded-bl-none shadow-md border border-gray-100'}`}
                >
                  <div className="p-4">
                    {message.text}
                    
                    {/* Display books if response is book suggestions */}
                    {message.type === 'books' && message.content && (
                      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {message.content.slice(0, 4).map((book, index) => (
                          <div key={index} className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                            <div className="flex items-start gap-3">
                              <img 
                                src={book.image} 
                                alt={book.title} 
                                className="w-16 h-24 object-cover rounded-md flex-shrink-0"
                                onError={(e) => e.target.src = 'https://via.placeholder.com/80x120?text=Book'}
                              />
                              <div className="flex-grow">
                                <h4 className="font-semibold text-sm line-clamp-1">{book.title}</h4>
                                <p className="text-xs text-gray-600 mt-1">by {book.author}</p>
                                <div className="mt-2 flex items-center justify-between">
                                  <span className="text-xs px-2 py-1 bg-lime-100 text-lime-800 rounded-full">
                                    {book.category}
                                  </span>
                                  <span className={`text-xs px-2 py-1 rounded-full ${book.available ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                    {book.available ? 'Available' : 'Borrowed'}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                        {message.content.length > 4 && (
                          <div className="text-xs text-gray-500 mt-2 col-span-full text-center">
                            And {message.content.length - 4} more books...
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
                {message.sender === 'user' && (
                  <div className="w-10 h-10 rounded-full bg-gray-800 flex-shrink-0 flex items-center justify-center text-white font-bold ml-3">
                    U
                  </div>
                )}
              </div>
            ))}
            
            {/* Loading indicator */}
            {isLoading && (
              <div className="flex justify-start">
                <div className="w-10 h-10 rounded-full bg-lime-600 flex-shrink-0 flex items-center justify-center text-white font-bold mr-3">
                  AI
                </div>
                <div className="bg-white text-gray-800 p-4 rounded-lg rounded-bl-none shadow-md border border-gray-100 max-w-[80%]">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 bg-lime-600 rounded-full animate-pulse"></div>
                    <div className="w-2 h-2 bg-lime-600 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-2 h-2 bg-lime-600 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Input Form */}
          <form onSubmit={handleSubmit} className="p-6 border-t bg-white">
            <div className="flex gap-3">
              <input
                type="text"
                placeholder="Ask me anything... (e.g., 'Describe the story of Harry Potter', 'What are the best fantasy books?', 'Who is Stephen King?')"
                className="flex-grow px-5 py-4 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-lime-500 focus:border-transparent transition-all shadow-sm hover:shadow-md"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={isLoading}
              />
              <button
                type="submit"
                className="px-8 py-4 bg-lime-600 text-white font-medium rounded-full hover:bg-lime-700 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5 disabled:bg-gray-400 disabled:shadow-none disabled:transform-none"
                disabled={isLoading || !input.trim()}
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Sending...</span>
                  </div>
                ) : (
                  <span>Send</span>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;