import { TMessage } from '@/layouts/Chatbot/type';
import { handleErrorApi } from '@/lib/helper';
import {
  clearChatHistoryLocalStorage,
  getChatHistoryLocalStorage,
  setChatHistoryLocalStorage,
} from '@/lib/utils';
import axios from 'axios';
import { useEffect, useRef, useState } from 'react';

export const useChatBot = () => {
  const [messages, setMessages] = useState<TMessage[]>([]);
  const [input, setInput] = useState('');
  const [accessToken, setAccessToken] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Load messages from localStorage on component mount
  useEffect(() => {
    const savedMessages = getChatHistoryLocalStorage();
    if (savedMessages) {
      const parsedMessages = JSON.parse(savedMessages);
      setMessages(parsedMessages);
      clearChatHistoryLocalStorage();
    }
  }, []);

  // Save messages to localStorage whenever they change
  useEffect(() => {
    if (messages.length > 0) {
      setChatHistoryLocalStorage(JSON.stringify(messages));
    }
  }, [messages]);

  // Get access token on component mount
  useEffect(() => {
    const fetchAccessToken = async () => {
      try {
        const response = await axios.get('/api/get-token');
        setAccessToken(response.data.accessToken);
      } catch (error) {
        console.error('Error fetching access token:', error);
      }
    };
    fetchAccessToken();
  }, []);

  // Auto-scroll to the bottom when messages update
  useEffect(() => {
    if (messagesEndRef.current && isChatOpen) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isChatOpen]);

  const queryDialogFlow = async (text: string) => {
    if (!accessToken) return 'Not found access token';
    try {
      const response = await axios.post(
        'https://dialogflow.googleapis.com/v2/projects/booking-456007/agent/sessions/123456:detectIntent',
        {
          queryInput: {
            text: {
              text,
              languageCode: 'vi',
            },
          },
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        },
      );
      return response.data.queryResult.fulfillmentText;
    } catch (error) {
      handleErrorApi({ error });
    }
  };

  const handleSendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = {
      text: input,
      sender: 'user' as const,
      timestamp: Date.now(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    try {
      const botReply = await queryDialogFlow(input);
      const botMessage = {
        text: botReply,
        sender: 'bot' as const,
        timestamp: Date.now(),
      };
      setMessages((prev) => [...prev, botMessage]);
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    } catch {
      const errorMessage = {
        text: 'Đã có lỗi xảy ra, vui lòng thử lại!',
        sender: 'bot' as const,
        timestamp: Date.now(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const clearChatHistory = () => {
    setMessages([]);
    clearChatHistoryLocalStorage();
  };

  const formatTime = (timestamp: number) => {
    return new Date(timestamp).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return {
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
  };
};
