import { sampleNotifications } from '@/data/mockData';
import { Bell, MessageSquare, Star, Info } from 'lucide-react';
import { motion } from 'framer-motion';

const iconMap = {
  collaboration: Bell,
  message: MessageSquare,
  review: Star,
  system: Info,
};

const colorMap = {
  collaboration: 'bg-primary/10 text-primary',
  message: 'bg-secondary/10 text-secondary',
  review: 'bg-amber-50 text-amber-600',
  system: 'bg-muted text-muted-foreground',
};

export default function NotificationsPage() {
  return (
    <div>
      <h1 className="text-2xl font-display font-bold mb-6">Notifications</h1>

      <div className="space-y-3 max-w-2xl">
        {sampleNotifications.map((notif, i) => {
          const Icon = iconMap[notif.type];
          const color = colorMap[notif.type];
          return (
            <motion.div
              key={notif.id}
              className={`glass-card p-4 flex items-start gap-4 ${!notif.read ? 'border-l-4 border-l-primary' : ''}`}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${color}`}>
                <Icon className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">{notif.title}</p>
                <p className="text-sm text-muted-foreground mt-0.5">{notif.description}</p>
                <p className="text-xs text-muted-foreground mt-1">{notif.timestamp}</p>
              </div>
              {!notif.read && <div className="w-2 h-2 rounded-full bg-primary mt-2" />}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
