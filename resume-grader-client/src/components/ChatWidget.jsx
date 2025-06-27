import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { SendHorizonal, Copy } from "lucide-react";

const ChatWidget = ({ resumeText, jobDescText }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState(null);
  const bottomRef = useRef(null);

  
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const sendMessage = async () => {
  if (!input.trim()) return;

  const userMessage = { role: "user", content: input };
  const newMessages = [...messages, userMessage];
  setMessages(newMessages);
  setInput("");
  setLoading(true);

  try {
   const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/claude`, {
        messages: newMessages,
        resumeText,
        jobDescText,
      }
    );

    const aiResponse = response.data.reply;
    setMessages([...newMessages, aiResponse]);
  } catch (err) {
    console.error("❌ Chat Error:", err.message);
    setMessages([
      ...newMessages,
      { role: "assistant", content: "Something went wrong." },
    ]);
  } finally {
    setLoading(false);
  }
};


  const handleCopy = (text, index) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <section id="chat" >
      <h3 className="text-xl font-semibold text-white mb-6">💬 AI Resume Assistant</h3>

      <div className="flex flex-col gap-3 max-h-[420px] overflow-y-auto pr-1 custom-scroll">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`group relative max-w-[85%] px-4 py-3 text-sm rounded-2xl whitespace-pre-wrap transition-all duration-300
              ${
                msg.role === "user"
                  ? "self-end bg-gradient-to-br from-indigo-500/60 to-purple-600/60 rounded-br-none"
                  : "self-start bg-gradient-to-br from-slate-700/60 to-slate-800/60 rounded-bl-none"
              } text-white`}
          >
            <p>{msg.content}</p>
            <button
              onClick={() => handleCopy(msg.content, idx)}
              className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition text-xs text-gray-300 hover:text-white"
            >
              <Copy size={14} />
            </button>
            {copiedIndex === idx && (
              <span className="absolute bottom-1 right-2 text-[10px] text-emerald-400">Copied</span>
            )}
          </div>
        ))}

        
        <div ref={bottomRef} />
        {loading && <p className="text-zinc-300 text-sm italic">Thinking...</p>}
      </div>

      <div className="mt-6 flex items-center gap-3">
        <input
          type="text"
          className="flex-1 bg-zinc-800 text-white px-4 py-3 rounded-xl border border-zinc-700 focus:outline-none focus:border-indigo-500 transition-all duration-300"
          placeholder="Ask anything about your resume..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button
          onClick={sendMessage}
          className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:scale-105 transition-all duration-300 text-white px-4 py-3 rounded-xl flex items-center gap-2"
        >
          <SendHorizonal size={18} /> Send
        </button>
      </div>

      <style jsx>{`
        .custom-scroll::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scroll::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scroll::-webkit-scrollbar-thumb {
          background-color: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
        }
      `}</style>
    </section>
  );
};

export default ChatWidget;
