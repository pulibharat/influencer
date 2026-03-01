import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Users, DollarSign, ExternalLink, MoreVertical, Search, Filter, CheckCircle2, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

interface Booking {
    id: string;
    creatorName: string;
    creatorAvatar: string;
    campaignName: string;
    platform: 'Instagram' | 'YouTube' | 'TikTok';
    status: 'In Progress' | 'Completed' | 'Delayed';
    startDate: string;
    endDate: string;
    payment: string;
    deliverables: string[];
}

const mockBookings: Booking[] = [
    {
        id: 'book-1',
        creatorName: 'Pavan Hari',
        creatorAvatar: '/creators/Pavan Hari.jpg',
        campaignName: 'Nexus X Launch',
        platform: 'YouTube',
        status: 'In Progress',
        startDate: 'Feb 10, 2026',
        endDate: 'Mar 15, 2026',
        payment: '₹2,50,000',
        deliverables: ['1 Unboxing Video', '1 Tech Review', '3 Social Stories']
    },
    {
        id: 'book-2',
        creatorName: 'Mehaboob',
        creatorAvatar: '/creators/mehaboob.jpg',
        campaignName: 'Summer Elite 2026',
        platform: 'Instagram',
        status: 'Completed',
        startDate: 'Jan 05, 2026',
        endDate: 'Jan 25, 2026',
        payment: '₹3,50,000',
        deliverables: ['5 High-Res Posts', '1 Reels Transition', 'Daily Stories']
    },
    {
        id: 'book-3',
        creatorName: 'Tarun Kumar',
        creatorAvatar: '/creators/tarun kumar.jpg',
        campaignName: 'Local Flavors Vizag',
        platform: 'Instagram',
        status: 'Delayed',
        startDate: 'Feb 15, 2026',
        endDate: 'Mar 01, 2026',
        payment: '₹1,20,000',
        deliverables: ['2 Restaurant Review Reels', '3 Food Stories']
    }
];

