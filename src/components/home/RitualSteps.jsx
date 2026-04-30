import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Droplets, Wind } from 'lucide-react';

const steps = [
  {
    title: "Nettoyer",
    arabic: "تنظيف",
    description: "Éliminez les impuretés avec nos savons ancestraux et ghassoul purifié.",
    icon: <Wind className="w-8 h-8" />,
    color: "bg-sage/10",
    textColor: "text-sage"
  },
  {
    title: "Nourrir",
    arabic: "تغذية",
    description: "Hydratez en profondeur avec nos huiles précieuses et beurres naturels.",
    icon: <Droplets className="w-8 h-8" />,
    color: "bg-primary/10",
    textColor: "text-primary"
  },
  {
    title: "Sublimer",
    arabic: "تحسين",
    description: "Révélez l'éclat final avec nos sérums et brumes de rose.",
    icon: <Sparkles className="w-8 h-8" />,
    color: "bg-secondary/10",
    textColor: "text-secondary"
  }
];

const RitualSteps = () => {
  return (
    <section className="py-32 bg-bg relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-center mb-24">
          <h2 className="text-4xl md:text-5xl mb-4">Le Rituel Nour</h2>
          <p className="text-dark/40 uppercase tracking-[0.4em] text-xs font-bold">L'art du soin en 3 étapes</p>
        </div>

        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-16 lg:gap-24">
          {/* Connection Line (Desktop) */}
          <div className="absolute top-20 left-[15%] right-[15%] h-[1px] bg-gradient-to-r from-transparent via-primary/20 to-transparent hidden md:block" />

          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="relative flex flex-col items-center text-center group"
            >
              <div className={`w-24 h-24 rounded-full ${step.color} ${step.textColor} flex items-center justify-center mb-8 relative z-10 transition-transform duration-500 group-hover:scale-110 shadow-premium`}>
                {step.icon}
                <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-white flex items-center justify-center text-accent text-sm font-serif border border-primary/20">
                  {i + 1}
                </div>
              </div>
              <h3 className="text-2xl mb-2">{step.title}</h3>
              <p className="font-arabic text-primary/40 text-sm mb-4">{step.arabic}</p>
              <p className="text-dark/60 leading-relaxed max-w-[250px]">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* BERBER PATTERN DECORATION */}
      <div className="absolute top-0 right-0 w-64 h-64 opacity-[0.03] pointer-events-none -translate-y-1/2 translate-x-1/2">
        <svg viewBox="0 0 100 100" fill="currentColor">
          <path d="M50 0 L100 50 L50 100 L0 50 Z M50 10 L90 50 L50 90 L10 50 Z" />
        </svg>
      </div>
    </section>
  );
};

export default RitualSteps;
