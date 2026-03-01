import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { generateInfluencers, formatFollowers, type Influencer } from '@/data/mockData';
import { Search, MapPin, Star, Filter, Instagram, Youtube, ArrowUpRight, ShieldAlert, MessageSquare } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { motion } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';

const influencers = generateInfluencers();

const cities = ['All Cities', 'Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Chennai', 'Kolkata', 'Pune', 'Ahmedabad', 'Jaipur', 'Lucknow', 'Chandigarh', 'Kochi', 'Indore', 'Goa', 'Surat'];
const nicheOptions = ['All Niches', 'Fashion', 'Beauty', 'Fitness', 'Travel', 'Food', 'Tech', 'Lifestyle', 'Photography', 'Gaming', 'Education', 'Finance', 'Health', 'Parenting', 'Music', 'Comedy', 'Sports'];

export default function InfluencersPage() {
  const { toast } = useToast();
  const [search, setSearch] = useState('');
  const [city, setCity] = useState('All Cities');
  const [niche, setNiche] = useState('All Niches');

  const filtered = useMemo(() => {
    return influencers.filter(inf => {
      const matchSearch = inf.name.toLowerCase().includes(search.toLowerCase());
      const matchCity = city === 'All Cities' || inf.city === city;
      const matchNiche = niche === 'All Niches' || inf.niche === niche;
      return matchSearch && matchCity && matchNiche;
    });
  }, [search, city, niche]);

  const handleMessage = (e: React.MouseEvent, name: string) => {
    e.preventDefault();
    e.stopPropagation();
    toast({
      title: "Message Sent",
      description: `Your initial inquiry has been sent to ${name}.`,
      className: "bg-primary text-white border-none",
    });
  };

  return (
    <div className="max-w-[1600px] mx-auto">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold tracking-tight">Top Influencers</h1>
          <p className="text-sm text-muted-foreground font-medium">{filtered.length} creators matching your criteria</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-10 p-4 bg-muted/30 rounded-2xl border border-border/50">
        <div className="relative flex-1 group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
          <Input
            placeholder="Search by name or niche..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="pl-11 h-12 bg-background/50 border-none shadow-sm focus-visible:ring-1 focus-visible:ring-primary/20"
          />
        </div>
        <div className="flex flex-wrap gap-3">
          <Select value={city} onValueChange={setCity}>
            <SelectTrigger className="w-full sm:w-44 h-12 bg-background/50 border-none shadow-sm">
              <MapPin className="w-4 h-4 mr-2 text-primary" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {cities.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
            </SelectContent>
          </Select>
          <Select value={niche} onValueChange={setNiche}>
            <SelectTrigger className="w-full sm:w-44 h-12 bg-background/50 border-none shadow-sm">
              <Filter className="w-4 h-4 mr-2 text-primary" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {nicheOptions.map(n => <SelectItem key={n} value={n}>{n}</SelectItem>)}
            </SelectContent>
          </Select>
          <div className="flex items-center gap-2 px-4 h-12 bg-red-500/10 dark:bg-red-500/20 rounded-xl border border-red-500/20 transition-all hover:bg-red-500/20 cursor-help group relative">
            <ShieldAlert className="w-4 h-4 text-red-500" />
            <span className="text-[10px] font-black text-red-500 uppercase tracking-widest">Brand Safety</span>
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 w-64 p-4 glass-card bg-black/90 text-white text-[10px] font-bold leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
              <p className="mb-2">ADVANCED SAFETY ENGINE</p>
              <p className="text-white/60 font-medium">Instantly identifies controversial content or security risks and automatically alerts relevant authorities for brand protection.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filtered.map((inf, i) => (
          <motion.div
            key={inf.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: Math.min(i * 0.05, 0.4), duration: 0.5 }}
          >
            <div className="group block relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-muted shadow-lg hover:shadow-2xl transition-all duration-500">
              <Link to={`/dashboard/influencer/${inf.id}`} className="absolute inset-0">
                {/* Profile Image */}
                <img
                  src={inf.avatar}
                  alt={inf.name}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />

                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />

                {/* Top Details */}
                <div className="absolute top-4 left-4 right-4 flex justify-between items-start pointer-events-none">
                  <div className="flex items-center gap-1.5 bg-black/30 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
                    <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
                    <span className="text-xs font-bold text-white">{inf.rating}</span>
                  </div>
                  <div className="bg-primary/20 backdrop-blur-md px-3 py-1.5 rounded-full border border-primary/30">
                    <span className="text-[10px] font-black uppercase tracking-wider text-white">{inf.niche}</span>
                  </div>
                </div>

                {/* Bottom Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                  <div className="flex items-end justify-between gap-4 mb-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-display font-bold text-white mb-1 group-hover:text-primary transition-colors">{inf.name}</h3>
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1.5 text-white/70 text-sm">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                          <span className="font-bold">{formatFollowers(inf.followers)}</span>
                        </div>
                      </div>
                    </div>

                    {/* Social Icons Overlay */}
                    <div className="flex flex-col gap-2 pointer-events-none">
                      {inf.socialLinks.map((link, idx) => (
                        <div key={idx} className="w-8 h-8 rounded-lg bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center">
                          {link.platform.toLowerCase() === 'instagram' ? (
                            <Instagram className="w-4 h-4 text-white" />
                          ) : link.platform.toLowerCase() === 'youtube' ? (
                            <Youtube className="w-4 h-4 text-white" />
                          ) : null}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                    <div className="flex items-center gap-1.5 text-white/60 text-xs font-medium">
                      <MapPin className="w-3.5 h-3.5" />
                      {inf.city}
                    </div>
                    {/* View Profile label omitted as integrated with card link */}
                  </div>
                </div>
              </Link>

              {/* Floating Send Message Button */}
              <button
                onClick={(e) => handleMessage(e, inf.name)}
                className="absolute bottom-6 right-6 z-20 w-12 h-12 rounded-2xl gradient-bg shadow-xl shadow-primary/30 flex items-center justify-center text-white scale-0 group-hover:scale-100 transition-all duration-300 hover:scale-110 active:scale-95 translate-y-12 group-hover:translate-y-0"
              >
                <MessageSquare className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
