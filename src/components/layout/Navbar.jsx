import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Heart, User, Search, Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useCartStore } from '../../store/cartStore';

const Navbar = ({ onOpenCart }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const itemCount = useCartStore((state) => state.getItemCount());
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Accueil', path: '/' },
    { name: 'Boutique', path: '/shop' },
    { name: 'Rituel', path: '/ritual' },
    { name: 'À propos', path: '/about' },
  ];

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? 'py-3 glass shadow-premium' : 'py-6 bg-transparent'
      }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        {/* Mobile Menu Toggle */}
        <button 
          className="lg:hidden text-accent"
          onClick={() => setIsMobileMenuOpen(true)}
        >
          <Menu size={24} />
        </button>

        {/* Nav Links - Left (Desktop) */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.slice(0, 2).map((link) => (
            <Link 
              key={link.name} 
              to={link.path}
              className={`text-sm uppercase tracking-widest font-bold transition-colors hover:text-primary ${
                location.pathname === link.path ? 'text-primary' : 'text-accent'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Logo */}
        <Link to="/" className="flex flex-col items-center group">
          <span className="text-2xl lg:text-3xl font-serif text-accent tracking-tighter group-hover:text-primary transition-colors">
            Nour Beauty
          </span>
          <span className="text-[10px] lg:text-xs font-arabic text-secondary -mt-1 group-hover:text-accent transition-colors">
            نور بيوتي
          </span>
        </Link>

        {/* Nav Links - Right (Desktop) */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.slice(2).map((link) => (
            <Link 
              key={link.name} 
              to={link.path}
              className={`text-sm uppercase tracking-widest font-bold transition-colors hover:text-primary ${
                location.pathname === link.path ? 'text-primary' : 'text-accent'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Icons */}
        <div className="flex items-center gap-4 lg:gap-6 text-accent">
          <button className="hover:text-primary transition-colors hidden sm:block">
            <Search size={20} />
          </button>
          <Link to="/wishlist" className="hover:text-primary transition-colors relative hidden sm:block">
            <Heart size={20} />
          </Link>
          <button 
            onClick={onOpenCart}
            className="hover:text-primary transition-colors relative"
          >
            <ShoppingBag size={20} />
            {itemCount > 0 && (
              <motion.span 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-2 -right-2 bg-primary text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-sm"
              >
                {itemCount}
              </motion.span>
            )}
          </button>
          <Link to="/login" className="hover:text-primary transition-colors">
            <User size={20} />
          </Link>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '-100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '-100%' }}
            className="fixed inset-0 z-[60] bg-bg flex flex-col p-8"
          >
            <div className="flex justify-between items-center mb-12">
              <span className="text-2xl font-serif text-accent">Nour Beauty</span>
              <button onClick={() => setIsMobileMenuOpen(false)} className="text-accent">
                <X size={32} />
              </button>
            </div>
            <div className="flex flex-col gap-8">
              {navLinks.map((link) => (
                <Link 
                  key={link.name} 
                  to={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-3xl font-serif text-accent hover:text-primary"
                >
                  {link.name}
                </Link>
              ))}
            </div>
            <div className="mt-auto flex gap-6 text-accent">
              <Heart size={24} />
              <Search size={24} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
