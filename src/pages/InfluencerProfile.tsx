import { useState, useRef, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { generateInfluencers, formatFollowers } from '@/data/mockData';
import {
  ArrowLeft, MapPin, Star, Globe, Instagram, Youtube, Twitter,
  Send, Mail, Users, Heart, Megaphone, MessageSquare,
  X, ShieldCheck, Zap, CreditCard, Check, ChevronRight, Package, Lock, Sparkles,
  Calendar as CalendarIcon, Smartphone, Wallet, Building2, Clock, CheckCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';

const influencers = generateInfluencers();

export default function InfluencerProfile() {
  const { id } = useParams();
  const { user: currentUser } = useAuth();
  const { toast } = useToast();
  const [showInquiryModal, setShowInquiryModal] = useState(false);
  const [showChatSpace, setShowChatSpace] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentStep, setPaymentStep] = useState(1);
  const [selectedService, setSelectedService] = useState<any>(null);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('card');
  const [chatMessage, setChatMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<any[]>([]);
  const chatScrollRef = useRef<HTMLDivElement>(null);
  const [campaignData, setCampaignData] = useState({
    startDate: undefined as Date | undefined,
    endDate: undefined as Date | undefined,
    campaignName: '',
    description: '',
    budget: ''
  });
  const [paymentData, setPaymentData] = useState({
    cardNumber: '',
    cardName: '',
    expiry: '',
    cvv: '',
    email: currentUser?.email || '',
    upiId: '',
    bankName: '',
    accountNumber: ''
  });

  const inf = influencers.find(i => i.id === id);

  useEffect(() => {
    if (chatScrollRef.current) {
      chatScrollRef.current.scrollTop = chatScrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  if (!inf) return <div className="text-center py-20"><p>Influencer not found</p><Link to="/dashboard/influencers" className="text-primary">← Back</Link></div>;

  const platformIcon = (p: string) => {
    if (p === 'Instagram') return <Instagram className="w-4 h-4" />;
    if (p === 'YouTube') return <Youtube className="w-4 h-4" />;
    return <Twitter className="w-4 h-4" />;
  };

  const handleSendInquiry = () => {
    setShowInquiryModal(false);
    alert(`Collaboration request sent to ${inf.name}! Track its status in your Sent Invitations.`);
  };

  const handleSendMessage = () => {
    if (!chatMessage.trim()) return;

    const newMsg = {
      id: Date.now(),
      text: chatMessage,
      sender: 'me',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, newMsg]);
    setChatMessage('');
    setIsTyping(true);

    setTimeout(() => {
      const reply = {
        id: Date.now() + 1,
        text: `Hey ${currentUser?.name || 'there'}! Thanks for reaching out. I'm very interested in your proposal. Shall we jump on a quick call to discuss details?`,
        sender: 'influencer',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, reply]);
      setIsTyping(false);
    }, 2000);
  };

  // Services
  const services = [
    {
      id: 'consultation',
      name: '1:1 Consultation',
      basePrice: 5000,
      icon: Users,
      description: '30 min video call strategy session',
      features: ['Strategy Review', 'Q&A Session', 'Profile Audit']
    },
    {
      id: 'instagram-post',
      name: 'Instagram Post',
      basePrice: 25000,
      icon: Instagram,
      description: '1 Static Post with your brand product',
      features: ['High-res Photo', 'Caption Writing', 'Tagging & Collab']
    },
    {
      id: 'reel',
      name: 'Reel Collaboration',
      basePrice: 45000,
      icon: Youtube,
      description: '60s Reel with creative direction',
      features: ['Scripting', 'Editing', 'Trending Audio', 'Cover Image']
    },
    {
      id: 'campaign',
      name: 'Full Campaign',
      basePrice: 100000,
      icon: Megaphone,
      description: 'Comprehensive brand integration',
      features: ['1 Reel + 1 Post', '3 Stories', 'Link in Bio (7 days)', 'Cross-platform']
    }
  ];

  const handleOpenPayment = () => {
    setShowInquiryModal(false);
    setShowPaymentModal(true);
    setPaymentStep(1);
  };

  const handleSelectService = (service: any) => {
    setSelectedService(service);
    setCampaignData(prev => ({ ...prev, budget: service.basePrice.toString() }));
    setPaymentStep(2);
  };

  const handleContinueToPayment = () => {
    if (!campaignData.startDate || !campaignData.budget) {
      toast({
        title: "Missing Information",
        description: "Please select a date and confirm your budget.",
        variant: "destructive",
      });
      return;
    }
    setPaymentStep(3);
  };

  const handleProcessPayment = () => {
    setPaymentStep(4);
    setTimeout(() => {
      toast({
        title: "Payment Successful!",
        description: `You've successfully booked ${inf.name} for the ${selectedService.name} package.`,
        className: "bg-green-600 text-white border-none",
      });
      setTimeout(() => {
        setShowPaymentModal(false);
        setPaymentStep(1);
        setSelectedService(null);
        setCampaignData({ startDate: undefined, endDate: undefined, campaignName: '', description: '', budget: '' });
      }, 3000);
    }, 1500);
  };

  const paymentMethods = [
    { id: 'card', name: 'Credit/Debit Card', icon: CreditCard, description: 'Visa, Mastercard, Amex' },
    { id: 'netbanking', name: 'Net Banking', icon: Building2, description: 'All major banks' },
    { id: 'upi', name: 'UPI', icon: Smartphone, description: 'Google Pay, PhonePe, Paytm' },
    { id: 'wallet', name: 'Wallet', icon: Wallet, description: 'Paytm, Amazon Pay' }
  ];

  return (
    <div className="max-w-5xl mx-auto">
      <Link to="/dashboard/influencers" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-4 transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back to Influencers
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pb-20">
        {/* Left sidebar */}
        <motion.div
          className="glass-card p-6 text-center h-fit sticky top-24"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <div className="mb-6 relative inline-block group">
            <img src={inf.avatar} alt={inf.name} className="w-32 h-32 rounded-[2.5rem] mx-auto mb-4 border-4 border-primary/20 shadow-2xl group-hover:scale-105 transition-transform duration-500" />
            <div className="absolute -bottom-1 -right-1 w-8 h-8 rounded-xl bg-white dark:bg-card border-4 border-background flex items-center justify-center shadow-lg">
              <Zap className="w-4 h-4 text-primary fill-primary" />
            </div>
          </div>

          <h1 className="text-2xl font-display font-bold leading-none">{inf.name}</h1>
          <div className="flex items-center justify-center gap-1 text-sm text-muted-foreground mt-2">
            <MapPin className="w-4 h-4" />{inf.city}
          </div>
          <div className="flex items-center justify-center gap-2 mt-3 bg-muted/30 w-fit mx-auto px-4 py-1.5 rounded-full border border-border/50">
            <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
            <span className="font-bold text-sm tracking-tight">{inf.rating}</span>
            <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">({inf.reviews.length} reviews)</span>
          </div>

          <div className="grid grid-cols-2 gap-3 mt-8">
            <div className="p-4 rounded-2xl bg-muted/40 text-center border border-border/10 shadow-inner">
              <p className="text-xl font-display font-bold tracking-tight">{formatFollowers(inf.followers)}</p>
              <p className="text-[9px] font-black uppercase tracking-[0.2em] text-muted-foreground">Followers</p>
            </div>
            <div className="p-4 rounded-2xl bg-muted/40 text-center border border-border/10 shadow-inner">
              <p className="text-xl font-display font-bold tracking-tight">{inf.pastBrands.length}</p>
              <p className="text-[9px] font-black uppercase tracking-[0.2em] text-muted-foreground">Brands</p>
            </div>
          </div>

          <div className="flex gap-2 mt-6">
            {inf.socialLinks.map(link => (
              <a key={link.platform} href={link.url} target="_blank" rel="noreferrer" className="flex-1 p-3 rounded-2xl border border-border hover:border-primary/50 hover:bg-primary/5 transition-all flex flex-col items-center gap-1 shadow-sm">
                {platformIcon(link.platform)}
                <span className="text-[9px] font-black text-muted-foreground uppercase tracking-widest">{link.platform}</span>
              </a>
            ))}
          </div>

          {currentUser?.role === 'client' && (
            <div className="mt-8 space-y-3">
              <Button onClick={() => setShowInquiryModal(true)} className="w-full h-14 gradient-bg border-0 text-[11px] font-black uppercase tracking-widest rounded-2xl shadow-xl shadow-primary/20 hover:scale-105 active:scale-95 transition-all">
                Hire {inf.name.split(' ')[0]}
              </Button>
              <Button onClick={() => setShowChatSpace(true)} variant="outline" className="w-full h-14 text-[11px] font-black uppercase tracking-widest rounded-2xl border-2 hover:bg-muted transition-all flex items-center justify-center gap-3">
                <MessageSquare className="w-4 h-4" /> Send Message
              </Button>
            </div>
          )}
        </motion.div>

        {/* Main content */}
        <motion.div
          className="lg:col-span-2 space-y-6"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <div className="glass-card p-10">
            <h2 className="text-2xl font-display font-bold tracking-tight mb-6 flex items-center gap-4">
              <span className="w-2 h-10 gradient-bg rounded-full" /> Profile Bio
            </h2>
            <p className="text-sm text-muted-foreground leading-loose font-medium">{inf.bio}</p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
              {[
                { label: 'Niche', value: inf.niche, icon: Heart },
                { label: 'Audience', value: inf.audienceType, icon: Users },
                { label: 'Region', value: inf.region, icon: MapPin },
                { label: 'Languages', value: inf.languages.join(', '), icon: Globe },
              ].map((item, i) => (
                <div key={i} className="p-5 rounded-[1.8rem] border border-border/40 bg-muted/10 hover:bg-muted/20 transition-colors group">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <item.icon className="w-3.5 h-3.5 text-primary" />
                    </div>
                    <span className="text-[9px] font-black text-muted-foreground uppercase tracking-[0.2em]">{item.label}</span>
                  </div>
                  <p className="text-sm font-bold tracking-tight">{item.value}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-card p-10">
            <h2 className="text-2xl font-display font-bold tracking-tight mb-8">Past Collaborations</h2>
            <div className="flex flex-wrap gap-4">
              {inf.pastBrands.map(brand => (
                <span key={brand} className="px-6 py-3 rounded-2xl bg-muted/30 text-[11px] font-black uppercase tracking-widest border border-border/50 hover:bg-muted/50 hover:border-primary/20 transition-all cursor-default shadow-sm">{brand}</span>
              ))}
            </div>
          </div>

          <div className="glass-card p-10">
            <h2 className="text-2xl font-display font-bold tracking-tight mb-10">Client Testimonials</h2>
            <div className="space-y-8">
              {inf.reviews.map((review, i) => (
                <div key={i} className="p-8 rounded-[2.5rem] border border-border/40 bg-muted/5 relative group hover:border-primary/20 transition-all">
                  <Star className="absolute top-8 right-8 w-16 h-16 text-primary opacity-[0.03] group-hover:opacity-[0.08] transition-opacity" />
                  <div className="flex items-center justify-between mb-5">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/20">
                        <Users className="w-5 h-5 text-primary" />
                      </div>
                      <span className="text-[11px] font-black uppercase tracking-[0.3em] text-foreground">{review.clientName}</span>
                    </div>
                    <div className="flex items-center gap-1.5 bg-amber-400/10 px-3 py-1.5 rounded-xl border border-amber-400/20">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <span className="text-xs font-black text-amber-600 tracking-tight">{review.rating}</span>
                    </div>
                  </div>
                  <p className="text-[15px] font-medium text-muted-foreground italic leading-relaxed pl-4 border-l-2 border-primary/10">"{review.comment}"</p>
                  <p className="text-[10px] font-black text-muted-foreground/30 mt-6 uppercase tracking-[0.4em]">{review.date}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Inquiry Modal */}
      <Dialog open={showInquiryModal} onOpenChange={setShowInquiryModal}>
        <DialogContent className="sm:max-w-xl p-0 overflow-hidden border-border/30 rounded-[2.5rem]">
          <div className="gradient-bg p-10 text-white relative">
            <div className="absolute -top-10 -right-10 opacity-10 rotate-12"><Megaphone className="w-40 h-40" /></div>
            <h2 className="text-3xl font-display font-bold mb-2">Hire {inf.name}</h2>
            <p className="text-white/80 text-sm font-medium">Create a high-impact collaboration proposal.</p>
          </div>
          <div className="p-10 space-y-8 bg-card">
            <div className="space-y-6">
              <div>
                <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Campaign Name</Label>
                <Input placeholder="e.g. Summer Ethic Wear Drive 2026" className="h-14 mt-1.5 rounded-2xl bg-muted/20 border-border/50 focus:ring-primary/20" />
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Estimated Budget</Label>
                  <Input placeholder={
                    inf.rating >= 4.8 ? "₹2,00,000" :
                      inf.rating >= 4.5 ? "₹1,50,000" :
                        inf.rating >= 4.0 ? "₹1,00,000" :
                          inf.rating >= 3.5 ? "₹75,000" : "₹50,000"
                  } className="h-14 mt-1.5 rounded-2xl bg-muted/20 border-border/50" />
                </div>
                <div>
                  <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Target Date</Label>
                  <Input type="date" className="h-14 mt-1.5 rounded-2xl bg-muted/20 border-border/50" />
                </div>
              </div>
              <div>
                <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Project Brief</Label>
                <textarea
                  className="w-full min-h-[140px] rounded-2xl border border-border/50 bg-muted/20 p-5 text-sm mt-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20 transition-all font-medium placeholder:text-muted-foreground/40"
                  placeholder="Tell us about your brand vision..."
                />
              </div>
            </div>
            <div className="flex gap-4">
              <Button onClick={() => setShowInquiryModal(false)} variant="ghost" className="flex-1 h-14 text-[11px] font-black uppercase tracking-widest rounded-2xl">Cancel</Button>
              <Button onClick={handleOpenPayment} className="flex-1 h-14 gradient-bg border-0 text-[11px] font-black uppercase tracking-widest rounded-2xl shadow-xl shadow-primary/20 flex items-center justify-center gap-2">
                <CreditCard className="w-4 h-4" /> Proceed to Payment
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Chat Space Dialog */}
      <Dialog open={showChatSpace} onOpenChange={setShowChatSpace}>
        <DialogContent className="sm:max-w-2xl p-0 h-[700px] flex flex-col overflow-hidden border-border/30 rounded-[3rem] shadow-[0_32px_128px_rgba(0,0,0,0.3)]">
          {/* Header */}
          <div className="p-8 border-b border-border/50 bg-card/50 backdrop-blur-xl flex items-center justify-between shrink-0">
            <div className="flex items-center gap-4">
              <div className="relative">
                <img src={inf.avatar} className="w-14 h-14 rounded-2xl object-cover border-2 border-primary/20" />
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-4 border-card animate-pulse" />
              </div>
              <div>
                <h3 className="text-xl font-display font-bold tracking-tight flex items-center gap-2">
                  {inf.name} <ShieldCheck className="w-4 h-4 text-primary" />
                </h3>
                <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60 flex items-center gap-1.5">
                  <Zap className="w-3 h-3 text-amber-500 fill-amber-500" /> Active Now • Verified Creator
                </p>
              </div>
            </div>
            <button onClick={() => setShowChatSpace(false)} className="w-10 h-10 rounded-xl hover:bg-muted flex items-center justify-center transition-all group">
              <X className="w-5 h-5 text-muted-foreground group-hover:text-foreground" />
            </button>
          </div>

          {/* Messages */}
          <div ref={chatScrollRef} className="flex-1 overflow-y-auto p-10 space-y-8 bg-muted/5 custom-scrollbar">
            {messages.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center px-10">
                <div className="w-20 h-20 rounded-[2rem] bg-primary/5 flex items-center justify-center mb-6">
                  <MessageSquare className="w-8 h-8 text-primary/40" />
                </div>
                <h4 className="text-lg font-display font-bold mb-2">Start the conversation</h4>
                <p className="text-sm text-muted-foreground font-medium">Send a message to introduce your brand and discuss a potential partnership.</p>
              </div>
            ) : (
              messages.map((m) => (
                <motion.div
                  key={m.id}
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  className={`flex ${m.sender === 'me' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[75%] p-5 shadow-sm ${m.sender === 'me'
                    ? 'bg-primary text-white rounded-[2rem] rounded-tr-none'
                    : 'bg-white dark:bg-card border border-border/50 rounded-[2rem] rounded-tl-none'
                    }`}>
                    <p className="text-[15px] font-medium leading-relaxed">{m.text}</p>
                    <p className={`text-[9px] font-black uppercase mt-3 tracking-widest opacity-40 ${m.sender === 'me' ? 'text-right' : ''}`}>
                      {m.time}
                    </p>
                  </div>
                </motion.div>
              ))
            )}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white dark:bg-card border border-border/50 p-5 rounded-[1.8rem] rounded-tl-none flex gap-1.5 items-center">
                  <div className="w-1.5 h-1.5 bg-primary/40 rounded-full animate-bounce" />
                  <div className="w-1.5 h-1.5 bg-primary/40 rounded-full animate-bounce [animation-delay:0.2s]" />
                  <div className="w-1.5 h-1.5 bg-primary/40 rounded-full animate-bounce [animation-delay:0.4s]" />
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="p-8 border-t border-border/50 bg-card shrink-0">
            <div className="flex gap-4 p-2 bg-muted/20 rounded-3xl border border-border/50 focus-within:border-primary/20 transition-all">
              <input
                type="text"
                value={chatMessage}
                onChange={e => setChatMessage(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSendMessage()}
                placeholder={`Message ${inf.name.split(' ')[0]}...`}
                className="flex-1 bg-transparent border-none outline-none px-4 text-sm font-medium placeholder:text-muted-foreground/40"
              />
              <button
                onClick={handleSendMessage}
                disabled={!chatMessage.trim()}
                className="w-12 h-12 rounded-2xl gradient-bg text-white flex items-center justify-center shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 transition-all disabled:opacity-50 disabled:scale-100"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Payment Modal */}
      <Dialog open={showPaymentModal} onOpenChange={setShowPaymentModal}>
        <DialogContent className="sm:max-w-4xl p-0 max-h-[90vh] overflow-hidden border-border/30 rounded-[3rem] shadow-[0_32px_128px_rgba(0,0,0,0.3)]">
          {/* Step Indicator */}
          <div className="p-8 bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 border-b border-border/50">
            <div className="flex items-center justify-between max-w-3xl mx-auto">
              {[
                { num: 1, label: 'Select Service', icon: Package },
                { num: 2, label: 'Schedule & Offer', icon: CalendarIcon },
                { num: 3, label: 'Payment', icon: CreditCard },
                { num: 4, label: 'Confirmation', icon: Check }
              ].map((step, i) => (
                <div key={i} className="flex items-center">
                  <div className={`flex flex-col items-center ${i < 3 ? 'flex-1' : ''}`}>
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${paymentStep >= step.num
                      ? 'bg-primary text-white shadow-lg shadow-primary/30'
                      : 'bg-muted text-muted-foreground'
                      }`}>
                      <step.icon className="w-5 h-5" />
                    </div>
                    <span className={`text-[9px] font-black uppercase tracking-widest mt-2 ${paymentStep >= step.num ? 'text-primary' : 'text-muted-foreground'
                      }`}>
                      {step.label}
                    </span>
                  </div>
                  {i < 3 && (
                    <div className={`h-0.5 w-16 mx-3 transition-all ${paymentStep > step.num ? 'bg-primary' : 'bg-muted'
                      }`} />
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="overflow-y-auto max-h-[calc(90vh-140px)] custom-scrollbar">
            <AnimatePresence mode="wait">
              {/* Step 1: Package Selection */}
              {paymentStep === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="p-10"
                >
                  <div className="text-center mb-10">
                    <h2 className="text-3xl font-display font-bold mb-2">Select Service</h2>
                    <p className="text-muted-foreground">Choose a collaboration type to start with {inf.name}</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {services.map((service) => (
                      <motion.div
                        key={service.id}
                        whileHover={{ scale: 1.02, y: -5 }}
                        className="relative p-8 rounded-[2.5rem] border-2 cursor-pointer transition-all border-border/50 bg-card hover:border-primary/30 group"
                        onClick={() => handleSelectService(service)}
                      >
                        <div className="flex items-start justify-between mb-6">
                          <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                            <service.icon className="w-8 h-8" />
                          </div>
                          <div className="text-right">
                            <span className="text-2xl font-display font-bold tracking-tight block">₹{service.basePrice.toLocaleString()}</span>
                            <span className="text-muted-foreground text-[10px] uppercase font-black tracking-widest">Starting Price</span>
                          </div>
                        </div>

                        <h3 className="text-2xl font-display font-bold mb-2">{service.name}</h3>
                        <p className="text-muted-foreground text-sm mb-6 min-h-[40px]">{service.description}</p>

                        <ul className="space-y-3 mb-8">
                          {service.features.map((feature: string, i: number) => (
                            <li key={i} className="flex items-center gap-3 text-sm">
                              <CheckCircle className="w-4 h-4 text-green-500 shrink-0" />
                              <span className="text-muted-foreground">{feature}</span>
                            </li>
                          ))}
                        </ul>

                        <Button
                          className="w-full h-12 rounded-2xl font-black uppercase tracking-widest text-[11px] bg-muted hover:bg-primary hover:text-white transition-all"
                        >
                          Select Service
                        </Button>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Step 2: Campaign Details */}
              {paymentStep === 2 && selectedService && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="p-10"
                >
                  <div className="text-center mb-10">
                    <h2 className="text-3xl font-display font-bold mb-2">Schedule & Offer</h2>
                    <p className="text-muted-foreground">Propose your timeline and budget for this collaboration</p>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
                    {/* Left: Calendar */}
                    <div className="space-y-4 flex flex-col items-center">
                      <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1 mb-2 self-start">Proposed Date</Label>
                      <div className="p-6 rounded-[2.5rem] border border-border/50 bg-card/50 shadow-xl shadow-primary/5">
                        <Calendar
                          mode="single"
                          selected={campaignData.startDate}
                          onSelect={(date) => setCampaignData({ ...campaignData, startDate: date })}
                          className="rounded-md border-0"
                          disabled={(date) => date < new Date()}
                          classNames={{
                            head_cell: "text-muted-foreground font-normal text-[0.8rem] w-10 h-10",
                            cell: "h-10 w-10 text-center text-sm p-0 relative [&:has([aria-selected])]:bg-primary/5 first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
                            day: "h-10 w-10 p-0 font-normal aria-selected:opacity-100 rounded-full hover:bg-primary/10 hover:text-primary transition-colors",
                            day_selected: "bg-primary text-white hover:bg-primary hover:text-white shadow-lg shadow-primary/30",
                            day_today: "bg-accent text-accent-foreground font-bold",
                          }}
                        />
                      </div>
                      <p className="text-[10px] text-muted-foreground mt-2 text-center max-w-[250px]">
                        Select a preferred start date. The influencer will confirm availability within 24 hours.
                      </p>
                    </div>

                    {/* Right: Form */}
                    <div className="space-y-8">
                      <div>
                        <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Your Offer / Budget (₹)</Label>
                        <div className="relative mt-2">
                          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground font-bold">₹</span>
                          <Input
                            type="number"
                            value={campaignData.budget}
                            onChange={(e) => setCampaignData({ ...campaignData, budget: e.target.value })}
                            className="h-16 pl-8 rounded-2xl bg-muted/20 border-border/50 text-2xl font-bold font-display"
                          />
                        </div>
                        <p className="text-[10px] text-muted-foreground mt-2 ml-1 flex items-center gap-2">
                          <CheckCircle className="w-3 h-3 text-green-500" />
                          Base price for {selectedService.name}: <span className="font-bold text-foreground">₹{selectedService.basePrice.toLocaleString()}</span>
                        </p>
                      </div>

                      <div>
                        <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Message / Brief</Label>
                        <textarea
                          value={campaignData.description}
                          onChange={(e) => setCampaignData({ ...campaignData, description: e.target.value })}
                          className="w-full min-h-[180px] rounded-2xl border border-border/50 bg-muted/20 p-5 text-sm mt-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20 transition-all font-medium placeholder:text-muted-foreground/40 resize-none"
                          placeholder={`Hi ${inf.name}, I'd like to collaborate regarding...`}
                        />
                      </div>

                      <div className="flex gap-4 pt-4">
                        <Button
                          onClick={() => setPaymentStep(1)}
                          variant="outline"
                          className="flex-1 h-14 rounded-2xl text-[11px] font-black uppercase tracking-widest hover:bg-muted"
                        >
                          Back
                        </Button>
                        <Button
                          onClick={handleContinueToPayment}
                          className="flex-1 h-14 gradient-bg border-0 rounded-2xl text-[11px] font-black uppercase tracking-widest shadow-xl shadow-primary/20 flex items-center justify-center gap-2 hover:scale-105 transition-transform"
                        >
                          Continue <ChevronRight className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Step 3: Payment Method */}
              {paymentStep === 3 && selectedService && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="p-10"
                >
                  <div className="text-center mb-8">
                    <h2 className="text-3xl font-display font-bold mb-2">Billing Details</h2>
                    <p className="text-muted-foreground">Review payment breakdown and select method</p>
                  </div>

                  <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8">
                    {/* Left: Bill Breakdown */}
                    <div className="md:col-span-12 lg:col-span-5 space-y-6">
                      <div className="p-8 rounded-[2.5rem] bg-muted/30 border border-border/50 h-full relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-1 gradient-bg" />
                        <h3 className="text-lg font-display font-bold mb-6 flex items-center gap-2">
                          <Package className="w-5 h-5 text-primary" /> Order Summary
                        </h3>
                        <div className="space-y-4">
                          <div className="flex justify-between items-center text-sm py-2 border-b border-dashed border-border/50">
                            <span className="text-muted-foreground">Date</span>
                            <span className="font-bold">{campaignData.startDate ? format(campaignData.startDate, 'PPP') : 'Not selected'}</span>
                          </div>
                          <div className="flex justify-between items-center text-sm py-2 border-b border-dashed border-border/50">
                            <span className="text-muted-foreground">Service</span>
                            <span className="font-bold">{selectedService.name}</span>
                          </div>

                          <div className="space-y-3 pt-4">
                            <div className="flex justify-between text-sm">
                              <span className="text-muted-foreground">Base Offer</span>
                              <span className="font-bold font-mono">₹{Number(campaignData.budget).toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-muted-foreground flex items-center gap-1">Platform Fee <span className="text-[9px] bg-primary/10 text-primary px-1.5 py-0.5 rounded-md font-bold">5%</span></span>
                              <span className="font-mono">₹{(Number(campaignData.budget) * 0.05).toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-muted-foreground flex items-center gap-1">GST <span className="text-[9px] bg-primary/10 text-primary px-1.5 py-0.5 rounded-md font-bold">18%</span></span>
                              <span className="font-mono">₹{(Number(campaignData.budget) * 0.18).toLocaleString()}</span>
                            </div>
                          </div>

                          <div className="pt-6 mt-6 border-t-2 border-dashed border-border/50 flex justify-between items-center">
                            <span className="text-lg font-bold">Total Pay</span>
                            <span className="text-3xl font-display font-bold text-primary">
                              ₹{(Number(campaignData.budget) * 1.23).toLocaleString(undefined, { maximumFractionDigits: 0 })}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Right: Payment Methods & Form */}
                    <div className="md:col-span-12 lg:col-span-7 space-y-6">
                      {/* Method Selection Horizontal */}
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        {paymentMethods.map((method) => (
                          <button
                            key={method.id}
                            onClick={() => setSelectedPaymentMethod(method.id)}
                            className={`p-4 rounded-2xl border-2 transition-all flex flex-col items-center gap-3 relative overflow-hidden group ${selectedPaymentMethod === method.id
                              ? 'border-primary bg-primary/5 shadow-xl shadow-primary/10 scale-105 z-10'
                              : 'border-border/50 hover:bg-muted/50 hover:border-border scale-100'
                              }`}
                          >
                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${selectedPaymentMethod === method.id ? 'bg-primary text-white' : 'bg-muted text-muted-foreground group-hover:bg-muted/80'
                              }`}>
                              <method.icon className="w-5 h-5" />
                            </div>
                            <span className={`text-[10px] font-black uppercase tracking-widest ${selectedPaymentMethod === method.id ? 'text-primary' : 'text-muted-foreground'
                              }`}>{method.name.split(' ')[0]}</span>

                            {selectedPaymentMethod === method.id && (
                              <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-primary animate-pulse" />
                            )}
                          </button>
                        ))}
                      </div>

                      <div className="p-8 rounded-[2.5rem] bg-muted/20 border border-border/50 min-h-[300px] flex flex-col justify-center">
                        {selectedPaymentMethod === 'card' && (
                          <div className="space-y-5 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <div>
                              <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Card Number</Label>
                              <div className="relative mt-1.5">
                                <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                                <Input placeholder="0000 0000 0000 0000" className="h-14 pl-12 rounded-2xl bg-card border-border/50 font-mono" />
                              </div>
                            </div>
                            <div className="grid grid-cols-2 gap-5">
                              <div>
                                <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Expiry</Label>
                                <Input placeholder="MM/YY" className="h-14 mt-1.5 rounded-2xl bg-card border-border/50 font-mono" />
                              </div>
                              <div>
                                <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">CVV</Label>
                                <div className="relative mt-1.5">
                                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                  <Input placeholder="123" type="password" className="h-14 pl-10 rounded-2xl bg-card border-border/50 font-mono" />
                                </div>
                              </div>
                            </div>
                            <div>
                              <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Name on Card</Label>
                              <Input placeholder="JOHN DOE" className="h-14 mt-1.5 rounded-2xl bg-card border-border/50 uppercase" />
                            </div>
                          </div>
                        )}
                        {/* Simplification for other methods for brevity, keeping UI consistent */}
                        {selectedPaymentMethod === 'upi' && (
                          <div className="text-center py-8 animate-in fade-in zoom-in duration-300">
                            <div className="w-20 h-20 bg-white rounded-2xl mx-auto mb-6 p-2 shadow-sm">
                              {/* QR Code Placeholder */}
                              <div className="w-full h-full bg-black pattern-dots" />
                            </div>
                            <p className="text-muted-foreground mb-6 font-medium">Scan QR or enter UPI ID</p>
                            <Input className="h-14 rounded-2xl bg-card border-border/50 text-center font-mono text-lg" placeholder="username@bank" />
                          </div>
                        )}
                        {selectedPaymentMethod === 'netbanking' && (
                          <div className="text-center py-10 animate-in fade-in zoom-in duration-300">
                            <Building2 className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
                            <p className="text-muted-foreground">Select your bank from the dropdown in the next step.</p>
                          </div>
                        )}
                        {selectedPaymentMethod === 'wallet' && (
                          <div className="text-center py-10 animate-in fade-in zoom-in duration-300">
                            <Wallet className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
                            <p className="text-muted-foreground">Redirecting to secure wallet gateway...</p>
                          </div>
                        )}
                      </div>

                      <div className="flex gap-4">
                        <Button
                          onClick={() => setPaymentStep(2)}
                          variant="outline"
                          className="flex-1 h-14 rounded-2xl text-[11px] font-black uppercase tracking-widest hover:bg-muted"
                        >
                          Back
                        </Button>
                        <Button
                          onClick={handleProcessPayment}
                          className="flex-1 h-14 gradient-bg border-0 rounded-2xl text-[11px] font-black uppercase tracking-widest shadow-xl shadow-primary/20 flex items-center justify-center gap-2 hover:scale-105 transition-transform"
                        >
                          <Lock className="w-4 h-4" /> Pay ₹{(Number(campaignData.budget) * 1.23).toLocaleString(undefined, { maximumFractionDigits: 0 })}
                        </Button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}


              {/* Step 4: Confirmation */}
              {paymentStep === 4 && selectedService && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-10 text-center"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                    className="w-32 h-32 rounded-full bg-green-500 mx-auto mb-8 flex items-center justify-center shadow-2xl shadow-green-500/30"
                  >
                    <Check className="w-16 h-16 text-white" strokeWidth={3} />
                  </motion.div>

                  <h2 className="text-4xl font-display font-bold mb-4">You're Booked!</h2>
                  <p className="text-lg text-muted-foreground mb-8">
                    Your request for <span className="font-bold text-primary">{selectedService.name}</span> with {inf.name} has been sent.
                  </p>

                  <div className="max-w-md mx-auto p-8 rounded-[2.5rem] bg-muted/30 border border-border/50 mb-8">
                    <div className="space-y-4 text-left">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Transaction ID</span>
                        <span className="font-mono font-bold">TXN{Date.now().toString().slice(-8)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Total Paid</span>
                        <span className="font-bold text-green-600">₹{(Number(campaignData.budget) * 1.23).toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Status</span>
                        <span className="px-3 py-1 rounded-full bg-green-500/10 text-green-600 text-xs font-black uppercase">Confirmed</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-sm text-muted-foreground mb-6">
                    A confirmation email has been sent to <span className="font-bold">{paymentData.email}</span>
                  </p>

                  <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                    <ShieldCheck className="w-4 h-4 text-green-500" />
                    <span>Secured by InfluMatch Payment Gateway</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

