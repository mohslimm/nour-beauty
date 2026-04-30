import React from 'react';
import { Link } from 'react-router-dom';
import { Camera, Share2, Globe, Phone, Mail, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-bg border-t border-primary/10 pt-24 pb-12">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
          {/* Brand */}
          <div className="space-y-8">
            <Link to="/" className="flex flex-col">
              <span className="text-3xl font-serif text-accent tracking-tighter">Nour Beauty</span>
              <span className="text-sm font-arabic text-secondary -mt-1">نور بيوتي</span>
            </Link>
            <p className="text-dark/60 leading-relaxed">
              La beauté naturelle, façon algérienne. Des soins inspirés par l'héritage et sublimés par la science.
            </p>
            <div className="flex gap-4 text-accent">
              <Camera size={20} className="hover:text-primary cursor-pointer transition-colors" />
              <Share2 size={20} className="hover:text-primary cursor-pointer transition-colors" />
              <Globe size={20} className="hover:text-primary cursor-pointer transition-colors" />
            </div>
          </div>

          {/* Boutique */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.3em] font-bold text-accent mb-8">Boutique</h4>
            <ul className="space-y-4 text-dark/60 text-sm font-bold uppercase tracking-widest">
              <li><Link to="/shop" className="hover:text-primary transition-colors">Tous les produits</Link></li>
              <li><Link to="/shop" className="hover:text-primary transition-colors">Meilleures Ventes</Link></li>
              <li><Link to="/shop" className="hover:text-primary transition-colors">Nouveautés</Link></li>
              <li><Link to="/shop" className="hover:text-primary transition-colors">Kits Cadeaux</Link></li>
            </ul>
          </div>

          {/* Aide */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.3em] font-bold text-accent mb-8">Aide</h4>
            <ul className="space-y-4 text-dark/60 text-sm font-bold uppercase tracking-widest">
              <li><Link to="/shipping" className="hover:text-primary transition-colors">Livraison (48 Wilayas)</Link></li>
              <li><Link to="/returns" className="hover:text-primary transition-colors">Retours & Échanges</Link></li>
              <li><Link to="/faq" className="hover:text-primary transition-colors">FAQ</Link></li>
              <li><Link to="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.3em] font-bold text-accent mb-8">Contact</h4>
            <ul className="space-y-6 text-dark/60 text-sm font-bold">
              <li className="flex items-center gap-4">
                <MapPin size={18} className="text-primary" />
                <span>Hydra, Alger, Algérie</span>
              </li>
              <li className="flex items-center gap-4">
                <Phone size={18} className="text-primary" />
                <span>+213 (0) 550 00 00 00</span>
              </li>
              <li className="flex items-center gap-4">
                <Mail size={18} className="text-primary" />
                <span>contact@nourbeauty.dz</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-12 border-t border-primary/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-[10px] uppercase tracking-widest text-dark/40 font-bold">
            © 2026 Nour Beauty. Tous droits réservés.
          </p>
          <div className="flex gap-8">
            <Link to="/legal" className="text-[10px] uppercase tracking-widest text-dark/40 font-bold hover:text-primary">Mentions Légales</Link>
            <Link to="/privacy" className="text-[10px] uppercase tracking-widest text-dark/40 font-bold hover:text-primary">Confidentialité</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
