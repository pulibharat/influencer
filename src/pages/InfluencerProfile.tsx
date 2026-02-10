import { useParams, Link } from 'react-router-dom';
import { generateInfluencers, formatFollowers } from '@/data/mockData';
import { ArrowLeft, MapPin, Star, Globe, Instagram, Youtube, Twitter, Send, Mail, Users, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const influencers = generateInfluencers();

export default function InfluencerProfile() {
  const { id } = useParams();
  const inf = influencers.find(i => i.id === id);

  if (!inf) return <div className="text-center py-20"><p>Influencer not found</p><Link to="/dashboard/influencers" className="text-primary">← Back</Link></div>;

  const platformIcon = (p: string) => {
    if (p === 'Instagram') return <Instagram className="w-4 h-4" />;
    if (p === 'YouTube') return <Youtube className="w-4 h-4" />;
    return <Twitter className="w-4 h-4" />;
  };

  return (
    <div className="max-w-5xl mx-auto">
      <Link to="/dashboard/influencers" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-4 transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back to Influencers
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left sidebar */}
        <motion.div
          className="glass-card p-6 text-center"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <img src={inf.avatar} alt={inf.name} className="w-28 h-28 rounded-full mx-auto mb-4 border-4 border-primary/20" />
          <h1 className="text-xl font-display font-bold">{inf.name}</h1>
          <div className="flex items-center justify-center gap-1 text-sm text-muted-foreground mt-1">
            <MapPin className="w-4 h-4" />{inf.city}
          </div>
          <div className="flex items-center justify-center gap-1 mt-2">
            <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
            <span className="font-semibold">{inf.rating}</span>
            <span className="text-xs text-muted-foreground">({inf.reviews.length} reviews)</span>
          </div>

          <div className="grid grid-cols-2 gap-3 mt-6">
            <div className="p-3 rounded-lg bg-muted/50 text-center">
              <p className="text-lg font-bold">{formatFollowers(inf.followers)}</p>
              <p className="text-xs text-muted-foreground">Followers</p>
            </div>
            <div className="p-3 rounded-lg bg-muted/50 text-center">
              <p className="text-lg font-bold">{inf.pastBrands.length}</p>
              <p className="text-xs text-muted-foreground">Brands</p>
            </div>
          </div>

          <div className="flex gap-2 mt-6">
            {inf.socialLinks.map(link => (
              <a key={link.platform} href={link.url} className="flex-1 p-2 rounded-lg border border-border hover:border-primary/50 hover:bg-primary/5 transition-all flex flex-col items-center gap-1">
                {platformIcon(link.platform)}
                <span className="text-xs text-muted-foreground">{link.handle}</span>
              </a>
            ))}
          </div>
        </motion.div>

        {/* Main content */}
        <motion.div
          className="lg:col-span-2 space-y-6"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <div className="glass-card p-6">
            <h2 className="font-display font-semibold mb-3">About</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">{inf.bio}</p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
              {[
                { label: 'Niche', value: inf.niche, icon: Heart },
                { label: 'Audience', value: inf.audienceType, icon: Users },
                { label: 'Region', value: inf.region, icon: MapPin },
                { label: 'Languages', value: inf.languages.join(', '), icon: Globe },
              ].map((item, i) => (
                <div key={i} className="p-3 rounded-lg border border-border">
                  <div className="flex items-center gap-1 mb-1">
                    <item.icon className="w-3 h-3 text-primary" />
                    <span className="text-xs text-muted-foreground">{item.label}</span>
                  </div>
                  <p className="text-sm font-medium">{item.value}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-card p-6">
            <h2 className="font-display font-semibold mb-3">Past Brand Collaborations</h2>
            <div className="flex flex-wrap gap-3">
              {inf.pastBrands.map(brand => (
                <span key={brand} className="px-4 py-2 rounded-lg bg-muted/50 text-sm font-medium">{brand}</span>
              ))}
            </div>
          </div>

          <div className="glass-card p-6">
            <h2 className="font-display font-semibold mb-4">Reviews</h2>
            <div className="space-y-4">
              {inf.reviews.map((review, i) => (
                <div key={i} className="p-4 rounded-lg border border-border">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">{review.clientName}</span>
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                      <span className="text-sm">{review.rating}</span>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">{review.comment}</p>
                  <p className="text-xs text-muted-foreground mt-2">{review.date}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-3">
            <Button className="flex-1 gradient-bg border-0 gap-2">
              <Send className="w-4 h-4" /> Send Collaboration Request
            </Button>
            <Button variant="outline" className="flex-1 gap-2">
              <Mail className="w-4 h-4" /> Send Email
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
