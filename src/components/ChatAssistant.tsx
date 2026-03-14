import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, X, Send, Bot, User, Sparkles } from 'lucide-react';

const ChatAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'bot' | 'user'; text: string; time: string }[]>([
    { role: 'bot', text: "Welcome to Kgomo's. I am your personal concierge. How may I assist you with our wood-fired heritage cuisine today?", time: 'Just now' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = async (text: string = input) => {
    if (!text.trim()) return;
    
    const time = new Date().toLocaleTimeString('en-ZA', { hour: '2-digit', minute: '2-digit' });
    setMessages(prev => [...prev, { role: 'user', text, time }]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      let reply = "I'd be delighted to help. For immediate assistance, you may reach our General Manager, Modisa, at +27 84 292 0000. Alternatively, I can guide you through our artisanal menu or help you secure a table for your next visit.";
      
      const m = text.toLowerCase();
      if (m.includes('hour') || m.includes('open') || m.includes('time')) reply = "We welcome guests Monday through Thursday from 08:00 to 21:00, Friday and Saturday until 22:00, and Sundays from 09:00 to 20:00.";
      else if (m.includes('pizza')) reply = "Our wood-fired pizzas are the heart of our kitchen, ranging from R90 to R135. The 'Meat Festival' and 'Salmon Dance' are particularly favoured by our regulars.";
      else if (m.includes('burger')) reply = "Our signature burgers feature 200g hand-pressed patties. The Classic Smash Burger is a masterpiece of heritage flavours, served with our house-made relish.";
      else if (m.includes('diabetic') || m.includes('meal prep') || m.includes('diet')) reply = "Indeed, we offer a dietician-aligned, low-GI meal prep service specifically designed for blood-sugar control. You can explore our subscription plans in the 'Meal Prep' section.";
      else if (m.includes('reserv') || m.includes('book') || m.includes('table')) reply = "I can certainly assist with that. Please visit our 'Book a Table' page to select your preferred date and time, or I can connect you with our reservations team.";

      setMessages(prev => [...prev, { role: 'bot', text: reply, time: new Date().toLocaleTimeString('en-ZA', { hour: '2-digit', minute: '2-digit' }) }]);
      setIsTyping(false);
    }, 1200);
  };

  const quickAsks = [
    { label: 'Opening Hours', q: 'What are your opening hours?' },
    { label: 'Artisanal Pizzas', q: 'What pizzas do you have?' },
    { label: 'Health Meal Prep', q: 'Do you offer diabetic meal prep?' },
    { label: 'Table Booking', q: 'How do I make a reservation?' }
  ];

  return (
    <>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-8 right-8 w-16 h-16 bg-dark text-gold rounded-[1.5rem] flex items-center justify-center shadow-[0_20px_50px_rgba(0,0,0,0.3)] z-[1000] hover:scale-110 transition-all duration-500 group border border-gold/20"
      >
        <div className="absolute inset-0 bg-gold opacity-0 group-hover:opacity-10 rounded-[1.5rem] transition-opacity"></div>
        {isOpen ? <X size={24} /> : <MessageSquare size={24} className="group-hover:rotate-12 transition-transform" />}
        {!isOpen && (
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-gold rounded-full border-2 border-dark animate-ping"></span>
        )}
      </button>

      <div className={`fixed bottom-28 right-8 w-[400px] h-[600px] bg-cream rounded-[2.5rem] shadow-[0_30px_100px_rgba(0,0,0,0.4)] z-[1000] flex flex-col overflow-hidden transition-all duration-500 origin-bottom-right border border-gold/10 ${isOpen ? 'scale-100 opacity-100 translate-y-0' : 'scale-90 opacity-0 pointer-events-none translate-y-10'}`}>
        {/* Header */}
        <div className="bg-dark p-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gold opacity-[0.05] rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl"></div>
          <div className="flex items-center justify-between relative z-10">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gold/10 rounded-2xl flex items-center justify-center border border-gold/20">
                <Sparkles className="text-gold" size={24} />
              </div>
              <div>
                <div className="text-white text-sm font-bold font-serif italic">Kgomo's Concierge</div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-green rounded-full animate-pulse"></span>
                  <span className="text-gold text-[9px] font-black uppercase tracking-[0.2em]">Always at your service</span>
                </div>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="w-8 h-8 flex items-center justify-center text-white/30 hover:text-white transition-colors">
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6 no-scrollbar bg-gradient-to-b from-white to-cream/30">
          {messages.map((msg, i) => (
            <div key={i} className={`max-w-[85%] animate-fadeIn ${msg.role === 'user' ? 'self-end' : 'self-start'}`}>
              <div className={`p-4 rounded-[1.5rem] text-sm leading-relaxed shadow-sm ${
                msg.role === 'user' 
                  ? 'bg-dark text-white rounded-br-none border border-white/10' 
                  : 'bg-white text-dark rounded-bl-none border border-gold/10 font-medium'
              }`}>
                {msg.text}
              </div>
              <div className={`text-[9px] font-black uppercase tracking-widest text-muted mt-2 px-2 ${msg.role === 'user' ? 'text-right' : 'text-left'}`}>
                {msg.time}
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="self-start bg-white border border-gold/10 p-4 rounded-[1.5rem] rounded-bl-none shadow-sm">
              <div className="flex gap-1.5">
                <div className="w-1.5 h-1.5 bg-gold/40 rounded-full animate-bounce"></div>
                <div className="w-1.5 h-1.5 bg-gold/40 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                <div className="w-1.5 h-1.5 bg-gold/40 rounded-full animate-bounce [animation-delay:0.4s]"></div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Asks */}
        <div className="px-6 py-4 bg-white border-t border-gold/5 flex flex-wrap gap-2">
          {quickAsks.map(ask => (
            <button 
              key={ask.label}
              onClick={() => handleSend(ask.q)}
              className="px-4 py-2 bg-cream/50 text-dark border border-gold/10 rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-gold hover:text-dark transition-all shadow-sm"
            >
              {ask.label}
            </button>
          ))}
        </div>

        {/* Input */}
        <div className="p-6 bg-white border-t border-gold/5 flex gap-3">
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="How may I assist you?"
            className="flex-1 bg-cream/30 border-0 rounded-2xl px-6 py-4 text-sm outline-none focus:ring-2 focus:ring-gold transition-all font-medium"
          />
          <button 
            onClick={() => handleSend()}
            className="w-14 h-14 bg-gold text-dark rounded-2xl flex items-center justify-center hover:bg-dark hover:text-white transition-all shadow-xl group"
          >
            <Send size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </button>
        </div>
      </div>
    </>
  );
};

export default ChatAssistant;
