import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, X, Send, Minus, Maximize2, Sparkles, User } from 'lucide-react';

import { chatWithGemini } from '@/lib/gemini';

interface Message {
    id: string;
    text: string;
    sender: 'bot' | 'user';
    timestamp: Date;
}

export function FloatingChatBot() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        {
            id: '1',
            text: "Hello! I'm your AI Concierge. How can I help you with your influencer campaigns today?",
            sender: 'bot',
            timestamp: new Date()
        }
    ]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping]);

    const handleSend = (overrideInput?: string) => {
        const textToSend = overrideInput || input;
        if (!textToSend.trim()) return;

        const userMsg: Message = {
            id: Date.now().toString(),
            text: textToSend,
            sender: 'user',
            timestamp: new Date()
        };

        setMessages(prev => [...prev, userMsg]);
        setInput('');
        setIsTyping(true);

        // Simulate AI Response with conversational logic
        setTimeout(async () => {
            let responseText = "";
            const lowerInput = textToSend.toLowerCase().trim();

            if (lowerInput === 'hi' || lowerInput === 'hello' || lowerInput === 'hey' || lowerInput.startsWith('hi ')) {
                responseText = "Hello there! I'm your AI assistant. I'm ready to help you discover creators, analyze metrics, or plan your next move. What can I do for you?";
            } else if (lowerInput.includes('how are you')) {
                responseText = "I'm doing great! My neural networks are firing at full speed. How are you and your campaigns doing?";
            } else if (lowerInput.includes('start a campaign') || lowerInput.includes('how do i')) {
                responseText = "To start a campaign, navigate to the 'AI Matching' page, describe your goals, and I'll shortlist the best creators. From there, you can send direct outreach requests.";
            } else if (lowerInput.includes('vizag') || lowerInput.includes('location')) {
                responseText = "Vizag is a rising hub! I've indexed 120+ authentic creators there. You can filter by 'City: Vizag' in the Influencers directory to see the full list.";
            } else if (lowerInput.includes('pricing') || lowerInput.includes('cost')) {
                responseText = "Pricing varies by creator reach and niche. Typically, Nano-influencers starts from ₹2k, while Premium creators range from ₹50k-₹5L. I can help you negotiate with specific profiles.";
            } else if (lowerInput.includes('find') || lowerInput.includes('match') || lowerInput.includes('influencer')) {
                responseText = "I've scanned our top profiles for you. I highly recommend creators like Pavan Hari for fitness or Namratha Nitish for fashion. You can find more detail on the 'AI Matching' page.";
            } else if (lowerInput.includes('transparency') || lowerInput.includes('verified') || lowerInput.includes('news')) {
                responseText = "Transparency is our priority. All our influencer data is verified through 12-point neural audits. Check out our latest reports: [Transparency Hub](https://google.com/search?q=influencer+engagement+transparency+news+2026).";
            } else {
                // Gemini API Fallback
                const geminiResponse = await chatWithGemini(textToSend);

                if (geminiResponse) {
                    responseText = geminiResponse;
                } else {
                    const responses = [
                        "I've updated your dashboard with the latest performance metrics for your active campaigns. Everything is on track.",
                        "Your current conversion rate is trending 12% above last month's average. Would you like to see the attribution data?",
                        "I can provide deep-dive analytics for any creator. Just type their name followed by '/audit'.",
                        "Based on your recent search history, I recommend exploring creators in your specific niche for better ROI."
                    ];
                    responseText = responses[Math.floor(Math.random() * responses.length)];
                }
            }

            const botMsg: Message = {
                id: (Date.now() + 1).toString(),
                text: responseText,
                sender: 'bot',
                timestamp: new Date()
            };
            setMessages(prev => [...prev, botMsg]);
            setIsTyping(false);
        }, 1500);
    };

    return (
        <>
            {/* Floating Button */}
            <motion.button
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsOpen(true)}
                className={`fixed bottom-8 right-8 w-16 h-16 rounded-2xl gradient-bg text-white shadow-2xl z-50 flex items-center justify-center transition-all ${isOpen ? 'scale-0' : 'scale-100'}`}
            >
                <Bot className="w-8 h-8" />
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full ring-2 ring-background animate-pulse" />
            </motion.button>

            {/* Chat Window */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 100, scale: 0.8, x: 50 }}
                        animate={{ opacity: 1, y: 0, scale: 1, x: 0 }}
                        exit={{ opacity: 0, y: 100, scale: 0.8, x: 50 }}
                        className="fixed bottom-8 right-8 w-[400px] h-[600px] bg-card border border-border/50 rounded-[2rem] shadow-2xl z-50 overflow-hidden flex flex-col"
                    >
                        {/* Header */}
                        <div className="p-6 gradient-bg flex items-center justify-between text-white relative">
                            <div className="absolute top-0 right-0 p-4 opacity-10">
                                <Sparkles className="w-16 h-16" />
                            </div>
                            <div className="flex items-center gap-4 relative z-10">
                                <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30">
                                    <Bot className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="font-display font-bold text-lg leading-none">Neural Assistant</h3>
                                    <div className="flex items-center gap-1.5 mt-1">
                                        <div className={`w-1.5 h-1.5 rounded-full ${import.meta.env.VITE_GEMINI_API_KEY ? 'bg-green-400' : 'bg-red-400'} animate-pulse`} />
                                        <span className="text-[10px] font-bold uppercase tracking-widest text-white/80">Neural: {import.meta.env.VITE_GEMINI_API_KEY ? 'Online' : 'Offline'}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 relative z-10">
                                <button className="p-2 hover:bg-white/10 rounded-lg transition-colors"><Minus className="w-4 h-4" /></button>
                                <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-white/10 rounded-lg transition-colors"><X className="w-4 h-4" /></button>
                            </div>
                        </div>

                        {/* Messages Area */}
                        <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar bg-muted/5">
                            {messages.map((msg) => (
                                <motion.div
                                    key={msg.id}
                                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    className={`flex items-start gap-3 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}
                                >
                                    <div className={`w-8 h-8 rounded-lg shrink-0 flex items-center justify-center ${msg.sender === 'bot' ? 'bg-primary/10 text-primary' : 'bg-secondary/10 text-secondary'}`}>
                                        {msg.sender === 'bot' ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
                                    </div>
                                    <div className={`max-w-[80%] p-4 rounded-2xl text-sm font-medium leading-relaxed ${msg.sender === 'bot' ? 'bg-white dark:bg-card border border-border shadow-sm' : 'gradient-bg text-white'}`}>
                                        {msg.text}
                                    </div>
                                </motion.div>
                            ))}
                            {isTyping && (
                                <div className="flex items-start gap-3 animate-pulse">
                                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center"><Bot className="w-4 h-4 text-primary" /></div>
                                    <div className="p-4 bg-white dark:bg-card border border-border rounded-2xl flex gap-1">
                                        <div className="w-1.5 h-1.5 bg-primary/40 rounded-full animate-bounce" />
                                        <div className="w-1.5 h-1.5 bg-primary/40 rounded-full animate-bounce [animation-delay:0.2s]" />
                                        <div className="w-1.5 h-1.5 bg-primary/40 rounded-full animate-bounce [animation-delay:0.4s]" />
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input Area */}
                        <div className="p-6 bg-background border-t border-border">
                            <div className="flex gap-2 flex-wrap mb-4 px-2">
                                {["How to start?", "Vizag creators?", "Pricing?"].map(s => (
                                    <button
                                        key={s}
                                        onClick={() => handleSend(s)}
                                        className="px-3 py-1.5 rounded-lg bg-muted/50 border border-border/50 hover:border-primary/30 text-[10px] font-bold transition-all text-muted-foreground hover:text-primary"
                                    >
                                        {s}
                                    </button>
                                ))}
                            </div>
                            <div className="flex gap-2 p-2 bg-muted/30 rounded-2xl border border-border/50 focus-within:border-primary/30 focus-within:ring-4 focus-within:ring-primary/5 transition-all">
                                <input
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                                    placeholder="Ask anything..."
                                    className="flex-1 bg-transparent border-none outline-none px-2 text-sm font-medium"
                                />
                                <button
                                    onClick={() => handleSend()}
                                    disabled={!input.trim()}
                                    className="w-10 h-10 rounded-xl gradient-bg text-white flex items-center justify-center shadow-lg hover:scale-105 active:scale-95 transition-all disabled:opacity-50 disabled:scale-100"
                                >
                                    <Send className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
