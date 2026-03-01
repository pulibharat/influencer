import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cpu, Search, Sparkles, Zap, Target, BarChart3, Users, Instagram, Youtube, MapPin, ArrowRight, Star } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { generateInfluencers, type Influencer } from '@/data/mockData';
import { Link } from 'react-router-dom';

const influencers = generateInfluencers();

const examplePrompts = [
    "Fitness influencers in Hyderabad with high engagement",
    "Fashion creators focusing on traditional wear",
    "Telugu food vlogs for restaurant promotion",
    "Comedy creators for viral brand campaign",
    "Travel vloggers from Hyderabad for resort stay"
];

export default function AIMatchingPage() {
    const [query, setQuery] = useState('');
    const [isMatching, setIsMatching] = useState(false);
    const [results, setResults] = useState<Influencer[]>([]);
    const [hasSearched, setHasSearched] = useState(false);

    const performMatch = () => {
        if (!query) return;
        setIsMatching(true);
        setHasSearched(false);

        // Simulate Neural Processing
        setTimeout(() => {
            const searchTerms = query.toLowerCase().split(' ').filter(t => t.length > 2);

            // Improved Relevancy Algorithm
            const scored = influencers.map(inf => {
                let score = 0;
                const searchableText = `${inf.name} ${inf.niche} ${inf.city} ${inf.bio}`.toLowerCase();

                searchTerms.forEach(term => {
                    if (inf.niche.toLowerCase().includes(term)) score += 10;
                    if (inf.city.toLowerCase().includes(term)) score += 8;
                    if (searchableText.includes(term)) score += 2;
                });

                // Calculate percentage match
                const matchScore = searchTerms.length > 0
                    ? Math.min(Math.round((score / (searchTerms.length * 5)) * 100), 100)
                    : 0;

                return { ...inf, matchScore };
            })
                .filter(inf => (inf as any).matchScore > 10)
                .sort((a, b) => (b as any).matchScore - (a as any).matchScore)
                .slice(0, 4);

            setResults(scored);
            setIsMatching(false);
            setHasSearched(true);
        }, 2500);
    };

    return (
        <div className="max-w-[1400px] mx-auto space-y-12 pb-32">
            <div className="text-center space-y-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20"
                >
                    <Cpu className="w-4 h-4 text-primary" />
                    <span className="text-[10px] font-black text-primary uppercase tracking-[0.3em]">Neural Engine v4.2</span>
                </motion.div>
                <h1 className="text-5xl md:text-6xl font-display font-bold tracking-tight">AI Matching Engine</h1>
                <p className="text-muted-foreground text-lg max-w-2xl mx-auto font-medium">
                    Our quantum-trained models analyze millions of data points to find the <span className="text-foreground">perfect genetic match</span> for your brand.
                </p>
            </div>

            <div className="glass-card p-12 bg-gradient-to-br from-primary/5 to-secondary/5 border-primary/10 relative overflow-hidden group">
                <div className="absolute -right-20 -top-20 w-80 h-80 bg-primary/10 blur-[100px] rounded-full group-hover:bg-primary/20 transition-all duration-1000" />
                <div className="flex flex-col gap-8 relative z-10">
                    <div className="space-y-6">
                        <div className="flex items-center justify-between">
                            <label className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground">Neural Search Query</label>
                            <div className="flex gap-2">
                                {['Accuracy: High', 'Latency: 240ms', 'Safety: Active'].map(t => (
                                    <span key={t} className="text-[8px] font-bold text-white/40 bg-white/5 px-2 py-0.5 rounded uppercase tracking-widest">{t}</span>
                                ))}
                            </div>
                        </div>

                        <div className="flex flex-col md:flex-row gap-4">
                            <div className="relative flex-1 group">
                                <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-muted-foreground group-focus-within:text-primary transition-colors" />
                                <Input
                                    placeholder="Describe your ideal creator or campaign goals..."
                                    className="h-20 pl-16 text-xl bg-background/50 border-border/50 shadow-2xl focus-visible:ring-primary/20 transition-all rounded-[2rem]"
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && performMatch()}
                                />
                            </div>
                            <Button
                                onClick={performMatch}
                                disabled={isMatching || !query}
                                className="h-20 px-12 gradient-bg border-none text-xl font-bold rounded-[2rem] shadow-2xl hover:scale-105 active:scale-95 transition-all min-w-[200px]"
                            >
                                {isMatching ? (
                                    <div className="flex items-center gap-3">
                                        <div className="w-5 h-5 border-3 border-white/30 border-t-white rounded-full animate-spin" />
                                        Analyzing...
                                    </div>
                                ) : (
                                    <>
                                        Run Match <Sparkles className="ml-3 w-5 h-5 fill-white" />
                                    </>
                                )}
                            </Button>
                        </div>

                        <div className="flex flex-wrap gap-2 pt-2">
                            <span className="text-[10px] font-black uppercase text-muted-foreground py-2 mr-2">Try Examples:</span>
                            {examplePrompts.map((p) => (
                                <button
                                    key={p}
                                    onClick={() => setQuery(p)}
                                    className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 hover:border-primary/30 hover:bg-primary/5 text-[11px] font-bold transition-all text-muted-foreground hover:text-primary"
                                >
                                    {p}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <AnimatePresence mode="wait">
                {isMatching ? (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="py-20 flex flex-col items-center justify-center space-y-8"
                    >
                        <div className="relative">
                            <div className="w-24 h-24 rounded-3xl border-4 border-primary/20 border-t-primary animate-spin" />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <Cpu className="w-8 h-8 text-primary animate-pulse" />
                            </div>
                        </div>
                        <div className="text-center space-y-2">
                            <h3 className="text-2xl font-display font-bold tracking-tight">Neural Cross-Referencing</h3>
                            <p className="text-muted-foreground font-medium animate-pulse">Scanning 100k+ profiles for optimal sentiment scores...</p>
                        </div>
                    </motion.div>
                ) : hasSearched && results.length > 0 ? (
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-8"
                    >
                        <div className="flex items-center justify-between">
                            <h2 className="text-3xl font-display font-bold tracking-tight">Top AI Seed Matches ({results.length})</h2>
                            <div className="h-px flex-1 mx-8 bg-gradient-to-r from-border to-transparent" />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {results.map((inf, i) => (
                                <motion.div
                                    key={inf.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    className="group"
                                >
                                    <Link to={`/dashboard/influencer/${inf.id}`} className="block glass-card overflow-hidden hover:border-primary/20 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl">
                                        <div className="aspect-[4/3] relative overflow-hidden">
                                            <img src={inf.avatar} alt={inf.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                                            <div className="absolute top-4 left-4 p-2 bg-white/10 backdrop-blur-md rounded-xl border border-white/20">
                                                <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                                            </div>
                                            <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                                                <div>
                                                    <p className="text-white font-bold tracking-tight">{inf.name}</p>
                                                    <div className="flex items-center gap-1.5 text-[10px] text-white/60 font-medium">
                                                        <MapPin className="w-3 h-3" /> {inf.city}
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <p className="text-white font-black text-xs uppercase tracking-widest">{inf.niche}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="p-5 flex items-center justify-between bg-muted/30">
                                            <div className="flex gap-4">
                                                <Instagram className="w-4 h-4 text-muted-foreground hover:text-pink-500 transition-colors" />
                                                <Youtube className="w-4 h-4 text-muted-foreground hover:text-red-500 transition-colors" />
                                            </div>
                                            <span className="text-[10px] font-black uppercase text-primary tracking-widest flex items-center gap-1.5">
                                                View Profile <ArrowRight className="w-3 h-3" />
                                            </span>
                                        </div>
                                    </Link>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                ) : hasSearched && results.length === 0 ? (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="py-20 text-center space-y-4 glass-card border-dashed border-2"
                    >
                        <Search className="w-12 h-12 text-muted-foreground mx-auto opacity-20" />
                        <h3 className="text-xl font-bold">No High-Confidence Matches Found</h3>
                        <p className="text-muted-foreground text-sm max-w-sm mx-auto">Try broadening your search terms or choosing one of the example prompts above.</p>
                    </motion.div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 opacity-40 grayscale pointer-events-none">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="glass-card h-64 border-dashed animate-pulse" />
                        ))}
                    </div>
                )}
            </AnimatePresence>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-12 border-t border-border/50">
                <div className="glass-card p-10 space-y-6">
                    <div className="w-14 h-14 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-500">
                        <Users className="w-8 h-8" />
                    </div>
                    <h3 className="text-2xl font-display font-bold">Genetic Audience Match</h3>
                    <p className="text-muted-foreground font-medium leading-relaxed">
                        Our AI analyzes the DNA of your brand and cross-references it with creator demographics to find the absolute highest affinity matches.
                    </p>
                </div>

                <div className="glass-card p-10 space-y-6">
                    <div className="w-14 h-14 rounded-2xl bg-purple-500/10 flex items-center justify-center text-purple-500">
                        <Zap className="w-8 h-8" />
                    </div>
                    <h3 className="text-2xl font-display font-bold">Predictive Performance</h3>
                    <p className="text-muted-foreground font-medium leading-relaxed">
                        Get estimated reach, engagement rates, and ROI forecasts for every match before you even start the conversation.
                    </p>
                </div>
            </div>
        </div>
    );
}
