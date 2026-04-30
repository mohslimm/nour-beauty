import React from 'react';
import { motion } from 'framer-motion';
import Button from '../ui/Button';

const HeroSection = () => {
  const words = "Révélez votre beauté naturelle".split(" ");

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.3,
      },
    },
  };

  const wordVariant = {
    hidden: { y: 50, opacity: 0, filter: "blur(6px)" },
    visible: {
      y: 0,
      opacity: 1,
      filter: "blur(0px)",
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Background Video Mock/Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=80&w=1920" 
          alt="Hammam Ritual" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-accent/50 mix-blend-multiply" />
      </div>

      {/* Floating Bubbles */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          animate={{
            y: [0, -30, 0],
            x: [0, 20, 0],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 10 + Math.random() * 5,
            repeat: Infinity,
            delay: i * 0.5,
          }}
          className="absolute bg-white rounded-full blur-xl z-10"
          style={{
            width: `${40 + Math.random() * 100}px`,
            height: `${40 + Math.random() * 100}px`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
        />
      ))}

      {/* Content */}
      <div className="relative z-20 text-center px-6 max-w-4xl">
        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className="flex flex-wrap justify-center gap-x-4 mb-6"
        >
          {words.map((word, i) => (
            <motion.span 
              key={i} 
              variants={wordVariant}
              className="text-5xl md:text-7xl lg:text-8xl font-serif text-white tracking-tight"
            >
              {word}
            </motion.span>
          ))}
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="text-lg md:text-xl text-white/90 mb-12 font-sans tracking-wide max-w-2xl mx-auto"
        >
          Recettes ancestrales algériennes, formules modernes. 
          L'excellence des soins naturels au service de votre éclat.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.2, duration: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6"
        >
          <Button variant="primary" className="w-full sm:w-auto">
            Découvrir la collection
          </Button>
          <Button variant="ghost" className="w-full sm:w-auto border-white text-white hover:bg-white/20">
            Notre histoire
          </Button>
        </motion.div>

        {/* Badges */}
        <div className="absolute -bottom-32 left-0 right-0 hidden md:flex justify-center gap-12">
          {['100% Naturel', 'Sans Paraben', 'Fabriqué en Algérie 🇩🇿'].map((badge, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5 + i * 0.1, type: 'spring' }}
              className="flex items-center gap-2 text-white/60 text-xs uppercase tracking-widest font-bold"
            >
              <span className="w-1 h-1 bg-primary rounded-full" />
              {badge}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
      >
        <span className="text-[10px] uppercase tracking-[0.3em] text-white/50 font-bold">Scroll</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-white/50 to-transparent" />
      </motion.div>
    </section>
  );
};

export default HeroSection;
