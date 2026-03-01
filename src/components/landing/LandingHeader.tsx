import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '@/contexts/ThemeContext';

export function LandingHeader() {
  const { setShowAuthModal, setAuthMode } = useAuth();
  const { theme, setTheme } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const openSignIn = () => { setAuthMode('signin'); setShowAuthModal(true); setMobileOpen(false); };
  const openSignUp = () => { setAuthMode('signup'); setShowAuthModal(true); setMobileOpen(false); };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'h-20 bg-white/80 dark:bg-background/80 backdrop-blur-xl border-b border-white/40 dark:border-white/10 shadow-sm' : 'h-24 bg-transparent'}`}>
      <div className="container mx-auto flex items-center justify-between h-full px-8">
        <Link to="/" className="flex items-center gap-3 group">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-3"
          >
            <img src="/whisk_udaan_setu.png" alt="Whisk Udaan Setu" className="h-12 w-12 rounded-full object-cover border-2 border-primary/20" />
            <span className="font-display text-2xl font-bold tracking-tighter bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent group-hover:to-primary transition-all duration-300">
              Udaan Setu
            </span>
          </motion.div>
        </Link>
        <div className="flex items-center gap-8">
          <nav className="hidden lg:flex items-center gap-10">
            {['Marketplace', 'Technology', 'Network', 'Pricing'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase().replace(/ /g, '-')}`}
                className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground hover:text-primary transition-colors duration-300 relative group"
              >
                {item}
                <span className="absolute -bottom-1.5 left-0 w-0 h-[2px] bg-primary transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-6">
            {/* Theme Toggle */}
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2.5 rounded-xl hover:bg-primary/10 text-muted-foreground hover:text-primary transition-all duration-300 group"
            >
              {theme === 'dark' ? (
                <Sun className="w-5 h-5 group-hover:rotate-90 transition-transform" />
              ) : (
                <Moon className="w-5 h-5 group-hover:-rotate-12 transition-transform" />
              )}
            </button>

            <Button
              variant="ghost"
              className="text-xs font-black uppercase tracking-widest hover:bg-primary/10 hover:text-primary transition-all rounded-xl px-6"
              onClick={openSignIn}
            >
              Login
            </Button>
            <Button
              className="gradient-bg border-0 text-xs font-black uppercase tracking-widest px-8 py-6 rounded-xl shadow-[0_8px_20px_rgba(0,184,212,0.3)] hover:shadow-[0_12px_24px_rgba(0,184,212,0.4)] hover:scale-105 transition-all duration-300"
              onClick={openSignUp}
            >
              Join Network
            </Button>
          </div>
        </div>

        <button className="lg:hidden p-3 rounded-xl hover:bg-gray-100 dark:hover:bg-muted transition-colors" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white/95 dark:bg-background/95 backdrop-blur-xl border-b border-border overflow-hidden px-8 py-10 space-y-8"
          >
            {['Marketplace', 'Technology', 'Network', 'Pricing'].map((item) => (
              <a key={item} href={`#${item.toLowerCase().replace(/ /g, '-')}`} className="block text-lg font-black uppercase tracking-widest hover:text-primary transition-colors" onClick={() => setMobileOpen(false)}>
                {item}
              </a>
            ))}
            <div className="flex flex-col gap-4 pt-6 border-t border-border/50">
              <Button variant="outline" className="w-full font-black uppercase tracking-widest rounded-xl py-6" onClick={openSignIn}>Login</Button>
              <Button className="w-full gradient-bg border-0 font-black uppercase tracking-widest rounded-xl py-6" onClick={openSignUp}>Join Network</Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
