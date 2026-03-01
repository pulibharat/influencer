import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Instagram, Youtube, Twitter, Star, ArrowUpRight } from 'lucide-react';

const creators = [
  {
    id: 'ravi-mantri',
    name: 'Ravi Mantri',
    category: 'Comedy',
    followers: '2.1M+',
    image: '/creators/ravi-mantri.jpg',
    platform: Youtube,
    rating: 4.9,
    color: 'from-cyan-500/10 to-blue-500/10'
  },
  {
    id: 'bangkok-pilla',
    name: 'Bangkok Pilla',
    category: 'Travel',
    followers: '1.5M+',
    image: '/creators/bangkok-pilla.jpg',
    platform: Instagram,
    rating: 4.8,
    color: 'from-emerald-500/10 to-teal-500/10'
  },
  {
    id: 'sudheer-sudheer',
    name: 'Sudigali Sudheer',
    category: 'Comedy',
    followers: '5.2M+',
    image: '/creators/sudheer.jpg',
    platform: Instagram,
    rating: 5.0,
    color: 'from-purple-500/10 to-pink-500/10'
  },
  {
    id: 'demon-pavan',
    name: 'Demon Pavan',
    category: 'Fashion',
    followers: '850K+',
    image: '/creators/demon-pavan.webp',
    platform: Youtube,
    rating: 4.7,
    color: 'from-orange-500/10 to-red-500/10'
  }
];

export function FeaturedInfluencers() {
  return (
    <section className="py-32 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="w-12 h-[2px] bg-primary rounded-full" />
              <span className="text-xs font-black text-primary uppercase tracking-[0.4em]">Elite Creators</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-display font-bold tracking-tight">Vetted Talent <br /> <span className="gradient-text italic">Ready to Scale</span></h2>
          </motion.div>
          <motion.p
            className="text-muted-foreground max-w-sm text-lg leading-relaxed font-medium"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            Collaborate with creators who have a proven track record of driving massive engagement and ROI.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {creators.map((creator, i) => (
            <motion.div
              key={i}
              className="group relative"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
            >
              <div className="glass-card overflow-hidden glass-card-hover border-transparent hover:border-primary/20 bg-gray-50/50 dark:bg-muted/10">
                <div className="relative aspect-[3/4] overflow-hidden">
                  <img
                    src={creator.image}
                    alt={creator.name}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent" />

                  <div className="absolute inset-0 p-8 flex flex-col justify-end">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="bg-white dark:bg-card p-2 rounded-xl border border-border shadow-sm">
                        <creator.platform className="w-4 h-4 text-primary" />
                      </div>
                      <div className="bg-white/80 dark:bg-card/80 backdrop-blur-md px-3 py-1 rounded-full border border-border/50 flex items-center gap-1.5">
                        <Star className="w-3 h-3 text-primary fill-primary" />
                        <span className="text-[10px] font-black uppercase tracking-wider">{creator.rating}</span>
                      </div>
                    </div>
                    <p className="text-[10px] font-bold text-primary uppercase tracking-[0.3em] mb-1">{creator.category}</p>
                    <h3 className="text-2xl font-display font-bold mb-4">{creator.name}</h3>

                    <div className="flex items-center justify-between pt-4 border-t border-border/50 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                      <div>
                        <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest leading-none mb-1.5">Audience</p>
                        <p className="text-sm font-black">{creator.followers}</p>
                      </div>
                      <Link
                        to={`/dashboard/influencer/${creator.id}`}
                        className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-primary hover:text-primary/70 transition-colors group/btn"
                      >
                        Profile <ArrowUpRight className="w-3 h-3 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
