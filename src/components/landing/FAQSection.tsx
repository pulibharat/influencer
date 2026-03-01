import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Plus, Minus, HelpCircle } from 'lucide-react';

const faqs = [
    {
        question: "How does the AI Matching Engine find the right influencers?",
        answer: "Our neural engine analyzes over 50 data points per creator, including audience demographics, engagement quality, content sentiment, and historical performance. It matches these against your specific brand requirements to ensure a perfect strategic alignment."
    },
    {
        question: "Is there a minimum budget required to start a campaign?",
        answer: "No, our platform caters to all scales—from boutique local brands to global enterprises. Our flexible 'Elite Network' allows you to collaborate with micro-influencers or celebrity-level creators depending on your goals."
    },
    {
        question: "How do you ensure 'Brand Safety' and content compliance?",
        answer: "Our advanced search filters use real-time monitoring to scan influencer content for any potential risks. If the system detects violence, inappropriate language, or policy violations, it alerts our safety team and relevant authorities immediately."
    },
    {
        question: "How can I join the network as an influencer?",
        answer: "You can apply by clicking 'Join as Influencer' on our home page. Our team review process takes 48-72 hours, where we verify your audience authenticity and content quality to maintain our premium network standard."
    },
    {
        question: "How do payments and collaborations work?",
        answer: "We use a secure escrow-based system. Once a collaboration is agreed upon, the client deposits the funds. These are released to the influencer only after the agreed-upon content is delivered and verified through our internal tracking tools."
    },
    {
        question: "Can I manage multiple campaigns across different niches simultaneously?",
        answer: "Absolutely. Our dashboard is designed for high-end campaign management, allowing you to track Fitness, Fashion, Food, and Travel campaigns separately with dedicated analytics for each."
    }
];

export function FAQSection() {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    return (
        <section className="py-32 relative overflow-hidden">
            <div className="container mx-auto px-6 relative z-10">
                <div className="flex flex-col lg:flex-row gap-20">
                    <div className="lg:w-1/3">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 border border-secondary/20 mb-6"
                        >
                            <HelpCircle className="w-4 h-4 text-secondary" />
                            <span className="text-[10px] font-black text-secondary uppercase tracking-[0.3em]">Knowledge Base</span>
                        </motion.div>
                        <motion.h2
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="text-4xl md:text-6xl font-display font-bold mb-6 tracking-tight leading-[0.9]"
                        >
                            Frequently <br />asked <span className="gradient-text italic text-secondary">questions.</span>
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="text-muted-foreground text-lg font-medium leading-relaxed"
                        >
                            Everything you need to know about the platform, our AI matching, and collaboration standards.
                        </motion.p>
                    </div>

                    <div className="lg:w-2/3 space-y-4">
                        {faqs.map((faq, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className={`glass-card overflow-hidden transition-all duration-300 ${activeIndex === i ? 'ring-1 ring-secondary/50 border-secondary/20 shadow-lg shadow-secondary/5' : 'hover:border-primary/20'}`}
                            >
                                <button
                                    onClick={() => setActiveIndex(activeIndex === i ? null : i)}
                                    className="w-full flex items-center justify-between p-8 text-left"
                                >
                                    <span className="text-xl font-bold tracking-tight">{faq.question}</span>
                                    <div className={`shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${activeIndex === i ? 'bg-secondary text-white' : 'bg-secondary/10 text-secondary'}`}>
                                        {activeIndex === i ? <Minus className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                                    </div>
                                </button>
                                <AnimatePresence>
                                    {activeIndex === i && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                                        >
                                            <div className="px-8 pb-8 pt-0">
                                                <div className="h-px bg-gradient-to-r from-secondary/30 via-transparent to-transparent mb-6" />
                                                <p className="text-muted-foreground text-lg font-medium leading-relaxed max-w-2xl">
                                                    {faq.answer}
                                                </p>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Background Ornaments */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-secondary/5 blur-[150px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
        </section>
    );
}
