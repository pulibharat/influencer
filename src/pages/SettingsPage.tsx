import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { motion, AnimatePresence } from 'framer-motion';
import {
  User, Bell, Shield, Eye, CreditCard, Trash2,
  ChevronRight, Save, ShieldCheck, Mail, Lock,
  Globe, Smartphone, Cloud, Zap
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

type SettingsTab = 'account' | 'notifications' | 'privacy' | 'security' | 'billing';

export default function SettingsPage() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<SettingsTab>('account');
  const [loading, setLoading] = useState(false);

  const handleSave = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "Settings Saved",
        description: "Your preferences have been updated successfully.",
        className: "bg-primary text-white border-none",
      });
    }, 800);
  };

  const tabs: { id: SettingsTab; label: string; icon: any; description: string }[] = [
    { id: 'account', label: 'Account', icon: User, description: 'Manage your personal details and identity' },
    { id: 'notifications', label: 'Notifications', icon: Bell, description: 'Control how you want to be alerted' },
    { id: 'privacy', label: 'Privacy & Visibility', icon: Eye, description: 'Manage who see your profile and activity' },
    { id: 'security', label: 'Security', icon: Shield, description: 'Protect your account with advanced safety' },
    { id: 'billing', label: 'Billing & Plans', icon: CreditCard, description: 'Manage subscriptions and payments' },
  ];

  return (
    <div className="max-w-7xl mx-auto pb-20 px-4">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-4xl font-display font-bold tracking-tight mb-2">Settings</h1>
        <p className="text-muted-foreground flex items-center gap-2 font-medium">
          Fine-tune your experience and manage your platform preferences.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-10">
        {/* Navigation Sidebar */}
        <div className="w-full lg:w-80 shrink-0 space-y-2">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-4 p-5 rounded-3xl transition-all relative group overflow-hidden ${isActive
                    ? 'bg-primary text-white shadow-xl shadow-primary/20'
                    : 'hover:bg-muted/50 text-muted-foreground hover:text-foreground'
                  }`}
              >
                <div className={`p-2.5 rounded-2xl transition-colors ${isActive ? 'bg-white/20' : 'bg-muted group-hover:bg-white'}`}>
                  <tab.icon className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <p className="text-sm font-bold uppercase tracking-widest leading-none mb-1">{tab.label}</p>
                  <p className={`text-[10px] leading-tight ${isActive ? 'text-white/70' : 'text-muted-foreground/60'}`}>
                    {tab.description}
                  </p>
                </div>
                {isActive && (
                  <motion.div
                    layoutId="active-pill"
                    className="absolute right-4"
                    initial={{ x: 10, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                  >
                    <ChevronRight className="w-5 h-5 text-white/50" />
                  </motion.div>
                )}
              </button>
            );
          })}

          <div className="pt-8 mt-8 border-t border-border/50">
            <button className="w-full flex items-center gap-4 p-5 rounded-3xl text-destructive hover:bg-destructive/10 transition-all group">
              <div className="p-2.5 rounded-2xl bg-destructive/10">
                <Trash2 className="w-5 h-5" />
              </div>
              <div className="text-left">
                <p className="text-sm font-bold uppercase tracking-widest leading-none mb-1">Danger Zone</p>
                <p className="text-[10px] text-destructive/60 leading-tight">Delete your account permanently</p>
              </div>
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 min-w-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="glass-card p-10 relative overflow-hidden"
            >
              {/* Decorative background element */}
              <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

              <div className="relative z-10">
                {activeTab === 'account' && (
                  <div className="space-y-10">
                    <SectionHeader title="Account Details" description="Update your primary account information and public profile handles." icon={<Zap className="w-5 h-5" />} />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <InputGroup label="Email Address" value={user?.email || ''} icon={<Mail className="w-4 h-4" />} />
                      <InputGroup label="Display Name" value={user?.name || ''} icon={<User className="w-4 h-4" />} />
                      <InputGroup label="City / Region" value={user?.city || ''} icon={<Globe className="w-4 h-4" />} />
                      <InputGroup label="Phone (Optional)" placeholder="+91 98765 43210" icon={<Smartphone className="w-4 h-4" />} />
                    </div>
                  </div>
                )}

                {activeTab === 'notifications' && (
                  <div className="space-y-10">
                    <SectionHeader title="Notification Preferences" description="Choose which alerts you want to receive and where." icon={<Bell className="w-5 h-5" />} />
                    <div className="space-y-6">
                      {[
                        { label: 'Push Notifications', desc: 'Real-time alerts for messages and requests', default: true },
                        { label: 'Email Summaries', desc: 'Weekly digest of your campaign activities', default: true },
                        { label: 'Marketing Communications', desc: 'Updates about new features and events', default: false },
                        { label: 'Activity Logs', desc: 'Audit trail of all actions performed on your account', default: false },
                      ].map((item, i) => (
                        <SwitchItem key={i} {...item} />
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'privacy' && (
                  <div className="space-y-10">
                    <SectionHeader title="Privacy & Visibility" description="Manage your data and control who can view your professional profile." icon={<Eye className="w-5 h-5" />} />
                    <div className="space-y-6">
                      {[
                        { label: 'Public Discovery', desc: 'Allow your profile to appear in search results', default: true },
                        { label: 'Show Online Status', desc: 'Display when you are active on the platform', default: true },
                        { label: 'Annonymous Browsing', desc: 'Visit other profiles without leaving a trace', default: false },
                        { label: 'Data Analytics Shared', desc: 'Contribute to anonymous platform usage statistics', default: true },
                      ].map((item, i) => (
                        <SwitchItem key={i} {...item} />
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'security' && (
                  <div className="space-y-10">
                    <SectionHeader title="Account Security" description="Manage passwords and two-factor authentication." icon={<ShieldCheck className="w-5 h-5" />} />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <InputGroup label="Current Password" type="password" placeholder="••••••••" icon={<Lock className="w-4 h-4" />} />
                      <InputGroup label="New Password" type="password" placeholder="••••••••" icon={<Zap className="w-4 h-4" />} />
                    </div>
                    <div className="pt-6 border-t border-border/50">
                      <SwitchItem
                        label="Two-Factor Authentication (2FA)"
                        desc="Add an extra layer of security to your account logins"
                        default={false}
                      />
                    </div>
                  </div>
                )}

                {activeTab === 'billing' && (
                  <div className="space-y-10">
                    <SectionHeader title="Billing & Plans" description="Review your current subscription and transaction history." icon={<Zap className="w-5 h-5" />} />
                    <div className="p-8 bg-primary/5 rounded-[2.5rem] border border-primary/10 flex items-center justify-between">
                      <div className="flex items-center gap-5">
                        <div className="w-16 h-16 rounded-[1.5rem] gradient-bg flex items-center justify-center text-white shadow-xl shadow-primary/20">
                          <Zap className="w-8 h-8" />
                        </div>
                        <div>
                          <p className="text-xl font-display font-bold">Premium Plan</p>
                          <p className="text-sm text-muted-foreground font-medium">Next billing date: Jan 24, 2026</p>
                        </div>
                      </div>
                      <Badge variant="outline" className="px-6 py-2 rounded-2xl bg-white/50 dark:bg-card/50 text-[10px] font-black uppercase tracking-widest border-primary/20 text-primary">Active</Badge>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <StatCard label="Monthly Spend" value="₹12,450" />
                      <StatCard label="Credits Used" value="84%" />
                      <StatCard label="Saved Cards" value="02" />
                    </div>
                  </div>
                )}

                {/* Footer Actions */}
                <div className="mt-16 pt-10 border-t border-border/50 flex items-center justify-between gap-6">
                  <div className="flex items-center gap-3 text-muted-foreground/40 hidden md:flex">
                    <Cloud className="w-4 h-4" />
                    <p className="text-[10px] font-black uppercase tracking-widest">Auto-saved to secure cloud</p>
                  </div>
                  <div className="flex gap-4 w-full md:w-auto">
                    <Button variant="ghost" className="rounded-2xl h-14 px-10 text-[11px] font-black uppercase tracking-widest flex-1 md:flex-none">Reset</Button>
                    <Button
                      onClick={handleSave}
                      disabled={loading}
                      className="h-14 px-10 rounded-2xl gradient-bg shadow-2xl shadow-primary/30 flex items-center gap-3 text-[11px] font-black uppercase tracking-widest flex-1 md:flex-none"
                    >
                      {loading ? 'Processing...' : (
                        <>
                          <Save className="w-4 h-4" /> Save Changes
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

function SectionHeader({ title, description, icon }: { title: string; description: string; icon: any }) {
  return (
    <div className="flex items-start gap-5">
      <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
        {icon}
      </div>
      <div>
        <h3 className="text-2xl font-display font-bold leading-tight">{title}</h3>
        <p className="text-sm text-muted-foreground font-medium mt-1">{description}</p>
      </div>
    </div>
  );
}

function InputGroup({ label, value, placeholder, type = 'text', icon }: any) {
  return (
    <div className="space-y-3 group">
      <div className="flex items-center gap-3">
        <span className="text-muted-foreground/30 group-focus-within:text-primary transition-colors">{icon}</span>
        <Label className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground/60">{label}</Label>
      </div>
      <Input
        defaultValue={value}
        placeholder={placeholder}
        type={type}
        className="h-14 bg-muted/30 border-0 rounded-2xl px-6 text-sm font-bold focus-visible:ring-2 focus-visible:ring-primary/20 transition-all shadow-inner placeholder:text-muted-foreground/20"
      />
    </div>
  );
}

function SwitchItem({ label, desc, default: defValue }: { label: string; desc: string; default: boolean }) {
  return (
    <div className="flex items-center justify-between gap-6 p-6 bg-muted/10 rounded-3xl border border-border/20 group hover:border-primary/20 transition-colors">
      <div className="space-y-1">
        <p className="text-sm font-bold text-foreground/90">{label}</p>
        <p className="text-xs text-muted-foreground font-medium">{desc}</p>
      </div>
      <Switch defaultChecked={defValue} className="data-[state=checked]:bg-primary" />
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="p-6 bg-muted/20 rounded-[2rem] border border-border/30 text-center space-y-2">
      <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/50">{label}</p>
      <p className="text-2xl font-display font-bold tracking-tight">{value}</p>
    </div>
  );
}

function Badge({ children, variant, className }: any) {
  return (
    <div className={className}>
      {children}
    </div>
  );
}
