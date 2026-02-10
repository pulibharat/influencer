import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { generateInfluencers, formatFollowers, type Influencer } from '@/data/mockData';
import { Search, MapPin, Star, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { motion } from 'framer-motion';

const influencers = generateInfluencers();

const cities = ['All Cities', 'Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Chennai', 'Kolkata', 'Pune', 'Ahmedabad', 'Jaipur', 'Lucknow', 'Chandigarh', 'Kochi', 'Indore', 'Goa', 'Surat'];
const nicheOptions = ['All Niches', 'Fashion', 'Beauty', 'Fitness', 'Travel', 'Food', 'Tech', 'Lifestyle', 'Photography', 'Gaming', 'Education', 'Finance', 'Health', 'Parenting', 'Music', 'Comedy', 'Sports'];

export default function InfluencersPage() {
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

  return (
    <div>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-display font-bold">Influencers</h1>
          <p className="text-sm text-muted-foreground">{filtered.length} influencers found</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Search by name..." value={search} onChange={e => setSearch(e.target.value)} className="pl-10" />
        </div>
        <Select value={city} onValueChange={setCity}>
          <SelectTrigger className="w-full sm:w-48">
            <MapPin className="w-4 h-4 mr-2 text-muted-foreground" />
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {cities.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
          </SelectContent>
        </Select>
        <Select value={niche} onValueChange={setNiche}>
          <SelectTrigger className="w-full sm:w-48">
            <Filter className="w-4 h-4 mr-2 text-muted-foreground" />
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {nicheOptions.map(n => <SelectItem key={n} value={n}>{n}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filtered.map((inf, i) => (
          <motion.div
            key={inf.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: Math.min(i * 0.03, 0.5) }}
          >
            <Link to={`/dashboard/influencer/${inf.id}`} className="block glass-card overflow-hidden hover-lift group">
              <div className="h-20 gradient-bg relative">
                <img
                  src={inf.avatar}
                  alt={inf.name}
                  className="w-16 h-16 rounded-full border-4 border-card absolute -bottom-8 left-4 object-cover"
                />
              </div>
              <div className="pt-10 pb-4 px-4">
                <h3 className="font-semibold text-sm group-hover:text-primary transition-colors">{inf.name}</h3>
                <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                  <MapPin className="w-3 h-3" />{inf.city}
                </div>
                <div className="flex items-center justify-between mt-3">
                  <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-primary/10 text-primary">{inf.niche}</span>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span className="font-semibold text-foreground">{formatFollowers(inf.followers)}</span>
                    <span className="flex items-center gap-0.5"><Star className="w-3 h-3 fill-amber-400 text-amber-400" />{inf.rating}</span>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
