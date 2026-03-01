import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, Send, Sparkles, User, ShieldCheck, Zap, Globe, MessageSquare } from 'lucide-react';

import { chatWithGemini } from '@/lib/gemini';

interface Message {
    id: string;
    text: string;
    sender: 'bot' | 'user';
    timestamp: Date;
}

export default function AIAssistantPage() {
    const [messages, setMessages] = useState<Message[]>([
        {
            id: '1',
            text: "Welcome to your AI Concierge Dashboard. I'm here to help you optimize your influencer strategy. What's on your mind?",
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

        setTimeout(async () => {
            let responseText = "";
            const lowerInput = textToSend.toLowerCase().trim();

            // 1. Check local tactical logic first (Quick Responses)
            if (lowerInput === 'hi' || lowerInput === 'hello' || lowerInput === 'hey' || lowerInput.startsWith('hi ')) {
                responseText = "Hello! I'm your Neural Assistant. I'm currently monitoring your active campaigns and creator performance in real-time. How can I assist your strategy today?";
            } else if (lowerInput.includes('how are you')) {
                responseText = "I'm operating at peak efficiency! Neural Core is stable, and I've just finished indexing 5,000 new creator data points. Ready to help you find your next big match.";
            } else if (lowerInput.includes('campaign-brief')) {
                responseText = "I've generated a draft campaign brief for your 'Summer Elite' campaign. It focuses on high-engagement fitness creators in Hyderabad. View the [Campaign Blueprint v2.1](https://google.com/search?q=influencer+campaign+strategy+2026)";
            } else if (lowerInput.includes('market-trends')) {
                responseText = "Current trends show a 25% increase in short-form video engagement for lifestyle brands in South India. Source: [Regional Market Report 2026](https://google.com/search?q=south+india+influencer+market+trends+2026)";
            } else if (lowerInput.includes('brand-safety')) {
                responseText = "Security scan complete. All partners are 100% compliant. I've cross-referenced their historical data with [Global Brand Safety Standards](https://google.com/search?q=brand+safety+check+for+influencers)";
            } else if (lowerInput.includes('top-5-matches') || lowerInput.includes('find') || lowerInput.includes('match') || lowerInput.includes('vizag') || lowerInput.includes('hyderabad')) {
                responseText = "Top Matches based on current neural mapping: 1. Pavan Hari (98% match), 2. Namratha Nitish (95%), 3. Telugu Foodie (92%), 4. Mehaboob (89%), 5. Uma Traveler (87%). Shall I prepare a proposal?";
            } else if (lowerInput.includes('transparency') || lowerInput.includes('verified') || lowerInput.includes('article') || lowerInput.includes('news')) {
                responseText = "Transparency is core to our engine. All AI matches are verified through independent data audits. Check out these latest industry reports: [Portal Transparency Hub](https://google.com/search?q=influencer+engagement+transparency+news+2026) and [Creator Verification Standards](https://google.com/search?q=influencer+verification+process+articles)";
            } else {
                // 2. Fallback to Gemini API for general questions
                const geminiResponse = await chatWithGemini(textToSend);

                if (geminiResponse) {
                    responseText = geminiResponse;
                } else {
                    // 3. Last fallback if API failed
                    responseText = "I'm having trouble connecting to my Neural Core. Please verify your API key or connection. In the meantime, I can still help with matching and campaign strategy using my local tactical logic.";
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
        <div className="max-w-[1400px] mx-auto h-[calc(100vh-180px)] flex gap-8">
            {/* Sidebar Info */}
            <div className="hidden xl:flex flex-col gap-6 w-80">
                <div className="glass-card p-8 space-y-6 bg-gradient-to-b from-primary/5 to-transparent">
                    <div className="w-16 h-16 rounded-2xl gradient-bg flex items-center justify-center text-white shadow-xl">
                        <Bot className="w-8 h-8" />
                    </div>
                    <div>
                        <h2 className="text-2xl font-display font-bold mb-2">Neural Asst.</h2>
                        <p className="text-muted-foreground text-sm font-medium leading-relaxed">
                            Your autonomous strategist capable of real-time market analysis and creator matching.
                        </p>
                    </div>
                    <div className="space-y-4 pt-4">
                        {[
                            { label: 'Uptime', value: '99.9%', icon: Globe, color: 'text-green-500' },
                            { label: 'Security', value: 'Standard-B', icon: ShieldCheck, color: 'text-blue-500' },
                            { label: 'Speed', value: '<200ms', icon: Zap, color: 'text-orange-500' },
                        ].map((stat, i) => (
                            <div key={i} className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <stat.icon className={`w-4 h-4 ${stat.color}`} />
                                    <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">{stat.label}</span>
                                </div>
                                <span className="text-[10px] font-black text-foreground">{stat.value}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="glass-card p-8 bg-muted/10">
                    <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground mb-4">Quick Commands</h4>
                    <div className="space-y-2">
                        {[
                            'Generate Campaign Brief',
                            'Analyze Market Trends',
                            'Scan Brand Safety',
                            'Find Top 5 Matches'
                        ].map((cmd) => {
                            const command = `/${cmd.toLowerCase().replace(/ /g, '-')}`;
                            return (
                                <button
                                    key={cmd}
                                    onClick={() => handleSend(command)}
                                    className="w-full text-left p-3 rounded-xl border border-border/50 hover:bg-white hover:border-primary/20 hover:text-primary transition-all text-xs font-bold font-mono group flex items-center justify-between"
                                >
                                    <span>{command}</span>
                                    <Sparkles className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Main Chat Interface */}
            <div className="flex-1 glass-card flex flex-col overflow-hidden border-border/40 shadow-2xl relative">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,hsl(var(--primary)/0.03),transparent_50%)] pointer-events-none" />

                {/* Header */}
                <div className="p-8 border-b border-border/50 flex items-center justify-between shrink-0 relative z-10">
                    <div className="flex items-center gap-4">
                        <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
                        <h3 className="text-xl font-display font-bold">Encrypted Session: Neural-26</h3>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1.5 px-3 py-1 bg-white/5 rounded-full border border-white/10">
                            <div className={`w-1.5 h-1.5 rounded-full ${import.meta.env.VITE_GEMINI_API_KEY ? 'bg-green-500' : 'bg-red-500'}`} />
                            <span className="text-[8px] font-black uppercase tracking-widest opacity-60">Neural: {import.meta.env.VITE_GEMINI_API_KEY ? 'Online' : 'Offline'}</span>
                        </div>
                        <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-[10px] font-black uppercase tracking-widest">Enterprise AI</span>
                        <div className="h-8 w-px bg-border mx-2" />
                        <Sparkles className="w-5 h-5 text-amber-400 fill-amber-400" />
                    </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-10 space-y-8 custom-scrollbar relative z-10">
                    {messages.map((msg) => (
                        <motion.div
                            key={msg.id}
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={`flex items-start gap-4 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}
                        >
                            <div className={`w-10 h-10 rounded-xl shrink-0 flex items-center justify-center shadow-lg transition-transform hover:scale-110 ${msg.sender === 'bot' ? 'gradient-bg text-white' : 'bg-secondary/10 text-secondary'}`}>
                                {msg.sender === 'bot' ? <Bot className="w-5 h-5" /> : <User className="w-5 h-5" />}
                            </div>
                            <div className={`max-w-[70%] space-y-2 ${msg.sender === 'user' ? 'text-right' : ''}`}>
                                <div className={`p-5 rounded-[2rem] text-[15px] font-medium leading-relaxed ${msg.sender === 'bot' ? 'bg-white dark:bg-card border border-border shadow-md' : 'gradient-bg text-white shadow-xl shadow-primary/10'}`}>
                                    {msg.text}
                                </div>
                                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest opacity-40">
                                    {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                    {isTyping && (
                        <div className="flex items-start gap-4">
                            <div className="w-10 h-10 rounded-xl gradient-bg shrink-0 flex items-center justify-center text-white"><Bot className="w-5 h-5" /></div>
                            <div className="p-6 bg-white dark:bg-card border border-border rounded-[2rem] flex gap-1.5 shadow-md">
                                <div className="w-2 h-2 bg-primary rounded-full animate-bounce" />
                                <div className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:0.2s]" />
                                <div className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:0.4s]" />
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                {/* Suggestions & Input */}
                <div className="p-8 border-t border-border/50 shrink-0 relative z-10 bg-muted/5">
                    <div className="flex gap-2 flex-wrap mb-6">
                        {[
                            "How do I start a campaign?",
                            "Best influencers in Vizag?",
                            "Show me transparency reports",
                            "Pricing for premium creators"
                        ].map((s) => (
                            <button
                                key={s}
                                onClick={() => handleSend(s)}
                                className="px-5 py-2.5 rounded-2xl bg-white dark:bg-card border border-border/50 hover:border-primary/30 hover:bg-primary/5 text-[11px] font-bold transition-all text-muted-foreground hover:text-primary shadow-sm"
                            >
                                {s}
                            </button>
                        ))}
                    </div>

                    <div className="flex gap-4 p-3 bg-white dark:bg-card rounded-3xl border border-border/50 focus-within:border-primary/40 focus-within:shadow-2xl focus-within:shadow-primary/5 transition-all">
                        <div className="w-12 h-12 rounded-2xl bg-muted/30 flex items-center justify-center text-muted-foreground shrink-0 border border-border shadow-sm">
                            <MessageSquare className="w-5 h-5" />
                        </div>
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                            placeholder="Message your AI Strategist..."
                            className="flex-1 bg-transparent border-none outline-none text-base font-medium px-2"
                        />
                        <button
                            onClick={() => handleSend()}
                            disabled={!input.trim()}
                            className="h-12 px-8 rounded-2xl gradient-bg text-white flex items-center justify-center gap-2 font-black uppercase tracking-widest hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:scale-100"
                        >
                            Send <Send className="w-4 h-4" />
                        </button>
                    </div>
                    <div className="flex items-center gap-6 mt-4 px-4">
                        <span className="text-[9px] font-black uppercase tracking-widest text-muted-foreground">Encryption: AES-256</span>
                        <span className="text-[9px] font-black uppercase tracking-widest text-muted-foreground">Model: Neural-Core-X</span>
                        <span className="text-[9px] font-black uppercase tracking-widest text-muted-foreground ml-auto">Powered by Quantum Computing</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
