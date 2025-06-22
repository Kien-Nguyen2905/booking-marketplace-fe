'use client';
import { Send, Loader2, MessageSquare, ChevronDown } from 'lucide-react';
import { useChatBot } from '@/layouts/Chatbot/useChatBot';

const Chatbot = () => {
  const {
    messages,
    input,
    isLoading,
    isChatOpen,
    messagesEndRef,
    handleSendMessage,
    handleKeyDown,
    clearChatHistory,
    formatTime,
    setIsChatOpen,
    setInput,
    inputRef,
  } = useChatBot();

  if (!isChatOpen) {
    return (
      <button
        onClick={() => setIsChatOpen(true)}
        className="fixed bottom-5 right-5 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-all flex items-center justify-center"
      >
        <MessageSquare size={24} />
      </button>
    );
  }

  return (
    <div className="fixed bottom-5 z-50 right-5 w-80 h-[450px] bg-white rounded-lg shadow-lg flex flex-col overflow-hidden border border-gray-200">
      {/* Header */}
      <div className="bg-blue-600 text-white p-3 flex items-center justify-between">
        <h3 className="font-medium flex items-center">
          <MessageSquare className="mr-2" size={18} /> Policy Assistant
        </h3>
        <div className="flex items-center space-x-2">
          <button
            onClick={clearChatHistory}
            className="text-white hover:text-red-200 text-xs underline"
          >
            Clear Chat
          </button>
          <button
            onClick={() => setIsChatOpen(false)}
            className="rounded-full hover:bg-blue-700 p-1"
          >
            <ChevronDown size={18} />
          </button>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
        {messages.length === 0 ? (
          <div className="text-center text-gray-500 my-4">
            <p>Chào mừng bạn đến với Booking Assistant!</p>
            <p className="text-sm mt-1">
              Bạn có thể hỏi về các chính sách dịch vụ của chúng tôi.
            </p>
          </div>
        ) : (
          messages.map((msg, index) => (
            <div
              key={index}
              className={`flex flex-col ${
                msg.sender === 'user' ? 'items-end' : 'items-start'
              }`}
            >
              <div
                className={`max-w-[85%] p-3 rounded-2xl ${
                  msg.sender === 'user'
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-800 border border-gray-200'
                }`}
              >
                {msg.text}
              </div>
              <span className="text-xs text-gray-500 mt-1 mx-1">
                {formatTime(msg.timestamp)}
              </span>
            </div>
          ))
        )}
        {isLoading && (
          <div className="flex items-start">
            <div className="bg-white text-gray-800 border border-gray-200 p-3 rounded-2xl flex items-center">
              <Loader2 className="animate-spin h-4 w-4 mr-2" />
              <span>Đang trả lời...</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="bg-white border-t border-gray-200 p-3">
        <div className="flex items-center bg-gray-50 rounded-lg border border-gray-300">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isLoading}
            placeholder="Nhập câu hỏi của bạn..."
            className="flex-1 p-3 bg-transparent focus:outline-none text-gray-700"
          />
          <button
            onClick={handleSendMessage}
            disabled={!input.trim() || isLoading}
            className={`p-2 rounded-full mr-2 ${
              !input.trim() || isLoading
                ? 'text-gray-400'
                : 'text-blue-600 hover:bg-blue-50'
            }`}
          >
            {isLoading ? (
              <Loader2 className="animate-spin h-5 w-5" />
            ) : (
              <Send size={20} />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
export default Chatbot;
