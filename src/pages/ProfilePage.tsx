import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { motion, AnimatePresence } from 'framer-motion';
import {
  User, Mail, MapPin, Briefcase, Award, Tag,
  Instagram, Youtube, Music2, Edit3, Save, X,
  CheckCircle2, Star, Rocket
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

export default function ProfilePage() {
  const { user, updateUser } = useAuth();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    roleLabel: user?.roleLabel || '',
    experienceLevel: user?.experienceLevel || '',
    favoriteItems: user?.favoriteItems?.join(', ') || '',
    primaryGenre: user?.primaryGenre || '',
    softwareOrEquipment: user?.softwareOrEquipment || '',
    preferredMood: user?.preferredMood || '',
    city: user?.city || '',
    region: user?.region || '',
    bio: user?.bio || '',
    tags: user?.tags?.join(', ') || '',
  });

  const handleSave = () => {
    updateUser({
      ...formData,
      favoriteItems: formData.favoriteItems.split(',').map(i => i.trim()),
      tags: formData.tags.split(',').map(t => t.trim()),
    });
    setIsEditing(false);
    toast({
      title: "Profile Updated",
      description: "Your changes have been saved successfully.",
      className: "bg-green-600 text-white border-none",
    });
  };

  if (!user) return null;

  return (
    <div className="max-w-6xl mx-auto pb-20 px-4">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-4xl font-display font-bold tracking-tight mb-2">Profile</h1>
        <p className="text-muted-foreground flex items-center gap-2">
          View and manage your professional identity.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column - Brand Card */}
        <motion.div
          className="lg:col-span-4"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <div className="glass-card p-10 flex flex-col items-center text-center relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-full h-2 gradient-bg" />

            <div className="mb-8 relative">
              <div className="w-56 h-56 rounded-full overflow-hidden border-[12px] border-muted/30 shadow-2xl relative z-10">
                <img src={user.avatar} alt={user.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              </div>
              <div className="absolute -inset-4 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-all duration-700" />
            </div>

            <h2 className="text-3xl font-display font-bold mb-1">{user.name}</h2>
            <p className="text-green-500 font-black uppercase tracking-[0.2em] text-xs mb-8 flex items-center gap-2">
              <Star className="w-3.5 h-3.5 fill-current" /> {user.roleLabel}
            </p>

            <div className="w-full space-y-4 pt-8 border-t border-border/50">
              <div className="flex items-center justify-center gap-3">
                {user.badges?.map((badge, i) => (
                  <Badge key={i} variant="outline" className="px-4 py-1.5 rounded-xl border-primary/20 text-primary bg-primary/5 text-[10px] font-black uppercase tracking-widest gap-2">
                    <Rocket className="w-3 h-3" /> {badge}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Column - Details */}
        <motion.div
          className="lg:col-span-8 space-y-8"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <div className="glass-card p-10 relative">
            <div className="flex items-center justify-between mb-10 pb-6 border-b border-border/50">
              <h3 className="text-2xl font-display font-bold">Bio & other details</h3>
              <div className="flex gap-3">
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className={`p-3 rounded-2xl transition-all ${isEditing ? 'bg-destructive/10 text-destructive' : 'bg-primary/10 text-primary hover:bg-primary/20'}`}
                >
                  {isEditing ? <X className="w-5 h-5" /> : <Edit3 className="w-5 h-5" />}
                </button>
                {isEditing && (
                  <button
                    onClick={handleSave}
                    className="p-3 rounded-2xl bg-green-600 text-white shadow-lg shadow-green-600/20 hover:scale-105 active:scale-95 transition-all"
                  >
                    <Save className="w-5 h-5" />
                  </button>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
              {/* Field Groups */}
              <div className="space-y-10">
                <DetailItem
                  label="My Role"
                  value={user.role === 'influencer' ? 'Creator' : 'Brand Client'}
                  isEditing={isEditing}
                  icon={<Briefcase className="w-4 h-4" />}
                />
                <DetailItem
                  label="Experience Level"
                  value={user.experienceLevel}
                  onChange={(v) => setFormData({ ...formData, experienceLevel: v })}
                  isEditing={isEditing}
                  icon={<Award className="w-4 h-4" />}
                />
                <DetailItem
                  label={user.role === 'influencer' ? "My 3 Favorite Brands" : "My Favorite Creators"}
                  value={user.favoriteItems?.join(', ')}
                  onChange={(v) => setFormData({ ...formData, favoriteItems: v })}
                  isEditing={isEditing}
                  icon={<Star className="w-4 h-4" />}
                />
                <DetailItem
                  label="City or Region"
                  value={`${user.city}, ${user.region}`}
                  onChange={(v) => setFormData({ ...formData, city: v })}
                  isEditing={isEditing}
                  icon={<MapPin className="w-4 h-4" />}
                />
              </div>

              <div className="space-y-10">
                <DetailItem
                  label="Primary Platform/Software"
                  value={user.softwareOrEquipment}
                  onChange={(v) => setFormData({ ...formData, softwareOrEquipment: v })}
                  isEditing={isEditing}
                  icon={<Rocket className="w-4 h-4" />}
                />
                <DetailItem
                  label="Preferred Style/Mood"
                  value={user.preferredMood}
                  onChange={(v) => setFormData({ ...formData, preferredMood: v })}
                  isEditing={isEditing}
                  icon={<Edit3 className="w-4 h-4" />}
                />
                <div className="space-y-2">
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground">Availability</p>
                  <div className="flex items-center gap-3 px-4 py-2 bg-green-500/10 text-green-600 rounded-2xl w-fit border border-green-500/20 shadow-sm">
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-xs font-black uppercase tracking-widest">Available for Collaboration</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground">Tags</p>
                  <div className="flex flex-wrap gap-2">
                    {user.tags?.map((tag, i) => (
                      <span key={i} className="text-xs font-bold text-muted-foreground/80 hover:text-primary transition-colors cursor-pointer">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-12 pt-8 border-t border-border/50">
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground mb-4 px-1 flex items-center gap-3">
                <Info size={14} className="text-primary/60" /> About Me
              </p>
              {isEditing ? (
                <Textarea
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  className="bg-muted/30 border-0 rounded-2xl p-6 text-sm leading-relaxed italic"
                  rows={4}
                />
              ) : (
                <p className="text-sm text-muted-foreground leading-loose italic p-6 bg-muted/10 rounded-2xl border border-border/30">
                  "{user.bio}"
                </p>
              )}
            </div>
          </div>

          {/* Social Media Section */}
          <div className="glass-card p-10">
            <h3 className="text-xl font-display font-bold mb-8">Social Media</h3>
            <div className="flex gap-6">
              <SocialButton icon={<Youtube className="w-6 h-6" />} color="hover:bg-red-500" />
              <SocialButton icon={<Instagram className="w-6 h-6" />} color="hover:bg-gradient-to-tr from-yellow-500 via-pink-500 to-purple-600" />
              <SocialButton icon={<Music2 className="w-6 h-6" />} color="hover:bg-black" />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function DetailItem({ label, value, onChange, isEditing, icon }: any) {
  return (
    <div className="space-y-3 group">
      <div className="flex items-center gap-3">
        <span className="text-primary/40 group-hover:text-primary transition-colors">{icon}</span>
        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground/60">{label}</p>
      </div>
      {isEditing && onChange ? (
        <Input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="h-12 bg-muted/30 border-0 rounded-xl px-4 text-sm font-bold focus-visible:ring-2 focus-visible:ring-primary/20 transition-all shadow-inner"
        />
      ) : (
        <p className="text-[15px] font-bold tracking-tight text-foreground/90 px-1">{value || 'Not specified'}</p>
      )}
    </div>
  );
}

function SocialButton({ icon, color }: any) {
  return (
    <button className={`w-16 h-16 rounded-[1.8rem] bg-muted/50 flex items-center justify-center transition-all duration-500 hover:scale-110 hover:-translate-y-2 hover:text-white hover:shadow-2xl active:scale-95 ${color}`}>
      {icon}
    </button>
  );
}

function Info({ size, className }: any) {
  return <Award size={size} className={className} />;
}
