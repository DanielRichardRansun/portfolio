"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiMessageCircle, FiX, FiSend, FiArrowUpRight } from "react-icons/fi";
import { useLanguage } from "@/context/LanguageContext";
import "./AIChatbot.css";

import Image from "next/image";

interface Message {
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

function getTime() {
  return new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
}

// Simple markdown parser for AI responses
function parseMarkdown(text: string): string {
  let html = text
    // Bold: **text**
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    // Italic: *text*
    .replace(/\*(.+?)\*/g, "<em>$1</em>")
    // Bullet lists: lines starting with - or *
    .replace(/^[\-\*]\s+(.+)$/gm, "<li>$1</li>")
    // Wrap consecutive <li> in <ul>
    .replace(/((?:<li>.*<\/li>\n)+)/g, "<ul>$1</ul>")
    // Line breaks (but not inside or immediately after tags that already handle breaks)
    .replace(/\n/g, "<br />");

  // Final cleanup: remove <br /> that are inside <ul> or after </ul>
  return html
    .replace(/<ul><br \/>/g, "<ul>")
    .replace(/<\/li><br \/>/g, "<\/li>")
    .replace(/<\/ul><br \/>/g, "<\/ul>");
}

export default function AIChatbot() {
  const { t, language } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [hasGreeted, setHasGreeted] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const chatbot = t.chatbot;

  // Add greeting when chat is first opened
  useEffect(() => {
    if (isOpen && !hasGreeted) {
      setMessages([
        {
          role: "assistant",
          content: chatbot.greeting,
          timestamp: getTime(),
        },
      ]);
      setHasGreeted(true);
    }
  }, [isOpen, hasGreeted, chatbot.greeting]);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  // Focus input when panel opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  const sendMessage = async () => {
    const text = input.trim();
    if (!text || isLoading) return;

    const userMsg: Message = {
      role: "user",
      content: text,
      timestamp: getTime(),
    };

    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setInput("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: updatedMessages.map((m) => ({
            role: m.role,
            content: m.content,
          })),
          language,
        }),
      });

      const data = await res.json();

      if (data.error) {
        throw new Error(data.error);
      }

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: data.reply,
          timestamp: getTime(),
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: chatbot.error,
          timestamp: getTime(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <motion.button
        className="chatbot-toggle"
        onClick={() => setIsOpen(!isOpen)}
        whileTap={{ scale: 0.9 }}
        aria-label={chatbot.tooltip}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.span
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <FiX size={24} />
            </motion.span>
          ) : (
            <motion.span
              key="chat"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <FiMessageCircle size={24} />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="chatbot-panel"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            {/* Header */}
            <div className="chatbot-header">
              <div className="chatbot-header-info">
                <div className="chatbot-avatar">
                  <Image
                    src="/ai-bot.png"
                    alt="AI Bot"
                    width={44}
                    height={44}
                    className="object-cover"
                  />
                </div>
                <div className="chatbot-header-text">
                  <h3>{chatbot.title}</h3>
                  <span>
                    <span className="online-dot" />
                    Online
                  </span>
                </div>
              </div>
              <button
                className="chatbot-close"
                onClick={() => setIsOpen(false)}
                aria-label="Close chat"
              >
                <FiX size={16} />
              </button>
            </div>

            {/* Messages */}
            <div className="chatbot-messages">
              {messages.map((msg, i) => (
                <div key={i} className={`chatbot-message ${msg.role}`}>
                  {msg.role === "assistant" ? (
                    <div
                      className="bubble"
                      dangerouslySetInnerHTML={{
                        __html: parseMarkdown(msg.content),
                      }}
                    />
                  ) : (
                    <div className="bubble">{msg.content}</div>
                  )}
                  <span className="timestamp">{msg.timestamp}</span>
                </div>
              ))}

              {isLoading && (
                <div className="chatbot-message assistant">
                  <div className="typing-indicator">
                    <span />
                    <span />
                    <span />
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Suggested Questions Moved Here */}
            {messages.length === 1 && !isLoading && chatbot.suggestions && (
              <div className="chatbot-suggestions-container">
                {chatbot.suggestions.map((suggestion: string, i: number) => (
                  <button
                    key={i}
                    className="suggestion-item"
                    onClick={() => {
                      setInput(suggestion);
                      const sendSuggestion = async () => {
                        if (isLoading) return;
                        const userMsg: Message = {
                          role: "user",
                          content: suggestion,
                          timestamp: getTime(),
                        };
                        const updatedMessages = [...messages, userMsg];
                        setMessages(updatedMessages);
                        setInput("");
                        setIsLoading(true);

                        try {
                          const res = await fetch("/api/chat", {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({
                              messages: updatedMessages.map((m) => ({
                                role: m.role,
                                content: m.content,
                              })),
                              language,
                            }),
                          });
                          const data = await res.json();
                          if (data.error) throw new Error(data.error);
                          setMessages((prev) => [
                            ...prev,
                            {
                              role: "assistant",
                              content: data.reply,
                              timestamp: getTime(),
                            },
                          ]);
                        } catch {
                          setMessages((prev) => [
                            ...prev,
                            {
                              role: "assistant",
                              content: chatbot.error,
                              timestamp: getTime(),
                            },
                          ]);
                        } finally {
                          setIsLoading(false);
                        }
                      };
                      sendSuggestion();
                    }}
                  >
                    <span>{suggestion}</span>
                    <FiArrowUpRight size={16} className="suggestion-icon" />
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <div className="chatbot-input-area">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={chatbot.placeholder}
                disabled={isLoading}
              />
              <button
                className="chatbot-send"
                onClick={sendMessage}
                disabled={!input.trim() || isLoading}
                aria-label="Send message"
              >
                <FiSend size={18} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
