import { useAuth } from '@/contexts/AuthContext';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { motion } from 'framer-motion';

export default function SettingsPage() {
  const { user } = useAuth();

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-display font-bold mb-6">Settings</h1>

      <div className="space-y-6">
        <motion.div className="glass-card p-6" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <h2 className="font-display font-semibold mb-4">Account Settings</h2>
          <div className="space-y-4">
            <div>
              <Label className="text-sm">Email Address</Label>
              <Input defaultValue={user?.email} className="mt-1" />
            </div>
            <div>
              <Label className="text-sm">Change Password</Label>
              <Input type="password" placeholder="New password" className="mt-1" />
            </div>
            <Button variant="outline">Update Account</Button>
          </div>
        </motion.div>

        <motion.div className="glass-card p-6" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <h2 className="font-display font-semibold mb-4">Notifications</h2>
          <div className="space-y-4">
            {[
              { label: 'Email notifications for new messages', defaultChecked: true },
              { label: 'Collaboration request alerts', defaultChecked: true },
              { label: 'Marketing emails', defaultChecked: false },
              { label: 'Weekly digest', defaultChecked: true },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between">
                <span className="text-sm">{item.label}</span>
                <Switch defaultChecked={item.defaultChecked} />
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div className="glass-card p-6" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <h2 className="font-display font-semibold mb-4">Privacy</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm">Make profile public</span>
              <Switch defaultChecked={user?.role === 'influencer'} />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Show online status</span>
              <Switch defaultChecked />
            </div>
          </div>
        </motion.div>

        <motion.div className="glass-card p-6 border-destructive/20" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <h2 className="font-display font-semibold mb-2 text-destructive">Danger Zone</h2>
          <p className="text-sm text-muted-foreground mb-4">Permanently delete your account and all associated data.</p>
          <Button variant="outline" className="border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground">Delete Account</Button>
        </motion.div>
      </div>
    </div>
  );
}
