import React from 'react';
import { motion } from 'framer-motion';
import HeroSection from '../components/home/HeroSection';
import BestSellers from '../components/home/BestSellers';
import RitualSteps from '../components/home/RitualSteps';
import { pageTransition } from '../animations/variants';

const Home = () => {
  return (
    <motion.main
      variants={pageTransition}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <HeroSection />
      <BestSellers />
      <RitualSteps />
      
      {/* Brand Story Snippet */}
      <section className="py-32 bg-white overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
            <div className="flex-1 relative">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="relative z-10 rounded-2xl overflow-hidden aspect-square max-w-md mx-auto"
              >
                <img 
                  src="https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?auto=format&fit=crop&q=80&w=800" 
                  alt="Traditional Algerian Beauty"
                  className="w-full h-full object-cover"
                />
              </motion.div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-primary/5 rounded-full blur-3xl -z-10" />
            </div>
            
            <div className="flex-1 space-y-8">
              <h2 className="text-4xl md:text-5xl lg:text-6xl">L'Héritage Algérien</h2>
              <p className="text-xl font-serif text-primary italic">"Une beauté qui traverse le temps."</p>
              <p className="text-dark/60 leading-relaxed text-lg">
                Nour Beauty est née de la passion pour les secrets de beauté de nos grand-mères. 
                Nous avons parcouru l'Algérie, des montagnes de Kabylie aux oasis du Sahara, 
                pour sélectionner les ingrédients les plus purs et les sublimer dans des formules modernes et luxueuses.
              </p>
              <div className="pt-4">
                <button className="text-accent font-bold uppercase tracking-[0.2em] text-xs flex items-center gap-4 group">
                  Découvrir notre histoire
                  <div className="w-12 h-[1px] bg-accent group-hover:w-20 transition-all duration-300" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-32 bg-accent text-white">
        <div className="container mx-auto px-6 text-center max-w-3xl">
          <h2 className="text-white text-4xl md:text-5xl mb-8">Rejoignez le cercle Nour</h2>
          <p className="text-white/60 mb-12 text-lg">
            Inscrivez-vous pour recevoir nos conseils beauté, nos nouveautés et des offres exclusives.
          </p>
          <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="Votre email" 
              className="flex-1 bg-white/10 border border-white/20 rounded-full px-6 py-4 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all placeholder:text-white/30"
            />
            <button className="bg-primary text-white px-8 py-4 rounded-full font-bold uppercase tracking-widest hover:bg-white hover:text-accent transition-all duration-300">
              S'abonner
            </button>
          </form>
        </div>
      </section>
    </motion.main>
  );
};

export default Home;
