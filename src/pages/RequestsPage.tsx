import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, Clock, ArrowUpRight, MessageSquare, Send, CheckCircle2, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';

interface Message {
    id: string;
    sender: string;
    text: string;
    time: string;
}

interface CollaborationRequest {
    id: string;
    senderName: string;
    senderAvatar: string;
    projectName: string;
    budget: string;
    status: 'pending' | 'accepted' | 'rejected';
    timestamp: string;
    description: string;
    coverImage?: string;
    chatHistory: Message[];
}

const mockRequests: CollaborationRequest[] = [
    {
        id: 'req-1',
        senderName: 'Demon Pavan',
        senderAvatar: '/creators/demon-pavan-chat.jpg',
        projectName: 'Handcrafted Banarasi Saree Collection',
        budget: '₹75,000',
        status: 'pending',
        timestamp: '2 hours ago',
        coverImage: 'https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=800&q=80',
        description: 'I would love to showcase my latest collection of authentic Banarasi sarees through your platform. Your style perfectly complements our heritage weaves.',
        chatHistory: [
            { id: 'm1', sender: 'Demon Pavan', text: 'Namaste! I saw your profile and loved how you carry traditional wear.', time: '10:00 AM' },
            { id: 'm2', sender: 'Influencer', text: 'Thank you Demon Pavan! I really appreciate the craftsmanship of Banarasi weaves.', time: '10:15 AM' },
            { id: 'm3', sender: 'Demon Pavan', text: 'We are launching a new collection next month. Would you be interested in a reel collaboration?', time: '11:00 AM' }
        ]
    },
    {
        id: 'req-2',
        senderName: 'Naa Anvesana',
        senderAvatar: '/creators/naa-anvesana-chat.jpg',
        projectName: 'G दादी Homemade Traditional Pickles',
        budget: '₹45,000',
        status: 'accepted',
        timestamp: '1 day ago',
        description: 'Authentic Andhra-style pickles made with love. We are looking for influencers who appreciate traditional flavors and homemade goodness.',
        chatHistory: [
            { id: 'm1', sender: 'Naa Anvesana', text: 'Hi! We make pickles using our grandmother\'s recipe.', time: 'Yesterday' },
            { id: 'm2', sender: 'Influencer', text: 'That sounds delicious! I love authentic home flavors.', time: 'Yesterday' },
            { id: 'm3', sender: 'Naa Anvesana', text: 'The Gongura and Avakaya are our bestsellers. I will send samples!', time: 'Yesterday' }
        ]
    },
    {
        id: 'req-3',
        senderName: 'Yashoda',
        senderAvatar: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=400&h=400&fit=crop',
        projectName: 'Vibrant Ethnic Fusion Wear',
        budget: '₹1,20,000',
        status: 'rejected',
        timestamp: '3 days ago',
        description: 'Our new festive line blends modern silhouettes with traditional Indian embroidery. Would love to collaborate on a series of reels.',
        chatHistory: [
            { id: 'm1', sender: 'Yashoda', text: 'Hello! Your fusion wear looks are exactly what we are looking for.', time: '3 days ago' }
        ]
    },
    {
        id: 'req-4',
        senderName: 'Abhigna Reddy',
        senderAvatar: '/creators/abhigna-reddy-chat.jpg',
        projectName: 'Jaipur Block Print Cotton Fabric',
        budget: '₹55,000',
        status: 'pending',
        timestamp: '4 hours ago',
        description: 'Launching a new line of sustainable, hand-block printed cotton fabrics from Jaipur. Seeking influencers for honest reviews and styling tips.',
        chatHistory: [
            { id: 'm1', sender: 'Abhigna Reddy', text: 'Hi! We support local artisans in Jaipur.', time: '4 hours ago' }
        ]
    },
    {
        id: 'req-5',
        senderName: 'Kavya',
        senderAvatar: 'https://images.unsplash.com/photo-1599643477877-530eb83abc8e?w=200&h=200&fit=crop',
        projectName: 'Temple Jewelry & Antique Accessories',
        budget: '₹85,000',
        status: 'pending',
        timestamp: '5 hours ago',
        description: 'Exquisite temple jewelry designs for the upcoming wedding season. Let\'s create some stunning looks together!',
        chatHistory: [
            { id: 'm1', sender: 'Kavya', text: 'Namaste! Are you available for a jewelry campaign next week?', time: '5 hours ago' }
        ]
    }
];

