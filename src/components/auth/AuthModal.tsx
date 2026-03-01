import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import type { UserRole } from '@/data/mockData';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Mail, Lock, User, Building2, Megaphone, Sparkles } from 'lucide-react';

export function AuthModal() {
  const { showAuthModal, setShowAuthModal, authMode, setAuthMode, login, signup } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<UserRole>('client');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (authMode === 'signin') {
      login(email || 'demo@influmatch.in', password, role);
    } else {
      signup(name || 'Demo User', email || 'demo@influmatch.in', password, role);
    }
  };

  return (
    <Dialog open={showAuthModal} onOpenChange={setShowAuthModal}>
      <DialogContent className="sm:max-w-[520px] p-0 overflow-hidden border-border/40 gap-0 rounded-[2.5rem] shadow-[0_32px_120px_rgba(0,0,0,0.45)]">
        {/* Header */}
        <div className="relative gradient-bg px-8 pt-8 pb-6">
          <div className="absolute inset-0 opacity-15 pointer-events-none">
            <div className="absolute -top-24 -right-24 w-64 h-64 rounded-full bg-white/30 blur-3xl" />
            <div className="absolute -bottom-28 -left-28 w-72 h-72 rounded-full bg-black/30 blur-3xl" />
          </div>

          <div className="relative flex items-start justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="relative">
                <img
                  src="/whisk_udaan_setu.png"
                  alt="Whisk Udaan Setu"
                  className="h-12 w-12 rounded-2xl object-cover border-2 border-primary-foreground/30 shadow-xl"
                />
                <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-xl bg-white/20 border border-white/30 backdrop-blur flex items-center justify-center">
                  <Sparkles className="w-3.5 h-3.5 text-white" />
                </div>
              </div>
              <div className="text-left">
                <p className="font-display text-2xl font-black tracking-tight text-primary-foreground leading-none">
                  Udaan Setu
                </p>
                <p className="text-primary-foreground/80 text-sm font-medium mt-1">
                  {authMode === 'signin' ? 'Welcome back. Let’s continue.' : 'Create your account in seconds.'}
                </p>
              </div>
            </div>

            {/* Auth mode segmented control */}
            <div className="shrink-0">
              <div className="inline-flex p-1.5 rounded-2xl bg-black/20 border border-white/20 backdrop-blur">
                <button
                  type="button"
                  onClick={() => setAuthMode('signup')}
                  className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${authMode === 'signup'
                    ? 'bg-white text-black shadow-lg'
                    : 'text-white/80 hover:text-white hover:bg-white/10'
                    }`}
                >
                  Sign Up
                </button>
                <button
                  type="button"
                  onClick={() => setAuthMode('signin')}
                  className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${authMode === 'signin'
                    ? 'bg-white text-black shadow-lg'
                    : 'text-white/80 hover:text-white hover:bg-white/10'
                    }`}
                >
                  Sign In
                </button>
              </div>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="px-8 py-7 space-y-6 bg-card">
          {/* Role selection */}
          <div>
            <Label className="text-[10px] font-black uppercase tracking-[0.25em] text-muted-foreground mb-3 block ml-1">
              I am a
            </Label>
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setRole('client')}
                className={`group relative flex items-center gap-3 p-4 rounded-[1.6rem] border-2 transition-all text-left ${role === 'client'
                  ? 'border-primary bg-primary/5 shadow-xl shadow-primary/10'
                  : 'border-border/60 hover:border-primary/40 hover:bg-muted/30'
                  }`}
              >
                <div className={`w-11 h-11 rounded-2xl flex items-center justify-center transition-colors ${role === 'client' ? 'bg-primary text-white' : 'bg-muted/40 text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary'
                  }`}>
                  <Building2 className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <p className="text-sm font-black tracking-tight">Client</p>
                  <p className="text-xs text-muted-foreground font-medium">Brand / Business</p>
                </div>
                {role === 'client' && <div className="absolute top-4 right-4 w-2.5 h-2.5 rounded-full bg-primary animate-pulse" />}
              </button>
              <button
                type="button"
                onClick={() => setRole('influencer')}
                className={`group relative flex items-center gap-3 p-4 rounded-[1.6rem] border-2 transition-all text-left ${role === 'influencer'
                  ? 'border-primary bg-primary/5 shadow-xl shadow-primary/10'
                  : 'border-border/60 hover:border-primary/40 hover:bg-muted/30'
                  }`}
              >
                <div className={`w-11 h-11 rounded-2xl flex items-center justify-center transition-colors ${role === 'influencer' ? 'bg-primary text-white' : 'bg-muted/40 text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary'
                  }`}>
                  <Megaphone className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <p className="text-sm font-black tracking-tight">Influencer</p>
                  <p className="text-xs text-muted-foreground font-medium">Content Creator</p>
                </div>
                {role === 'influencer' && <div className="absolute top-4 right-4 w-2.5 h-2.5 rounded-full bg-primary animate-pulse" />}
              </button>
            </div>
          </div>

          {authMode === 'signup' && (
            <div>
              <Label htmlFor="name" className="text-[10px] font-black uppercase tracking-[0.25em] text-muted-foreground ml-1">
                Full Name
              </Label>
              <div className="relative mt-2">
                <User className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="name"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="Your full name"
                  className="h-14 pl-12 rounded-2xl bg-muted/20 border-border/50 focus-visible:ring-2 focus-visible:ring-primary/20"
                />
              </div>
            </div>
          )}

          <div>
            <Label htmlFor="email" className="text-[10px] font-black uppercase tracking-[0.25em] text-muted-foreground ml-1">
              Email
            </Label>
            <div className="relative mt-2">
              <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                id="email"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="h-14 pl-12 rounded-2xl bg-muted/20 border-border/50 focus-visible:ring-2 focus-visible:ring-primary/20"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="password" className="text-[10px] font-black uppercase tracking-[0.25em] text-muted-foreground ml-1">
              Password
            </Label>
            <div className="relative mt-2">
              <Lock className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                id="password"
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                className="h-14 pl-12 rounded-2xl bg-muted/20 border-border/50 focus-visible:ring-2 focus-visible:ring-primary/20"
              />
            </div>
          </div>

          <Button type="submit" className="w-full h-14 rounded-2xl gradient-bg border-0 text-[11px] font-black uppercase tracking-[0.25em] shadow-xl shadow-primary/25 hover:scale-[1.01] active:scale-[0.99] transition-transform">
            {authMode === 'signin' ? 'Sign In' : 'Create Account'}
          </Button>

          <div className="relative py-2">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-border" /></div>
            <div className="relative flex justify-center">
              <span className="bg-card px-4 text-[10px] font-black uppercase tracking-[0.25em] text-muted-foreground">
                or continue with
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Button type="button" variant="outline" className="h-12 rounded-2xl gap-2 border-border/60 bg-muted/10 hover:bg-muted/40" onClick={handleSubmit}>
              <svg className="w-4 h-4" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" /><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" /><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" /><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" /></svg>
              Google
            </Button>
            <Button type="button" variant="outline" className="h-12 rounded-2xl gap-2 border-border/60 bg-muted/10 hover:bg-muted/40" onClick={handleSubmit}>
              <svg className="w-4 h-4" fill="#1877F2" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
              Facebook
            </Button>
          </div>

          <p className="text-center text-sm text-muted-foreground">
            {authMode === 'signin' ? "Don't have an account?" : 'Already have an account?'}{' '}
            <button
              type="button"
              onClick={() => setAuthMode(authMode === 'signin' ? 'signup' : 'signin')}
              className="text-primary font-black tracking-tight hover:underline underline-offset-4"
            >
              {authMode === 'signin' ? 'Sign Up' : 'Sign In'}
            </button>
          </p>
        </form>
      </DialogContent>
    </Dialog>
  );
}