export default function BookingsPage() {
    const { user } = useAuth();
    const { toast } = useToast();
    const bookings = mockBookings;

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

    return (
        <div className="max-w-[1600px] mx-auto space-y-10 pb-20">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h1 className="text-4xl font-display font-bold tracking-tight mb-2">
                        {user?.role === 'client' ? 'Campaign Bookings' : 'My Active Campaigns'}
                    </h1>
                    <p className="text-muted-foreground text-lg">
                        Track and manage your {user?.role === 'client' ? 'active creator partnerships' : 'ongoing collaboration projects'}.
                    </p>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline" className="h-12 px-6 rounded-xl text-[11px] font-black uppercase tracking-widest gap-2">
                        <Filter className="w-4 h-4" /> Filter
                    </Button>
                    <Button className="gradient-bg border-0 h-12 px-8 rounded-xl text-[11px] font-black uppercase tracking-widest shadow-lg shadow-primary/20">
                        {user?.role === 'client' ? 'New Booking' : 'Export Calendar'}
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                {bookings.map((booking) => (
                    <motion.div
                        key={booking.id}
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        whileHover={{ y: -5 }}
                        className="glass-card overflow-hidden group border-border/40 hover:border-primary/20 transition-all duration-500"
                    >
                        <div className="p-8 space-y-8">
                            <div className="flex items-start justify-between">
                                <div className="flex items-center gap-5">
                                    <div className="w-16 h-16 rounded-2xl overflow-hidden shadow-xl shadow-black/5 group-hover:scale-105 transition-transform duration-500">
                                        <img src={booking.creatorAvatar} alt={booking.creatorName} className="w-full h-full object-cover" />
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-display font-bold tracking-tight group-hover:text-primary transition-colors">{booking.creatorName}</h3>
                                        <p className="text-xs font-black text-muted-foreground uppercase tracking-[0.2em]">{booking.campaignName}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Badge variant={booking.status === 'Completed' ? 'success' : booking.status === 'Delayed' ? 'destructive' : 'secondary'} className="uppercase tracking-widest text-[9px] font-black px-3 py-1.5">
                                        {booking.status}
                                    </Badge>
                                    <button className="p-2 hover:bg-muted/50 rounded-lg transition-colors"><MoreVertical className="w-5 h-5 text-muted-foreground" /></button>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 py-8 border-y border-border/50">
                                <div className="space-y-1.5">
                                    <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest leading-none flex items-center gap-2">
                                        <Calendar className="w-3 h-3" /> Timeline
                                    </p>
                                    <p className="text-[13px] font-bold text-foreground">{booking.startDate} - {booking.endDate}</p>
                                </div>
                                <div className="space-y-1.5">
                                    <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest leading-none flex items-center gap-2">
                                        <Users className="w-3 h-3" /> Platform
                                    </p>
                                    <p className="text-[13px] font-bold text-foreground">{booking.platform}</p>
                                </div>
                                <div className="space-y-1.5">
                                    <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest leading-none flex items-center gap-2">
                                        <DollarSign className="w-3 h-3" /> Payment
                                    </p>
                                    <p className="text-[13px] font-bold text-green-500">{booking.payment}</p>
                                </div>
                                <div className="space-y-1.5">
                                    <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest leading-none flex items-center gap-2">
                                        <CheckCircle2 className="w-3 h-3" /> Progress
                                    </p>
                                    <p className="text-[13px] font-bold text-foreground">{booking.status === 'Completed' ? '100%' : '45%'}</p>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Key Deliverables</p>
                                <div className="flex flex-wrap gap-2">
                                    {booking.deliverables.map((item, i) => (
                                        <span key={i} className="px-4 py-2 bg-muted/30 text-muted-foreground text-[11px] font-bold rounded-xl border border-border/40 hover:bg-white hover:text-primary hover:border-primary/20 transition-all cursor-default">
                                            {item}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div className="pt-2 flex flex-col sm:flex-row gap-4">
                                <Button
                                    onClick={() => handleManageCampaign(booking.campaignName)}
                                    className="flex-1 gradient-bg border-0 h-14 rounded-2xl text-[11px] font-black uppercase tracking-widest shadow-xl shadow-primary/10 hover:scale-105 transition-all"
                                >
                                    Manage Campaign
                                </Button>
                                <Button
                                    onClick={() => handleViewDossier(booking.creatorName)}
                                    variant="outline"
                                    className="flex-1 h-14 rounded-2xl text-[11px] font-black uppercase tracking-widest gap-2"
                                >
                                    View Dossier <ExternalLink className="w-4 h-4" />
                                </Button>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="glass-card p-12 bg-gradient-to-br from-primary/5 to-secondary/5 border-primary/20 relative overflow-hidden text-center">
                <div className="relative z-10 max-w-2xl mx-auto space-y-6">
                    <div className="w-20 h-20 rounded-3xl gradient-bg flex items-center justify-center mx-auto shadow-2xl shadow-primary/30 mb-8">
                        <Calendar className="w-10 h-10 text-white" />
                    </div>
                    <h2 className="text-4xl font-display font-bold tracking-tight">Need to automate your bookings?</h2>
                    <p className="text-muted-foreground font-medium text-lg leading-relaxed">
                        Our Neural Schedular can automatically manage your collaboration timeline and payment release cycles based on creator output verification.
                    </p>
                    <div className="pt-6">
                        <Button className="gradient-bg border-0 h-14 px-12 rounded-2xl text-[11px] font-black uppercase tracking-widest shadow-xl shadow-primary/20 hover:scale-105 transition-all">
                            Activate Neural Scheduler
                        </Button>
                    </div>
                </div>
                <div className="absolute top-0 right-0 p-20 opacity-5">
                    <Calendar className="w-64 h-64 text-primary" />
                </div>
            </div>
        </div>
    );
}