export default function RequestsPage() {
    const { user } = useAuth();
    const { toast } = useToast();
    const [requests, setRequests] = useState(mockRequests);
    const [filter, setFilter] = useState<'all' | 'pending' | 'accepted' | 'rejected'>('all');
    const [selectedRequest, setSelectedRequest] = useState<CollaborationRequest | null>(null);
    const [isChatOpen, setIsChatOpen] = useState(false);

    const [isDetailsOpen, setIsDetailsOpen] = useState(false);

    const handleAction = (id: string, newStatus: 'accepted' | 'rejected', senderName: string) => {
        setRequests(prev => prev.map(req => req.id === id ? { ...req, status: newStatus } : req));

        if (newStatus === 'accepted') {
            toast({
                title: "Request Accepted!",
                description: `A message has been sent to ${senderName} confirming your interest.`,
                className: "bg-green-500 text-white border-none",
            });
        } else {
            toast({
                title: "Request Declined",
                description: `You have declined the request from ${senderName}.`,
                variant: "destructive",
            });
        }
    };

    const openChat = (req: CollaborationRequest) => {
        setSelectedRequest(req);
        setIsChatOpen(true);
    };

    const openDetails = (req: CollaborationRequest) => {
        setSelectedRequest(req);
        setIsDetailsOpen(true);
    };

    const handleManageCampaign = (name: string) => {
        toast({
            title: "Campaign Management",
            description: `Now opening the dashboard for the ${name} campaign.`,
            className: "bg-primary text-white border-none",
        });
    };

    const handleViewDossier = (name: string) => {
        toast({
            title: "Creator Dossier",
            description: `Fetching detailed performance portfolio for ${name}...`,
            className: "bg-secondary text-white border-none",
        });
    };

    const filteredRequests = requests.filter(req => filter === 'all' || req.status === filter);

    return (
        <div className="max-w-6xl mx-auto space-y-8 pb-20">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h1 className="text-4xl font-display font-bold tracking-tight mb-2">
                        {user?.role === 'influencer' ? 'Collaboration Requests' : 'Sent Invitations'}
                    </h1>
                    <p className="text-muted-foreground text-lg">
                        Manage your {user?.role === 'influencer' ? 'incoming' : 'outgoing'} partnerships and collaboration offers.
                    </p>
                </div>
                <div className="flex items-center gap-2 p-1 bg-muted/30 rounded-xl border border-border/50">
                    {(['all', 'pending', 'accepted', 'rejected'] as const).map((f) => (
                        <button
                            key={f}
                            onClick={() => setFilter(f)}
                            className={`px-4 py-2 text-xs font-bold uppercase tracking-widest rounded-lg transition-all ${filter === f ? 'bg-white dark:bg-card text-primary shadow-sm' : 'text-muted-foreground hover:text-foreground'
                                }`}
                        >
                            {f}
                        </button>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 gap-6">
                <AnimatePresence mode="popLayout">
                    {filteredRequests.map((req) => (
                        <motion.div
                            key={req.id}
                            layout
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="glass-card p-6 md:p-8 flex flex-col md:flex-row gap-8 relative group overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 p-6 flex gap-2">
                                <Badge variant="outline" className="text-[9px] font-bold uppercase tracking-widest bg-orange-500/10 text-orange-600 border-orange-500/20">
                                    Heritage
                                </Badge>
                                <Badge variant={req.status === 'accepted' ? 'success' : req.status === 'rejected' ? 'destructive' : 'secondary'} className="uppercase tracking-widest text-[10px] font-black px-3 py-1">
                                    {req.status}
                                </Badge>
                            </div>

                            <div className="shrink-0 flex md:flex-col items-center gap-4">
                                <div className="w-16 h-16 rounded-2xl overflow-hidden ring-4 ring-muted/20">
                                    <img src={req.senderAvatar} alt={req.senderName} className="w-full h-full object-cover" />
                                </div>
                                <div className="md:text-center text-left">
                                    <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest leading-none mb-1">Budget</p>
                                    <p className="text-sm font-bold text-foreground">{req.budget}</p>
                                </div>
                            </div>

                            <div className="flex-1 space-y-4">
                                <div>
                                    <h3 className="text-xl font-display font-bold tracking-tight mb-1">{req.projectName}</h3>
                                    <div className="flex items-center gap-2 text-sm text-primary font-bold">
                                        <span>{req.senderName}</span>
                                        <Badge variant="outline" className="text-[10px] font-bold">Local Brand</Badge>
                                    </div>
                                </div>
                                <p className="text-muted-foreground text-sm leading-relaxed max-w-2xl italic">
                                    "{req.description}"
                                </p>
                                <div className="flex items-center gap-6 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">
                                    <span className="flex items-center gap-2"><Clock className="w-3 h-3" /> {req.timestamp}</span>
                                    <span
                                        onClick={() => openChat(req)}
                                        className="flex items-center gap-2 text-primary cursor-pointer hover:underline hover:scale-105 transition-all"
                                    >
                                        <MessageSquare className="w-3 h-3" /> View Chat History
                                    </span>
                                </div>
                            </div>

                            {user?.role === 'influencer' && req.status === 'pending' && (
                                <div className="flex flex-col sm:flex-row md:flex-col justify-center gap-3 shrink-0">
                                    <Button
                                        onClick={() => handleAction(req.id, 'accepted', req.senderName)}
                                        className="gradient-bg border-0 text-[11px] font-black uppercase tracking-widest h-11 px-8 rounded-xl shadow-lg shadow-primary/20 hover:scale-105 transition-all"
                                    >
                                        Accept Offer
                                    </Button>
                                    <Button
                                        onClick={() => handleAction(req.id, 'rejected', req.senderName)}
                                        variant="outline"
                                        className="text-[11px] font-black uppercase tracking-widest h-11 px-8 rounded-xl hover:bg-destructive/10 hover:text-destructive hover:border-destructive/20 transition-all"
                                    >
                                        Decline
                                    </Button>
                                </div>
                            )}

                            {req.status !== 'pending' && (
                                <div className="flex flex-col sm:flex-row md:flex-col justify-center gap-3 shrink-0">
                                    <Button
                                        onClick={() => handleManageCampaign(req.projectName)}
                                        className="gradient-bg border-0 text-[11px] font-black uppercase tracking-widest h-11 px-6 rounded-xl shadow-lg shadow-primary/20 hover:scale-105 transition-all"
                                    >
                                        Manage Campaign
                                    </Button>
                                    <Button
                                        onClick={() => openDetails(req)}
                                        variant="ghost"
                                        className="w-full gap-3 text-[11px] font-bold uppercase tracking-widest text-muted-foreground hover:text-primary transition-all"
                                    >
                                        View Details <ArrowUpRight className="w-4 h-4" />
                                    </Button>
                                </div>
                            )}
                        </motion.div>
                    ))}
                </AnimatePresence>

                {filteredRequests.length === 0 && (
                    <div className="py-20 text-center glass-card bg-muted/10 border-dashed">
                        <Bell className="w-12 h-12 text-muted-foreground stroke-[1] mx-auto mb-4 opacity-20" />
                        <p className="text-xl font-display font-bold text-muted-foreground">No requests found</p>
                        <p className="text-sm text-muted-foreground/60 mt-2">Check back later for new opportunities.</p>
                    </div>
                )}
            </div>

            {/* Campaign Details Modal */}
            <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
                <DialogContent className="sm:max-w-2xl p-0 overflow-hidden border-border/50">
                    <div className="relative h-64 overflow-hidden">
                        {selectedRequest?.coverImage ? (
                            <img src={selectedRequest.coverImage} alt="Campaign Cover" className="w-full h-full object-cover" />
                        ) : (
                            <div className="w-full h-full gradient-bg" />
                        )}
                        <div className="absolute inset-0 bg-black/40 flex flex-col justify-end p-8">
                            <h2 className="text-3xl font-display font-bold tracking-tight text-white">{selectedRequest?.projectName}</h2>
                            <p className="text-white/80 text-sm font-bold uppercase tracking-widest mt-1">{selectedRequest?.senderName} • Indian Heritage</p>
                        </div>
                    </div>
                    <div className="p-8 space-y-8">
                        <div className="grid grid-cols-2 gap-8 py-6 border-b border-border/50">
                            <div>
                                <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-1">Budget</p>
                                <p className="text-xl font-bold text-green-600">{selectedRequest?.budget}</p>
                            </div>
                            <div>
                                <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-1">Collaboration Date</p>
                                <p className="text-lg font-bold">March 15 - April 10</p>
                            </div>
                            <div>
                                <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-1">Location / City</p>
                                <p className="text-lg font-bold">Hyderabad, Telangana</p>
                            </div>
                            <div>
                                <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-1">Primary Platform</p>
                                <p className="text-lg font-bold">Instagram Reels</p>
                            </div>
                        </div>
                        <div className="space-y-4">
                            <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Project Brief</p>
                            <p className="text-sm text-muted-foreground leading-relaxed italic">"{selectedRequest?.description}"</p>
                        </div>
                        <div className="flex gap-4">
                            <Button onClick={() => setIsDetailsOpen(false)} variant="outline" className="flex-1 h-12 text-[11px] font-black uppercase tracking-widest">Close</Button>
                            <Button
                                onClick={() => handleViewDossier(selectedRequest?.senderName || '')}
                                className="flex-1 gradient-bg border-0 h-12 text-[11px] font-black uppercase tracking-widest shadow-lg shadow-primary/20"
                            >
                                View Dossier
                            </Button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>

            {/* Chat History Modal */}
            <Dialog open={isChatOpen} onOpenChange={setIsChatOpen}>
                <DialogContent className="sm:max-w-2xl p-0 overflow-hidden border-border/50">
                    <DialogHeader className="p-6 gradient-bg text-white">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full border-2 border-white/20 overflow-hidden">
                                <img src={selectedRequest?.senderAvatar} alt={selectedRequest?.senderName} className="w-full h-full object-cover" />
                            </div>
                            <div>
                                <DialogTitle className="text-xl font-display font-bold tracking-tight text-white">{selectedRequest?.senderName}</DialogTitle>
                                <p className="text-white/70 text-xs font-bold uppercase tracking-widest">{selectedRequest?.projectName}</p>
                            </div>
                        </div>
                    </DialogHeader>

                    <div className="h-[400px] overflow-y-auto p-6 space-y-4 bg-muted/5">
                        {selectedRequest?.chatHistory.map((msg) => (
                            <div
                                key={msg.id}
                                className={`flex flex-col ${msg.sender === 'Influencer' ? 'items-end' : 'items-start'}`}
                            >
                                <div className={`max-w-[80%] p-4 rounded-2xl text-sm font-medium ${msg.sender === 'Influencer'
                                    ? 'bg-primary text-white rounded-tr-none shadow-lg shadow-primary/20'
                                    : 'bg-white dark:bg-card border border-border/50 rounded-tl-none shadow-sm'
                                    }`}>
                                    {msg.text}
                                </div>
                                <span className="text-[10px] font-bold text-muted-foreground/50 mt-1 uppercase tracking-widest px-1">
                                    {msg.time}
                                </span>
                            </div>
                        ))}
                    </div>

                    <div className="p-4 border-t border-border/50 bg-white dark:bg-card flex gap-3">
                        <Input
                            id="chat-input"
                            placeholder="Type a message to the client..."
                            className="bg-muted/30 border-0 h-12 rounded-xl focus-visible:ring-1 focus-visible:ring-primary/20"
                        />
                        <Button
                            onClick={() => {
                                const input = document.getElementById('chat-input') as HTMLInputElement;
                                if (input?.value.trim()) {
                                    toast({
                                        title: "Message Sent!",
                                        description: "Your message has been delivered to the client.",
                                        className: "bg-primary text-white border-none",
                                    });
                                    input.value = '';
                                }
                            }}
                            className="h-12 w-12 rounded-xl gradient-bg p-0 shrink-0 shadow-lg shadow-primary/20"
                        >
                            <Send className="w-5 h-5" />
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}
