import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { LandingHeader } from '@/components/landing/LandingHeader';
import { Hero } from '@/components/landing/Hero';
import { Stats } from '@/components/landing/Stats';
import { ProcessSection } from '@/components/landing/ProcessSection';
import { FeaturedInfluencers } from '@/components/landing/FeaturedInfluencers';
import { BrandMarquee } from '@/components/landing/BrandMarquee';
import { Footer } from '@/components/landing/Footer';
import { AIFeatures } from '@/components/landing/AIFeatures';
import { FAQSection } from '@/components/landing/FAQSection';
import { ParallaxBackground } from '@/components/landing/ParallaxBackground';
import { motion, useScroll, useSpring } from 'framer-motion';

const Index = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    if (isAuthenticated) navigate('/dashboard');
  }, [isAuthenticated, navigate]);

  return (
    <div className="relative min-h-screen bg-white dark:bg-background selection:bg-primary/20 overflow-x-hidden">
      {/* Dynamic Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1.5 bg-primary z-[60] origin-left shadow-[0_0_15px_rgba(0,184,212,0.5)]"
        style={{ scaleX }}
      />

      {/* Floating Parallax Background Elements */}
      <ParallaxBackground />

      <LandingHeader />

      <main className="relative z-10">
        {/* Subtle radial background glow */}
        <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_50%_-20%,hsl(var(--primary)/0.05),transparent_70%)] pointer-events-none" />

        <Hero />

        <BrandMarquee />

        <div className="relative backdrop-blur-[2px]">
          {/* Section Dividers / Ornaments */}
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />

          <Stats />

          <div className="absolute left-1/2 -translate-x-1/2 w-[1px] h-32 bg-gradient-to-b from-primary/50 to-transparent" />

          <FeaturedInfluencers />
          <AIFeatures />

          <FAQSection />

          <ProcessSection />
        </div>

        {/* Brand Empowerment / Final CTA */}
        <section className="py-40 relative overflow-hidden bg-primary/[0.02]">
          <div className="container mx-auto px-6 relative z-10">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="max-w-5xl mx-auto glass-card p-16 md:p-24 text-center border-primary/10 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-[100px] -translate-y-1/2 translate-x-1/2" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/5 blur-[100px] translate-y-1/2 -translate-x-1/2" />

              <span className="text-xs font-black text-primary uppercase tracking-[0.4em] mb-8 block">Next Generation Commerce</span>
              <h2 className="text-5xl md:text-8xl font-display font-bold mb-12 tracking-tighter leading-[0.9]">
                The Future is <br /> <span className="gradient-text italic">In Your Hands.</span>
              </h2>

              <div className="flex flex-col sm:flex-row gap-8 justify-center items-center">
                <button
                  className="gradient-bg border-0 text-xl font-black uppercase tracking-widest px-12 py-8 rounded-2xl text-white shadow-2xl shadow-primary/30 hover:shadow-primary/50 hover:scale-105 transition-all duration-300"
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                >
                  Join the Elite Network
                </button>
                <div className="flex flex-col items-center sm:items-start">
                  <div className="flex -space-x-3 mb-3">
                    {[1, 2, 3, 4, 5].map(i => (
                      <img
                        key={i}
                        src={`https://i.pravatar.cc/100?u=${i + 10}`}
                        className="w-12 h-12 rounded-full border-4 border-white dark:border-card shadow-lg object-cover"
                        alt="user"
                      />
                    ))}
                    <div className="w-12 h-12 rounded-full border-4 border-white dark:border-card bg-primary/10 flex items-center justify-center shadow-lg">
                      <span className="text-[10px] font-black text-primary">+2K</span>
                    </div>
                  </div>
                  <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Trusted by 2,000+ creators this month</p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
