import { useAuth } from '@/contexts/AuthContext';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { motion } from 'framer-motion';

export default function ProfilePage() {
  const { user } = useAuth();

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-display font-bold mb-6">My Profile</h1>

      <motion.div className="glass-card p-6" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center gap-4 mb-6">
          <img src={user?.avatar} alt={user?.name} className="w-20 h-20 rounded-full border-4 border-primary/20" />
          <div>
            <h2 className="text-lg font-display font-bold">{user?.name}</h2>
            <p className="text-sm text-muted-foreground capitalize">{user?.role}</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label className="text-sm">Full Name</Label>
              <Input defaultValue={user?.name} className="mt-1" />
            </div>
            <div>
              <Label className="text-sm">Email</Label>
              <Input defaultValue={user?.email} className="mt-1" />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label className="text-sm">City</Label>
              <Input defaultValue={user?.city || ''} className="mt-1" />
            </div>
            {user?.role === 'client' && (
              <div>
                <Label className="text-sm">Company</Label>
                <Input defaultValue={user?.company || ''} className="mt-1" />
              </div>
            )}
            {user?.role === 'influencer' && (
              <div>
                <Label className="text-sm">Niche</Label>
                <Input defaultValue={user?.niche || ''} className="mt-1" />
              </div>
            )}
          </div>

          <div>
            <Label className="text-sm">Bio</Label>
            <Textarea defaultValue={user?.bio || ''} className="mt-1" rows={4} />
          </div>

          {user?.role === 'influencer' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label className="text-sm">Instagram Handle</Label>
                <Input placeholder="@yourhandle" className="mt-1" />
              </div>
              <div>
                <Label className="text-sm">YouTube Channel</Label>
                <Input placeholder="Channel URL" className="mt-1" />
              </div>
            </div>
          )}

          <Button className="gradient-bg border-0">Save Changes</Button>
        </div>
      </motion.div>
    </div>
  );
}
