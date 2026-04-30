import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { products } from '../data/products';
import ProductCard from '../components/ui/ProductCard';
import { SlidersHorizontal, ChevronDown } from 'lucide-react';
import { pageTransition } from '../animations/variants';

const categories = ["Tout", "Visage", "Corps", "Cheveux", "Parfums", "Kits"];

const Shop = () => {
  const [selectedCategory, setSelectedCategory] = useState("Tout");
  const [sortBy, setSortBy] = useState("Popularité");

  const filteredProducts = products.filter(p => 
    selectedCategory === "Tout" || p.category === selectedCategory
  );

  return (
    <motion.main
      variants={pageTransition}
      initial="initial"
      animate="animate"
      exit="exit"
      className="pt-32 pb-24"
    >
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl mb-4">La Boutique</h1>
          <p className="text-dark/40 uppercase tracking-[0.4em] text-xs font-bold">Trouvez votre rituel parfait</p>
        </div>

        {/* Toolbar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-12 py-6 border-y border-primary/10">
          {/* Categories */}
          <div className="flex items-center gap-2 overflow-x-auto pb-4 md:pb-0 no-scrollbar w-full md:w-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-6 py-2 rounded-full text-sm font-bold uppercase tracking-widest transition-all whitespace-nowrap ${
                  selectedCategory === cat 
                    ? 'bg-accent text-white shadow-lg' 
                    : 'text-accent/50 hover:text-accent hover:bg-primary/5'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Sort & Filter */}
          <div className="flex items-center gap-6 w-full md:w-auto justify-between md:justify-end">
            <div className="flex items-center gap-2 text-accent cursor-pointer group">
              <span className="text-sm font-bold uppercase tracking-widest">Trier par: {sortBy}</span>
              <ChevronDown size={16} className="group-hover:rotate-180 transition-transform duration-300" />
            </div>
            <button className="flex items-center gap-2 bg-primary/10 text-primary px-6 py-2 rounded-full font-bold uppercase tracking-widest hover:bg-primary hover:text-white transition-all">
              <SlidersHorizontal size={16} />
              <span>Filtres</span>
            </button>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 lg:gap-12">
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </AnimatePresence>
        </div>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <div className="py-24 text-center">
            <p className="text-2xl font-serif text-accent/50">Aucun produit trouvé dans cette catégorie.</p>
          </div>
        )}
      </div>
    </motion.main>
  );
};

export default Shop;
