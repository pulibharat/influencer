import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import type { UserRole } from '@/data/mockData';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { X, Mail, Lock, User, Building2, Megaphone } from 'lucide-react';

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
      <DialogContent className="sm:max-w-md p-0 overflow-hidden border-border/50 gap-0">
        {/* Header */}
        <div className="gradient-bg p-6 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-lg bg-primary-foreground/20 flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">IM</span>
            </div>
            <span className="font-display text-xl font-bold text-primary-foreground">InfluMatch</span>
          </div>
          <p className="text-primary-foreground/80 text-sm">
            {authMode === 'signin' ? 'Welcome back!' : 'Create your account'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Role selection */}
          <div>
            <Label className="text-sm font-medium mb-2 block">I am a</Label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setRole('client')}
                className={`flex items-center gap-2 p-3 rounded-lg border-2 transition-all ${
                  role === 'client' ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'
                }`}
              >
                <Building2 className={`w-5 h-5 ${role === 'client' ? 'text-primary' : 'text-muted-foreground'}`} />
                <div className="text-left">
                  <p className="text-sm font-medium">Client</p>
                  <p className="text-xs text-muted-foreground">Brand / Business</p>
                </div>
              </button>
              <button
                type="button"
                onClick={() => setRole('influencer')}
                className={`flex items-center gap-2 p-3 rounded-lg border-2 transition-all ${
                  role === 'influencer' ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'
                }`}
              >
                <Megaphone className={`w-5 h-5 ${role === 'influencer' ? 'text-primary' : 'text-muted-foreground'}`} />
                <div className="text-left">
                  <p className="text-sm font-medium">Influencer</p>
                  <p className="text-xs text-muted-foreground">Content Creator</p>
                </div>
              </button>
            </div>
          </div>

          {authMode === 'signup' && (
            <div>
              <Label htmlFor="name" className="text-sm">Full Name</Label>
              <div className="relative mt-1">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input id="name" value={name} onChange={e => setName(e.target.value)} placeholder="Your full name" className="pl-10" />
              </div>
            </div>
          )}

          <div>
            <Label htmlFor="email" className="text-sm">Email</Label>
            <div className="relative mt-1">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" className="pl-10" />
            </div>
          </div>

          <div>
            <Label htmlFor="password" className="text-sm">Password</Label>
            <div className="relative mt-1">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input id="password" type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" className="pl-10" />
            </div>
          </div>

          <Button type="submit" className="w-full gradient-bg border-0">
            {authMode === 'signin' ? 'Sign In' : 'Create Account'}
          </Button>

          <div className="relative py-2">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-border" /></div>
            <div className="relative flex justify-center"><span className="bg-card px-3 text-xs text-muted-foreground">or continue with</span></div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Button type="button" variant="outline" className="gap-2" onClick={handleSubmit}>
              <svg className="w-4 h-4" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
              Google
            </Button>
            <Button type="button" variant="outline" className="gap-2" onClick={handleSubmit}>
              <svg className="w-4 h-4" fill="#1877F2" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              Facebook
            </Button>
          </div>

          <p className="text-center text-sm text-muted-foreground">
            {authMode === 'signin' ? "Don't have an account?" : 'Already have an account?'}{' '}
            <button type="button" onClick={() => setAuthMode(authMode === 'signin' ? 'signup' : 'signin')} className="text-primary font-medium hover:underline">
              {authMode === 'signin' ? 'Sign Up' : 'Sign In'}
            </button>
          </p>
        </form>
      </DialogContent>
    </Dialog>
  );
}
