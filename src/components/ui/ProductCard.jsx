import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, ShoppingBag, Star } from 'lucide-react';
import { useCartStore } from '../../store/cartStore';
import { toast } from 'react-hot-toast';

const ProductCard = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = (e) => {
    e.preventDefault();
    addItem(product);
    toast.success(`${product.name} ajouté au panier`, {
      style: {
        background: '#4A1942',
        color: '#fff',
        borderRadius: '20px',
      },
      icon: '✨'
    });
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-bg border border-primary/5">
        <motion.img
          src={`https://images.unsplash.com/photo-${product.id === 1 ? '1556228412-afc71a3f8197' : product.id === 2 ? '1608248597279-f99d160bfcbc' : '1602930301355-dc97c8a1d597'}?auto=format&fit=crop&q=80&w=800`}
          alt={product.name}
          className="h-full w-full object-contain p-8 transition-transform duration-700 group-hover:scale-110"
        />
        
        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          {product.isNew && (
            <span className="bg-white/80 backdrop-blur-sm text-accent text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest border border-primary/20">
              Nouveau
            </span>
          )}
          {product.isBestSeller && (
            <span className="bg-primary text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest shadow-sm">
              Best Seller
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button className="absolute top-4 right-4 p-2 rounded-full bg-white/80 backdrop-blur-sm text-accent hover:bg-primary hover:text-white transition-all duration-300 shadow-sm border border-primary/10">
          <Heart size={16} />
        </button>

        {/* Quick Add Button */}
        <AnimatePresence>
          {isHovered && (
            <motion.button
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              onClick={handleAddToCart}
              className="absolute bottom-4 left-4 right-4 bg-accent text-white py-3 rounded-xl flex items-center justify-center gap-2 font-medium shadow-xl hover:bg-accent/90 transition-colors"
            >
              <ShoppingBag size={18} />
              <span>Ajouter au panier</span>
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {/* Info */}
      <div className="mt-4 space-y-1">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-[10px] text-primary font-bold uppercase tracking-widest">{product.category}</p>
            <h3 className="text-lg font-serif group-hover:text-primary transition-colors">{product.name}</h3>
          </div>
          <div className="flex items-center gap-1 text-secondary">
            <Star size={12} fill="currentColor" />
            <span className="text-xs font-bold">{product.rating}</span>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <p className="text-xl font-mono text-accent">{product.pricePromo || product.price} دج</p>
          {product.pricePromo && (
            <p className="text-sm font-mono text-dark/30 line-through">{product.price} دج</p>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
