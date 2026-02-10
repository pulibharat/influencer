import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function LandingHeader() {
  const { setShowAuthModal, setAuthMode } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  const openSignIn = () => { setAuthMode('signin'); setShowAuthModal(true); };
  const openSignUp = () => { setAuthMode('signup'); setShowAuthModal(true); };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border/50">
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg gradient-bg flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-sm">IM</span>
          </div>
          <span className="font-display text-xl font-bold gradient-text">InfluMatch</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          <a href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Features</a>
          <a href="#how-it-works" className="text-sm text-muted-foreground hover:text-foreground transition-colors">How it Works</a>
          <a href="#pricing" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Pricing</a>
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <Button variant="ghost" size="sm" onClick={openSignIn}>Sign In</Button>
          <Button size="sm" className="gradient-bg border-0" onClick={openSignUp}>Sign Up</Button>
        </div>

        <button className="md:hidden" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-background border-b border-border p-4 space-y-4 animate-fade-in">
          <a href="#features" className="block text-sm text-muted-foreground">Features</a>
          <a href="#how-it-works" className="block text-sm text-muted-foreground">How it Works</a>
          <a href="#pricing" className="block text-sm text-muted-foreground">Pricing</a>
          <div className="flex gap-3 pt-2">
            <Button variant="ghost" size="sm" onClick={openSignIn}>Sign In</Button>
            <Button size="sm" className="gradient-bg border-0" onClick={openSignUp}>Sign Up</Button>
          </div>
        </div>
      )}
    </header>
  );
}
