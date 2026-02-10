import { useAuth } from '@/contexts/AuthContext';
import { Users, MessageSquare, Bell, TrendingUp, Star } from 'lucide-react';
import { motion } from 'framer-motion';

export default function DashboardHome() {
  const { user } = useAuth();

  const stats = user?.role === 'client'
    ? [
        { icon: Users, label: 'Influencers Found', value: '2,340', change: '+12%' },
        { icon: MessageSquare, label: 'Active Chats', value: '8', change: '+3' },
        { icon: Bell, label: 'Pending Requests', value: '5', change: '+2' },
        { icon: TrendingUp, label: 'Campaign Reach', value: '1.2M', change: '+18%' },
      ]
    : [
        { icon: Star, label: 'Rating', value: '4.8', change: '+0.2' },
        { icon: MessageSquare, label: 'Messages', value: '12', change: '+4' },
        { icon: Bell, label: 'Collab Requests', value: '7', change: '+3' },
        { icon: TrendingUp, label: 'Profile Views', value: '3,450', change: '+25%' },
      ];

  return (
    <div>
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <h1 className="text-2xl font-display font-bold mb-1">Welcome back, {user?.name?.split(' ')[0]}! 👋</h1>
        <p className="text-muted-foreground mb-6">Here's what's happening with your {user?.role === 'client' ? 'campaigns' : 'profile'} today.</p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            className="glass-card p-5 hover-lift"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-xl gradient-card flex items-center justify-center">
                <stat.icon className="w-5 h-5 text-primary" />
              </div>
              <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-0.5 rounded-full">{stat.change}</span>
            </div>
            <p className="text-2xl font-display font-bold">{stat.value}</p>
            <p className="text-sm text-muted-foreground">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass-card p-6">
          <h2 className="font-display font-semibold mb-4">Recent Activity</h2>
          <div className="space-y-4">
            {[
              { text: 'New collaboration request from Priya Sharma', time: '2 min ago', dotClass: 'bg-primary' },
              { text: 'Message received from Rohit Kumar', time: '15 min ago', dotClass: 'bg-secondary' },
              { text: 'Campaign "Summer Fashion 2026" started', time: '1 hour ago', dotClass: 'bg-accent' },
              { text: 'You received a 5-star rating', time: '3 hours ago', dotClass: 'bg-primary' },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className={`w-2 h-2 rounded-full ${item.dotClass}`} />
                <div className="flex-1">
                  <p className="text-sm">{item.text}</p>
                  <p className="text-xs text-muted-foreground">{item.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-card p-6">
          <h2 className="font-display font-semibold mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-3">
            {[
              { icon: Users, label: 'Find Influencers', desc: 'Browse directory' },
              { icon: MessageSquare, label: 'Messages', desc: '3 unread' },
              { icon: Bell, label: 'Notifications', desc: '5 new' },
              { icon: TrendingUp, label: 'Analytics', desc: 'View stats' },
            ].map((item, i) => (
              <div key={i} className="p-4 rounded-xl border border-border hover:border-primary/30 hover:bg-primary/5 transition-all cursor-pointer">
                <item.icon className="w-5 h-5 text-primary mb-2" />
                <p className="text-sm font-medium">{item.label}</p>
                <p className="text-xs text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
