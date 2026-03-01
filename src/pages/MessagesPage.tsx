import { useState, useRef, useEffect } from 'react';
import { sampleChatThreads, sampleInfluencerChats, type ChatThread, type Message } from '@/data/mockData';
import {
  Search, Send, MoreVertical, Edit2, Trash2, X, Check, CheckCheck,
  Info, Paperclip, Smile, Pin, ChevronLeft, Plus,
  MapPin, BellOff, ShieldAlert, CheckCircle2
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';

export default function MessagesPage() {
  const { user } = useAuth();
  const { toast } = useToast();

  // Determine which initial threads to load based on user role
  const getInitialThreads = () => {
    if (user?.role === 'influencer') {
      return sampleInfluencerChats;
    }
    return sampleChatThreads;
  };

  const [searchQuery, setSearchQuery] = useState('');
  const [threads, setThreads] = useState<ChatThread[]>(getInitialThreads);
  const [activeThreadId, setActiveThreadId] = useState<string>(getInitialThreads()[0]?.id || '');
  const [showList, setShowList] = useState(true);
  const [showDetails, setShowDetails] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [newMessage, setNewMessage] = useState('');
  const [editingMessageId, setEditingMessageId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  // Sync threads when user role changes (e.g. after auth load)
  useEffect(() => {
    const newThreads = user?.role === 'influencer' ? sampleInfluencerChats : sampleChatThreads;
    setThreads(newThreads);
    setActiveThreadId(newThreads[0]?.id || '');
  }, [user?.role]);

  const activeThread = threads.find(t => t.id === activeThreadId) || threads[0];
  const messages = activeThread?.messages || []; // Safe access

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  // Handle Search Filtering
  const filteredThreads = threads.filter(t =>
    t.participantName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSend = () => {
    if (!newMessage.trim()) return;

    const newMsg: Message = {
      id: `m-new-${Date.now()}`,
      senderId: 'me',
      senderName: 'You',
      senderAvatar: '',
      text: newMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    // Update local state for immediate feedback
    setThreads(prev => prev.map(t =>
      t.id === activeThreadId
        ? { ...t, messages: [...t.messages, newMsg], lastMessage: newMessage, lastTimestamp: 'Just now' }
        : t
    ));
    setNewMessage('');

    // Simulate Brand Auto-Reply
    setTimeout(() => {
      setIsTyping(true);
      setTimeout(() => {
        const reply: Message = {
          id: `reply-${Date.now()}`,
          senderId: activeThread.id,
          senderName: activeThread.participantName,
          senderAvatar: activeThread.participantAvatar,
          text: "Thanks for the message! Our team will review your proposal and get back to you within 24 hours. Looking forward to collaborating! ✨",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
        setThreads(prev => prev.map(t =>
          t.id === activeThreadId
            ? { ...t, messages: [...t.messages, reply], lastMessage: reply.text, lastTimestamp: 'Just now' }
            : t
        ));
        setIsTyping(false);
      }, 2500);
    }, 1200);
  };

  const handleDelete = (msgId: string) => {
    setThreads(prev => prev.map(t => t.id === activeThreadId ? {
      ...t,
      messages: t.messages.map(m => m.id === msgId ? { ...m, text: "This message was deleted", isDeleted: true } : m)
    } : t));
    toast({
      title: "Deleted",
      description: "Message has been removed from your view.",
      variant: "destructive",
    });
  };

  const startEdit = (msg: Message) => {
    setEditingMessageId(msg.id);
    setEditValue(msg.text);
  };

  const handleEdit = () => {
    if (!editValue.trim() || !editingMessageId) return;
    setThreads(prev => prev.map(t => t.id === activeThreadId ? {
      ...t,
      messages: t.messages.map(m => m.id === editingMessageId ? { ...m, text: editValue, isEdited: true } : m)
    } : t));
    setEditingMessageId(null);
    setEditValue('');
    toast({ title: "Edited", description: "Message updated successfully." });
  };

  return (
    <div className="flex h-[calc(100vh-8rem)] glass-card overflow-hidden shadow-2xl border-border/40 relative">
      {/* 1. Chat List Sidebar */}
      <div className={`w-full md:w-[400px] border-r border-border flex flex-col bg-card/50 ${!showList ? 'hidden md:flex' : 'flex'}`}>
        <div className="p-6 border-b border-border bg-card/80 backdrop-blur-xl shrink-0">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-display font-bold tracking-tight">Messages</h2>
            <Button variant="ghost" size="icon" className="rounded-2xl bg-primary/5 text-primary hover:bg-primary/20"><Plus className="w-5 h-5" /></Button>
          </div>
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search people or brands..."
              className="pl-12 h-12 bg-muted/50 border-0 rounded-2xl focus-visible:ring-2 focus-visible:ring-primary/20"
            />
          </div>
          <div className="flex gap-2 mt-4 overflow-x-auto pb-2 scrollbar-hide">
            {['All', 'Unread', 'Pinned', 'Archive'].map(tab => (
              <button
                key={tab}
                className={`px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${tab === 'All' ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'bg-muted/30 text-muted-foreground hover:bg-muted'}`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1 overflow-auto custom-scrollbar">
          {filteredThreads.map(thread => (
            <button
              key={thread.id}
              onClick={() => { setActiveThreadId(thread.id); setShowList(false); }}
              className={`w-full flex items-center gap-4 p-5 border-b border-border/20 transition-all relative group ${activeThreadId === thread.id ? 'bg-primary/10 after:absolute after:left-0 after:top-0 after:bottom-0 after:w-1.5 after:bg-primary' : 'hover:bg-primary/5'}`}
            >
              <div className="relative shrink-0">
                <img src={thread.participantAvatar} alt="" className="w-16 h-16 rounded-2xl object-cover shadow-lg group-hover:scale-105 transition-transform" />
                {thread.isOnline && (
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-green-500 border-4 border-white dark:border-card shadow-sm" />
                )}
              </div>
              <div className="flex-1 min-w-0 flex flex-col items-start h-full py-1">
                <div className="flex items-center justify-between grow w-full mb-1">
                  <span className="text-sm font-bold truncate pr-2">{thread.participantName}</span>
                  <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">{thread.lastTimestamp}</span>
                </div>
                <div className="flex items-center justify-between grow w-full">
                  <p className="text-xs text-muted-foreground truncate leading-relaxed">
                    {thread.lastMessage}
                  </p>
                  <div className="flex items-center gap-2">
                    <Pin className="w-3 h-3 text-primary rotate-45 opacity-0 group-hover:opacity-40 transition-opacity" />
                    {thread.unread > 0 && (
                      <span className="bg-primary text-white text-[10px] font-black w-5 h-5 rounded-lg flex items-center justify-center shadow-lg shadow-primary/20 shrink-0">
                        {thread.unread}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </button>
          ))}
          {filteredThreads.length === 0 && (
            <div className="py-20 text-center opacity-40">
              <Search className="w-10 h-10 mx-auto mb-3" />
              <p className="text-sm font-bold uppercase tracking-widest">No results found</p>
            </div>
          )}
        </div>
      </div>

      {/* 2. Chat Area Container */}
      <div className={`flex-1 flex flex-col bg-card/30 relative transition-all ${showList ? 'hidden md:flex' : 'flex'}`}>
        {/* Chat Header */}
        <div className="h-24 border-b border-border flex items-center justify-between px-8 bg-card/80 backdrop-blur-xl z-30 shrink-0 shadow-sm">
          <div className="flex items-center gap-5">
            <button className="md:hidden p-2 -ml-2 hover:bg-muted rounded-xl transition-colors" onClick={() => setShowList(true)}>
              <ChevronLeft className="w-6 h-6" />
            </button>
            <div className="relative group cursor-pointer" onClick={() => setShowDetails(!showDetails)}>
              <img src={activeThread.participantAvatar} alt="" className="w-16 h-16 rounded-2xl object-cover shadow-xl group-hover:ring-4 group-hover:ring-primary/20 transition-all hover:scale-105" />
              {activeThread.isOnline && (
                <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full bg-green-500 border-2 border-white dark:border-card" />
              )}
            </div>
            <div>
              <p className="text-xl font-display font-bold tracking-tight cursor-pointer hover:text-primary transition-colors" onClick={() => setShowDetails(!showDetails)}>
                {activeThread.participantName}
              </p>
              <div className="flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${activeThread.isOnline ? 'bg-green-500 animate-pulse' : 'bg-muted-foreground/30'}`} />
                <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                  {activeThread.isOnline ? 'Active Now' : activeThread.lastSeen}
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              className={`rounded-2xl w-12 h-12 transition-all ${showDetails ? 'bg-primary/10 text-primary' : 'hover:bg-primary/5'}`}
              onClick={() => setShowDetails(!showDetails)}
            >
              <Info className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Message Content Area */}
        <div ref={scrollRef} className="flex-1 overflow-auto p-10 space-y-8 custom-scrollbar relative">
          {/* Wallpaper / Background */}
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1549490349-8643362247b5?w=1600&q=80')] bg-fixed opacity-5 dark:opacity-10 pointer-events-none" />

          <div className="relative z-10 flex flex-col gap-8 max-w-4xl mx-auto">
            <div className="flex justify-center mb-4">
              <span className="px-6 py-2 rounded-2xl bg-muted/40 backdrop-blur-md text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground border border-border/20 shadow-sm">
                Conversation Started
              </span>
            </div>

            {messages.map((msg, idx) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                className={`flex ${msg.senderId === 'me' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`group relative max-w-[70%] flex flex-col ${msg.senderId === 'me' ? 'items-end' : 'items-start'}`}>
                  {idx > 0 && messages[idx - 1].senderId !== msg.senderId && (
                    <span className="text-[9px] font-black uppercase tracking-widest text-muted-foreground/50 mb-2 px-3">
                      {msg.senderName}
                    </span>
                  )}

                  <div className={`relative px-6 py-4 rounded-[1.8rem] shadow-xl shadow-black/5 transition-all hover:scale-[1.01] ${msg.senderId === 'me'
                    ? 'bg-primary text-white rounded-tr-none'
                    : 'bg-white dark:bg-card border border-border/50 rounded-tl-none'
                    } ${msg.isDeleted ? 'opacity-40 italic' : ''}`}>

                    {msg.senderId === 'me' && !msg.isDeleted && (
                      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <button className="p-2 hover:bg-white/10 rounded-xl transition-colors"><MoreVertical className="w-4 h-4" /></button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-44 rounded-2xl p-2 bg-white/95 backdrop-blur-xl border-border/50">
                            <DropdownMenuItem onClick={() => startEdit(msg)} className="gap-3 text-[11px] font-bold uppercase tracking-widest rounded-xl transition-all"><Edit2 className="w-4 h-4" /> Edit</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleDelete(msg.id)} className="gap-3 text-[11px] font-bold uppercase tracking-widest rounded-xl text-destructive hover:bg-destructive/10 transition-all"><Trash2 className="w-4 h-4" /> Delete</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    )}

                    <p className="text-sm leading-relaxed pr-4">{msg.text}</p>

                    <div className="flex items-center justify-end gap-2 mt-3">
                      {msg.isEdited && <span className="text-[9px] font-black uppercase opacity-60">Edited</span>}
                      <span className={`text-[9px] font-bold tracking-widest ${msg.senderId === 'me' ? 'text-white/60' : 'text-muted-foreground/60'}`}>
                        {msg.timestamp}
                      </span>
                      {msg.senderId === 'me' && !msg.isDeleted && (
                        <div className="flex -space-x-2">
                          <Check className="w-3.5 h-3.5 text-white/40" />
                          <Check className="w-3.5 h-3.5 text-blue-300" />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}

            {isTyping && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
                <div className="bg-white dark:bg-card px-6 py-4 rounded-[1.8rem] rounded-tl-none border border-border/50 shadow-xl shadow-black/5 flex gap-1.5 items-center">
                  <div className="w-2 h-2 bg-primary/40 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-2 h-2 bg-primary/40 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="w-2 h-2 bg-primary/40 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </motion.div>
            )}
          </div>
        </div>

        {/* Input Bar Area */}
        <div className="p-8 border-t border-border bg-card/80 backdrop-blur-xl shrink-0 z-30">
          <AnimatePresence>
            {editingMessageId && (
              <motion.div initial={{ height: 0, opacity: 0, scaleY: 0 }} animate={{ height: 'auto', opacity: 1, scaleY: 1 }} exit={{ height: 0, opacity: 0, scaleY: 0 }} className="flex lg:items-end gap-4 mb-6 origin-bottom">
                <div className="flex-1 bg-primary/5 border border-primary/20 p-4 rounded-[1.5rem] flex flex-col gap-2">
                  <span className="text-[10px] font-black uppercase tracking-widest text-primary px-2 flex items-center justify-between">
                    Editing Message <button onClick={() => setEditingMessageId(null)} className="hover:rotate-90 transition-transform"><X className="w-4 h-4" /></button>
                  </span>
                  <Input value={editValue} onChange={e => setEditValue(e.target.value)} className="bg-transparent border-0 focus-visible:ring-0 text-sm h-12 px-2" autoFocus />
                </div>
                <Button onClick={handleEdit} className="h-20 w-20 rounded-[1.5rem] gradient-bg shadow-2xl shadow-primary/30"><Check className="w-10 h-10" /></Button>
              </motion.div>
            )}
          </AnimatePresence>

          {!editingMessageId && (
            <div className="flex items-center gap-4 bg-muted/30 p-2.5 rounded-[2rem] border border-border/40 focus-within:border-primary/30 focus-within:bg-muted/60 transition-all shadow-inner">
              <Button variant="ghost" size="icon" className="rounded-[1.5rem] w-14 h-14 hover:bg-primary/10 hover:text-primary transition-all"><Paperclip className="w-6 h-6" /></Button>
              <div className="flex-1">
                <Input
                  value={newMessage}
                  onChange={e => setNewMessage(e.target.value)}
                  placeholder={`Message ${activeThread.participantName}...`}
                  className="bg-transparent border-0 h-14 px-3 text-base focus-visible:ring-0 placeholder:text-muted-foreground/40 font-medium"
                  onKeyDown={e => e.key === 'Enter' && handleSend()}
                />
              </div>
              <Button variant="ghost" size="icon" className="rounded-[1.5rem] w-14 h-14 hover:bg-primary/10 hover:text-primary transition-all"><Smile className="w-6 h-6" /></Button>
              <Button
                onClick={handleSend}
                disabled={!newMessage.trim()}
                className="h-14 w-14 rounded-[1.5rem] gradient-bg shadow-2xl shadow-primary/30 hover:scale-105 active:scale-95 transition-all group shrink-0"
              >
                <Send className="w-6 h-6 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* 3. Detail Sidebar - Hidden by default */}
      <AnimatePresence>
        {showDetails && (
          <motion.div
            initial={{ width: 0, opacity: 0 }} animate={{ width: 450, opacity: 1 }} exit={{ width: 0, opacity: 0 }}
            className="border-l border-border bg-card/50 hidden lg:flex flex-col relative z-40 overflow-hidden"
          >
            <div className="flex-1 flex flex-col p-10 overflow-auto custom-scrollbar">
              <div className="flex justify-end mb-8">
                <Button variant="ghost" size="icon" onClick={() => setShowDetails(false)} className="rounded-[1rem] hover:bg-destructive/10 hover:text-destructive active:scale-95 transition-all">
                  <X className="w-6 h-6" />
                </Button>
              </div>

              <div className="text-center space-y-6 mb-12">
                <div className="w-40 h-40 rounded-[3rem] overflow-hidden mx-auto shadow-2xl ring-[12px] ring-primary/5 group relative">
                  <img src={activeThread.participantAvatar} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                </div>
                <div>
                  <h3 className="text-3xl font-display font-bold">{activeThread.participantName}</h3>
                  <p className="text-[10px] font-black uppercase tracking-[0.4em] text-primary mt-1">{activeThread.participantRole} Account</p>
                </div>
                <div className="flex justify-center gap-3">
                  <Badge variant="outline" className="px-5 py-2 rounded-2xl text-[10px] font-bold uppercase tracking-widest border-primary/20 text-primary bg-primary/5">Official Partner</Badge>
                  <Badge variant="outline" className="px-5 py-2 rounded-2xl text-[10px] font-bold uppercase tracking-widest border-green-500/20 text-green-500 bg-green-500/5">Verified</Badge>
                </div>
              </div>

              <div className="space-y-10">
                <div className="space-y-5">
                  <p className="text-[11px] font-black uppercase tracking-[0.4em] text-muted-foreground/60 px-2 flex items-center gap-3">
                    <Info className="w-3.5 h-3.5" /> Campaign Insights
                  </p>
                  <div className="p-8 bg-muted/40 rounded-[2.5rem] border border-border/50 space-y-6 shadow-inner">
                    <p className="text-sm italic text-muted-foreground leading-relaxed">"Launching a luxury heritage collection focusing on traditional Banarasi craftsmanship for the 2026 festive season."</p>
                    <div className="grid grid-cols-2 gap-6 pt-6 border-t border-border/10">
                      <div>
                        <p className="text-[9px] font-black uppercase text-muted-foreground/50 mb-1.5">Engagement</p>
                        <p className="text-sm font-bold text-green-600 flex items-center gap-2"><CheckCircle2 className="w-4 h-4" /> High Interest</p>
                      </div>
                      <div>
                        <p className="text-[9px] font-black uppercase text-muted-foreground/50 mb-1.5">Region</p>
                        <p className="text-sm font-bold flex items-center gap-2"><MapPin className="w-4 h-4" /> South India</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-5">
                  <div className="flex items-center justify-between px-2">
                    <p className="text-[11px] font-black uppercase tracking-[0.4em] text-muted-foreground/60">Shared Assets</p>
                    <button className="text-[10px] font-bold text-primary hover:underline transition-all">Explore All</button>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    {[
                      'https://images.unsplash.com/photo-1610030482711-20a233306fbc?w=200&q=80',
                      'https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=200&q=80',
                      'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=200&q=80',
                      'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=200&q=80',
                      'https://images.unsplash.com/photo-1599643477877-530eb83abc8e?w=200&q=80',
                      'https://images.unsplash.com/photo-1534120247760-c44c3e4a62f1?w=200&q=80'
                    ].map((img, i) => (
                      <div key={i} className="aspect-square rounded-[1.5rem] overflow-hidden shadow-lg cursor-pointer hover:opacity-80 hover:scale-95 transition-all">
                        <img src={img} className="w-full h-full object-cover" />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-4 pt-4 border-t border-border/10">
                  <p className="text-[11px] font-black uppercase tracking-[0.4em] text-muted-foreground/60 px-2">Engagement Settings</p>
                  <Button variant="outline" className="w-full justify-start gap-4 h-16 rounded-[1.8rem] text-[11px] font-black uppercase tracking-widest border-border group hover:border-primary/30 hover:text-primary transition-all shadow-sm">
                    <BellOff className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" /> Mute Conversation
                  </Button>
                  <Button variant="outline" className="w-full justify-start gap-4 h-16 rounded-[1.8rem] text-[11px] font-black uppercase tracking-widest border-border group hover:border-destructive/30 hover:text-destructive transition-all shadow-sm">
                    <ShieldAlert className="w-5 h-5 text-muted-foreground group-hover:text-destructive transition-colors" /> Report Content
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
