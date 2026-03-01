import { useState } from 'react';
import { sampleNotifications, type Notification } from '@/data/mockData';
import { X, Clock, Trash2, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';

// Extending type for the local UI state if needed
interface ExtendedNotification extends Notification {
  author?: string; // To match the red name in the image
}

const mockData: ExtendedNotification[] = [
  {
    id: 'n1',
    type: 'system',
    title: 'New Registration: Finibus Bonorum et Malorum',
    description: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium',
    timestamp: '24 Nov 2018 at 9:30 AM',
    read: false,
    author: 'Allen Deu'
  },
  {
    id: 'n2',
    type: 'message',
    title: 'Darren Smith sent new message',
    description: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium',
    timestamp: '24 Nov 2018 at 9:30 AM',
    read: false,
    author: 'Darren'
  },
  {
    id: 'n3',
    type: 'review',
    title: 'Arin Gansihram Commented on post',
    description: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium',
    timestamp: '24 Nov 2018 at 9:30 AM',
    read: true,
    author: 'Arin Gansihram'
  },
  {
    id: 'n4',
    type: 'collaboration',
    title: 'Jullet Den Connect Allen Depk',
    description: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium',
    timestamp: '24 Nov 2018 at 9:30 AM',
    read: true,
    author: 'Jullet Den'
  },
  {
    id: 'n5',
    type: 'collaboration',
    title: 'Jullet Den Connect Allen Depk',
    description: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium',
    timestamp: '24 Nov 2018 at 9:30 AM',
    read: true,
    author: 'Jullet Den'
  },
  {
    id: 'n6',
    type: 'message',
    title: 'Darren Smith sent new message',
    description: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium',
    timestamp: '24 Nov 2018 at 9:30 AM',
    read: true,
    author: 'Jullet Den'
  },
];

const typeLabelMap = {
  system: 'Joined New User',
  message: 'Message',
  review: 'Comment',
  collaboration: 'Connect',
};

const typeColorMap = {
  system: 'bg-green-600 hover:bg-green-700',
  message: 'bg-orange-500 hover:bg-orange-600',
  review: 'bg-purple-600 hover:bg-purple-700',
  collaboration: 'bg-blue-500 hover:bg-blue-600',
};

export default function NotificationsPage() {
  const { toast } = useToast();
  const [notifications, setNotifications] = useState<ExtendedNotification[]>(mockData);

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
    toast({
      title: "Notification Deleted",
      description: "Item removed from your list.",
      variant: "destructive",
    });
  };

  const deleteAll = () => {
    setNotifications([]);
    toast({
      title: "All Cleared",
      description: "Your notification center is empty.",
      className: "bg-primary text-white border-none",
    });
  };

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    toast({
      title: "Marked All as Read",
      description: "All notifications are now read.",
      className: "bg-green-600 text-white border-none",
    });
  };

  return (
    <div className="max-w-5xl mx-auto py-10 px-4">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-display font-bold tracking-tight uppercase">Notifications</h1>
        <div className="flex gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={markAllRead}
            disabled={notifications.length === 0}
            className="rounded-xl font-bold uppercase tracking-widest text-[10px] h-10 px-6 gap-2"
          >
            <CheckCircle2 className="w-4 h-4" /> Mark All Read
          </Button>
          <Button
            variant="destructive"
            size="sm"
            onClick={deleteAll}
            disabled={notifications.length === 0}
            className="rounded-xl font-bold uppercase tracking-widest text-[10px] h-10 px-6 gap-2 shadow-lg shadow-destructive/20"
          >
            <Trash2 className="w-4 h-4" /> Delete All
          </Button>
        </div>
      </div>

      <div className="glass-card overflow-hidden shadow-2xl border-none">
        <div className="divide-y divide-border/50">
          <AnimatePresence initial={false}>
            {notifications.map((notif) => (
              <motion.div
                key={notif.id}
                layout
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, x: 100 }}
                className={`p-8 hover:bg-muted/30 transition-all flex items-start gap-8 relative group ${!notif.read ? 'bg-primary/[0.02]' : ''}`}
              >
                {/* Delete Button (Left side as requested) */}
                <button
                  onClick={() => deleteNotification(notif.id)}
                  className="w-8 h-8 rounded-lg bg-muted text-muted-foreground flex items-center justify-center hover:bg-destructive/10 hover:text-destructive transition-colors shrink-0 mt-1"
                >
                  <X className="w-4 h-4" />
                </button>

                <div className="flex-1 space-y-3">
                  <div className="flex items-center justify-between">
                    <Badge className={`${typeColorMap[notif.type as keyof typeof typeColorMap]} border-none rounded-md px-3 py-1 font-bold text-[10px] uppercase tracking-wider`}>
                      {typeLabelMap[notif.type as keyof typeof typeLabelMap]}
                    </Badge>
                    <div className="flex items-center gap-2 text-muted-foreground/60 text-[11px] font-medium">
                      <Clock className="w-3.5 h-3.5" />
                      {notif.timestamp}
                    </div>
                  </div>

                  <div className="space-y-1">
                    <h3 className={`text-base font-bold ${!notif.read ? 'text-foreground' : 'text-foreground/80'}`}>
                      {notif.title}
                    </h3>
                    <p className="text-sm text-muted-foreground/80 leading-relaxed font-medium">
                      {notif.description}
                    </p>
                  </div>

                  {notif.author && (
                    <p className="text-sm font-bold text-red-500/90 pt-1">
                      {notif.author}
                    </p>
                  )}
                </div>

                {!notif.read && (
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary" />
                )}
              </motion.div>
            ))}
          </AnimatePresence>

          {notifications.length === 0 && (
            <div className="py-32 text-center">
              <div className="w-20 h-20 bg-muted/50 rounded-[2.5rem] flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-10 h-10 text-muted-foreground/30" />
              </div>
              <h2 className="text-xl font-display font-bold text-muted-foreground mb-2">No notifications found</h2>
              <p className="text-sm text-muted-foreground/60">You're all caught up! Check back later for new updates.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
