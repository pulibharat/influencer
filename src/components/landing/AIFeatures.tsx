import { motion } from 'framer-motion';
import { Sparkles, Bot, Search, ShieldAlert, Cpu, Zap } from 'lucide-react';

const features = [
    {
        title: "AI Matching",
        description: "Our proprietary neural engine matches the perfect influencers to your specific brand requirements and campaign objectives instantly.",
        icon: Sparkles,
        color: "from-blue-500/20 to-cyan-500/20",
        iconColor: "text-blue-500"
    },
    {
        title: "AI Assistant",
        description: "24/7 dedicated AI concierge to handle all your queries, provide in-depth creator insights, and streamline your partnership workflow.",
        icon: Bot,
        color: "from-purple-500/20 to-pink-500/20",
        iconColor: "text-purple-500"
    },
    {
        title: "Advanced Search Filters",
        description: "Real-time safety monitoring that instantly identifies non-compliant content and alerts authorities to ensure 100% brand protection.",
        icon: ShieldAlert,
        color: "from-orange-500/20 to-red-500/20",
        iconColor: "text-orange-500"
    }
];

export function AIFeatures() {
    return (
        <section className="py-32 relative overflow-hidden bg-muted/5">
            <div className="container mx-auto px-6 relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6"
                    >
                        <Cpu className="w-4 h-4 text-primary" />
                        <span className="text-[10px] font-black text-primary uppercase tracking-[0.3em]">Neural Engine v2.0</span>
                    </motion.div>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-6xl font-display font-bold mb-6 tracking-tight"
                    >
                        Intelligence That <br /> <span className="gradient-text italic">Drives Growth</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-muted-foreground text-lg font-medium leading-relaxed"
                    >
                        Harness the power of advanced artificial intelligence to automate discovery,
                        communication, and safety across your entire influencer ecosystem.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {features.map((feature, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1, duration: 0.8 }}
                            className="group relative"
                        >
                            <div className={`glass-card p-10 h-full border-transparent hover:border-primary/20 bg-gradient-to-br ${feature.color} transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-2xl`}>
                                <div className="w-16 h-16 rounded-2xl bg-white dark:bg-card flex items-center justify-center mb-8 shadow-sm group-hover:scale-110 transition-transform duration-500">
                                    <feature.icon className={`w-8 h-8 ${feature.iconColor}`} />
                                </div>
                                <h3 className="text-2xl font-display font-bold mb-4">{feature.title}</h3>
                                <p className="text-muted-foreground font-medium leading-relaxed mb-8">
                                    {feature.description}
                                </p>
                                <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    Enable Pro Mode <Zap className="w-3 h-3 fill-primary" />
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Background Decorative Elements */}
            <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-primary/5 blur-[120px] -translate-y-1/2 -translate-x-1/2 rounded-full pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-secondary/5 blur-[120px] translate-y-1/2 translate-x-1/2 rounded-full pointer-events-none" />
        </section>
    );
}
