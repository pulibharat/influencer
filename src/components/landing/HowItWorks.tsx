import { motion } from 'framer-motion';
import { UserPlus, Search, Users, MessageSquare, Star } from 'lucide-react';

const steps = [
  { icon: UserPlus, title: 'User Registration', desc: 'Businesses sign up as Clients. Influencers create profiles with location, language, category, audience & social links.', color: 'from-primary to-accent' },
  { icon: Search, title: 'Requirement Search', desc: 'Clients define audience, region, language, budget, and content type they need.', color: 'from-accent to-secondary' },
  { icon: Users, title: 'Influencer Matching', desc: 'Platform suggests influencers based on niche, region, and audience alignment.', color: 'from-secondary to-primary' },
  { icon: MessageSquare, title: 'Collaboration', desc: 'Direct messaging & collaboration requests. No middlemen involved.', color: 'from-primary to-secondary' },
  { icon: Star, title: 'Feedback & Rating', desc: 'Clients rate influencers. Influencers rate clients. Build trust over time.', color: 'from-secondary to-accent' },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">How It Works</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">From registration to collaboration in 5 simple steps</p>
        </motion.div>

        <div className="relative max-w-5xl mx-auto">
          {/* Connecting line */}
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-border -translate-y-1/2" />

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                className="relative text-center"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.5 }}
              >
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center mx-auto mb-4 shadow-lg relative z-10`}>
                  <step.icon className="w-7 h-7 text-primary-foreground" />
                </div>
                <div className="absolute top-8 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-primary border-2 border-background hidden md:block" />
                <h3 className="font-display font-semibold text-sm mb-2">Step {i + 1}</h3>
                <p className="font-semibold mb-1 text-sm">{step.title}</p>
                <p className="text-xs text-muted-foreground leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
