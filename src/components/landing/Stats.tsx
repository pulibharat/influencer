import { motion } from 'framer-motion';
import { Users, Building2, Megaphone } from 'lucide-react';

const stats = [
  { icon: Users, value: '10K+', label: 'Influencers', color: 'text-primary' },
  { icon: Building2, value: '2K+', label: 'Brands', color: 'text-secondary' },
  { icon: Megaphone, value: '50K+', label: 'Campaigns', color: 'text-accent' },
];

export function Stats() {
  return (
    <section id="features" className="py-20 relative">
      <div className="container mx-auto px-4">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              className="text-center p-8 glass-card hover-lift"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
            >
              <stat.icon className={`w-10 h-10 ${stat.color} mx-auto mb-4`} />
              <p className="text-4xl font-display font-bold mb-2">{stat.value}</p>
              <p className="text-muted-foreground">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
