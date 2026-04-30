import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCartStore } from '../../store/cartStore';
import Button from '../ui/Button';
import { Link } from 'react-router-dom';

const CartDrawer = ({ isOpen, onClose }) => {
  const { items, updateQuantity, removeItem, getTotal } = useCartStore();
  const total = getTotal();
  const freeShippingLimit = 5000;
  const progress = Math.min((total / freeShippingLimit) * 100, 100);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-accent/20 backdrop-blur-sm z-[100]"
          />
          
          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-white z-[101] shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="p-6 border-b border-primary/10 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <ShoppingBag size={20} className="text-primary" />
                <h2 className="text-xl font-serif text-accent">Votre Panier</h2>
                <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full font-bold">
                  {items.length} items
                </span>
              </div>
              <button onClick={onClose} className="text-accent hover:rotate-90 transition-transform duration-300">
                <X size={24} />
              </button>
            </div>

            {/* Free Shipping Progress */}
            <div className="p-6 bg-bg/50">
              <p className="text-xs uppercase tracking-widest font-bold text-accent mb-2">
                {total >= freeShippingLimit 
                  ? "Félicitations ! Livraison offerte 🚚" 
                  : `Plus que ${freeShippingLimit - total} دج pour la livraison offerte`}
              </p>
              <div className="h-1.5 w-full bg-primary/10 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  className="h-full bg-primary"
                />
              </div>
            </div>

            {/* Items List */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center opacity-50">
                  <ShoppingBag size={48} className="mb-4 text-primary/30" />
                  <p className="font-serif text-xl mb-4 text-accent">Votre panier est vide</p>
                  <Button variant="ghost" onClick={onClose}>Découvrir le catalogue</Button>
                </div>
              ) : (
                items.map((item) => (
                  <motion.div 
                    layout
                    key={item.id} 
                    className="flex gap-4 group"
                  >
                    <div className="w-20 h-24 bg-bg rounded-xl overflow-hidden flex-shrink-0 border border-primary/5">
                      <img 
                        src={`https://images.unsplash.com/photo-${item.id === 1 ? '1556228412-afc71a3f8197' : item.id === 2 ? '1608248597279-f99d160bfcbc' : '1602930301355-dc97c8a1d597'}?auto=format&fit=crop&q=80&w=200`}
                        alt={item.name} 
                        className="w-full h-full object-contain p-2"
                      />
                    </div>
                    <div className="flex-1 flex flex-col">
                      <div className="flex justify-between">
                        <h3 className="font-serif text-accent line-clamp-1">{item.name}</h3>
                        <button 
                          onClick={() => removeItem(item.id)}
                          className="text-dark/20 hover:text-red-500 transition-colors"
                        >
                          <X size={14} />
                        </button>
                      </div>
                      <p className="text-xs text-primary font-bold mb-2">{item.volume}</p>
                      <div className="mt-auto flex justify-between items-center">
                        <div className="flex items-center gap-3 border border-primary/10 rounded-full px-2 py-1">
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="text-accent hover:text-primary"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="text-xs font-mono w-4 text-center">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="text-accent hover:text-primary"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                        <p className="font-mono text-accent">{(item.pricePromo || item.price) * item.quantity} دج</p>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="p-6 border-t border-primary/10 bg-white space-y-4">
                <div className="flex justify-between items-end">
                  <span className="text-xs uppercase tracking-widest font-bold text-dark/40">Total Estimé</span>
                  <span className="text-2xl font-mono text-accent">{total} دج</span>
                </div>
                <Link to="/checkout" onClick={onClose}>
                  <Button className="w-full flex items-center justify-center gap-2 py-4">
                    Commander
                    <ArrowRight size={18} />
                  </Button>
                </Link>
                <p className="text-[10px] text-center text-dark/40 uppercase tracking-widest">
                  TVA incluse. Frais de port calculés à l'étape suivante.
                </p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;
