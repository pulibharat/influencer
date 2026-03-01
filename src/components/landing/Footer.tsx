import { Link } from 'react-router-dom';
import { Instagram, Youtube, Twitter, Linkedin, Facebook, Send } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-white dark:bg-card pt-32 pb-16 border-t border-border/50">
      <div className="container mx-auto px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 mb-24">
          <div className="md:col-span-4">
            <div className="flex items-center gap-3 mb-8">
              <img src="/whisk_udaan_setu.png" alt="Whisk Udaan Setu" className="h-12 w-12 rounded-full object-cover border-2 border-primary/20" />
              <span className="font-display text-2xl font-bold tracking-tight">Udaan Setu</span>
            </div>
            <p className="text-muted-foreground leading-relaxed mb-10 max-w-sm">
              The definitive platform for the next generation of creator-driven commerce. We bridge data with creativity to build legendary brands.
            </p>
            <div className="flex gap-4">
              {[Instagram, Youtube, Twitter, Linkedin].map((Icon, i) => (
                <a key={i} href="#" className="w-12 h-12 rounded-2xl bg-gray-50 dark:bg-muted/30 flex items-center justify-center text-muted-foreground hover:bg-primary/10 hover:text-primary transition-all duration-300">
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          <div className="md:col-span-2">
            <h4 className="font-display font-bold text-lg mb-8 tracking-tight">Ecosystem</h4>
            <ul className="space-y-5">
              {['For Brands', 'For Creators', 'Case Studies', 'AI Search', 'Marketplace'].map(item => (
                <li key={item}>
                  <a href="#" className="text-[15px] font-semibold text-muted-foreground hover:text-primary transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2">
            <h4 className="font-display font-bold text-lg mb-8 tracking-tight">Platform</h4>
            <ul className="space-y-5">
              {['About Us', 'Careers', 'Brand Assets', 'Blog', 'Contact'].map(item => (
                <li key={item}>
                  <a href="#" className="text-[15px] font-semibold text-muted-foreground hover:text-primary transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-4">
            <h4 className="font-display font-bold text-lg mb-8 tracking-tight">Stay Ahead</h4>
            <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
              Join 15,000+ marketers receiving our weekly newsletter on creator trends and ROI strategies.
            </p>
            <div className="relative group">
              <input
                type="email"
                placeholder="Enter your email address"
                className="w-full bg-gray-50 dark:bg-muted/30 border border-gray-100 dark:border-border/50 rounded-2xl py-4.5 pl-6 pr-16 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-semibold"
              />
              <button className="absolute right-2 top-2 bottom-2 w-12 rounded-xl gradient-bg flex items-center justify-center text-white shadow-lg shadow-primary/20 hover:scale-105 transition-transform">
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        <div className="pt-16 border-t border-gray-100 dark:border-border/50 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-sm font-semibold text-muted-foreground">© 2026 Udaan Setu. All rights reserved.</p>
          <div className="flex gap-10">
            {['Privacy Protocol', 'Terms of Service', 'Cookie Management'].map(item => (
              <a key={item} href="#" className="text-[13px] font-bold text-muted-foreground/60 hover:text-primary transition-colors uppercase tracking-widest">{item}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
