import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useParams, Link } from 'react-router-dom';
import { products } from '../data/products';
import { Star, Minus, Plus, Heart, Share2, ShieldCheck, Truck, RefreshCw } from 'lucide-react';
import Button from '../components/ui/Button';
import { useCartStore } from '../store/cartStore';
import { toast } from 'react-hot-toast';

const ProductDetail = () => {
  const { slug } = useParams();
  const product = products.find(p => p.slug === slug) || products[0];
  const [quantity, setQuantity] = useState(1);
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = () => {
    addItem(product, quantity);
    toast.success(`${quantity} ${product.name} ajouté(s) au panier`, {
      style: { background: '#4A1942', color: '#fff', borderRadius: '20px' },
      icon: '✨'
    });
  };

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="pt-32 pb-24"
    >
      <div className="container mx-auto px-6">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-xs uppercase tracking-widest font-bold text-dark/40 mb-12">
          <Link to="/" className="hover:text-primary transition-colors">Accueil</Link>
          <span>/</span>
          <Link to="/shop" className="hover:text-primary transition-colors">Boutique</Link>
          <span>/</span>
          <span className="text-accent">{product.name}</span>
        </div>

        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
          {/* Gallery */}
          <div className="flex-1">
            <div className="sticky top-32 space-y-4">
              <motion.div 
                layoutId={`img-${product.id}`}
                className="aspect-square rounded-3xl bg-bg border border-primary/5 overflow-hidden p-12"
              >
                <img 
                  src={`https://images.unsplash.com/photo-${product.id === 1 ? '1556228412-afc71a3f8197' : '1608248597279-f99d160bfcbc'}?auto=format&fit=crop&q=80&w=1200`} 
                  alt={product.name}
                  className="w-full h-full object-contain"
                />
              </motion.div>
              <div className="grid grid-cols-4 gap-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="aspect-square rounded-xl bg-bg border border-primary/5 cursor-pointer hover:border-primary transition-colors overflow-hidden">
                    <img 
                      src={`https://images.unsplash.com/photo-${product.id === 1 ? '1556228412-afc71a3f8197' : '1608248597279-f99d160bfcbc'}?auto=format&fit=crop&q=80&w=300`} 
                      alt="" 
                      className="w-full h-full object-cover opacity-50 hover:opacity-100 transition-opacity"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Info */}
          <div className="flex-1 space-y-8">
            <div>
              <div className="flex items-center gap-4 mb-4">
                <span className="bg-primary/10 text-primary text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">
                  {product.category}
                </span>
                {product.isBestSeller && (
                  <span className="bg-accent text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">
                    Best Seller
                  </span>
                )}
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl mb-4">{product.name}</h1>
              <p className="font-arabic text-primary text-xl mb-4">{product.nameAr}</p>
              
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-1 text-secondary">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} fill={i < Math.floor(product.rating) ? "currentColor" : "none"} />
                  ))}
                  <span className="ml-2 text-sm font-bold text-dark/60">({product.reviewCount} avis)</span>
                </div>
                <div className="h-4 w-[1px] bg-primary/20" />
                <p className="text-primary text-sm font-bold uppercase tracking-widest">En stock ({product.stockCount})</p>
              </div>
            </div>

            <div className="flex items-baseline gap-4">
              <span className="text-4xl font-mono text-accent">{product.pricePromo || product.price} دج</span>
              {product.pricePromo && (
                <span className="text-xl font-mono text-dark/20 line-through">{product.price} دج</span>
              )}
            </div>

            <p className="text-dark/60 leading-relaxed text-lg">
              {product.description}
            </p>

            {/* Selection */}
            <div className="space-y-6 pt-4 border-t border-primary/10">
              <div className="flex items-center gap-8">
                <div className="flex items-center gap-4 bg-bg rounded-full px-4 py-2 border border-primary/5">
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="text-accent hover:text-primary p-1">
                    <Minus size={20} />
                  </button>
                  <span className="font-mono text-xl w-8 text-center">{quantity}</span>
                  <button onClick={() => setQuantity(quantity + 1)} className="text-accent hover:text-primary p-1">
                    <Plus size={20} />
                  </button>
                </div>
                <Button className="flex-1 py-4" onClick={handleAddToCart}>
                  Ajouter au panier — { (product.pricePromo || product.price) * quantity } دج
                </Button>
                <button className="p-4 rounded-full border border-primary/10 hover:bg-primary/5 transition-all">
                  <Heart size={24} className="text-accent" />
                </button>
              </div>
            </div>

            {/* Reassurance */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-8 border-y border-primary/10">
              <div className="flex flex-col items-center text-center gap-2">
                <Truck size={24} className="text-primary" />
                <p className="text-[10px] font-bold uppercase tracking-widest">Livraison 48h</p>
              </div>
              <div className="flex flex-col items-center text-center gap-2">
                <ShieldCheck size={24} className="text-primary" />
                <p className="text-[10px] font-bold uppercase tracking-widest">100% Naturel</p>
              </div>
              <div className="flex flex-col items-center text-center gap-2">
                <RefreshCw size={24} className="text-primary" />
                <p className="text-[10px] font-bold uppercase tracking-widest">Retour 14 jours</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.main>
  );
};

export default ProductDetail;
