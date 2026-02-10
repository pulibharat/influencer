import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="bg-foreground text-background/80 py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg gradient-bg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">IM</span>
              </div>
              <span className="font-display text-xl font-bold text-background">InfluMatch</span>
            </div>
            <p className="text-sm text-background/60">Connecting brands with India's top influencers for impactful collaborations.</p>
          </div>
          <div>
            <h4 className="font-display font-semibold text-background mb-4">Company</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-background transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-background transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-background transition-colors">Blog</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-display font-semibold text-background mb-4">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-background transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-background transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-background transition-colors">Cookie Policy</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-display font-semibold text-background mb-4">Contact</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="mailto:hello@influmatch.in" className="hover:text-background transition-colors">hello@influmatch.in</a></li>
              <li><span>Mumbai, India</span></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-background/20 pt-8 text-center text-sm text-background/50">
          © 2026 InfluMatch. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
