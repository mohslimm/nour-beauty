import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCartStore } from '../store/cartStore';
import Button from '../components/ui/Button';
import { ChevronRight, Truck, CreditCard, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import confetti from 'canvas-confetti';

const steps = ["Livraison", "Paiement", "Confirmation"];

const Checkout = () => {
  const [step, setStep] = useState(0);
  const { items, getTotal, clearCart } = useCartStore();
  const total = getTotal();
  const navigate = useNavigate();

  const handleNext = () => {
    if (step === 1) {
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#E8A0BF', '#C9A96E', '#4A1942']
      });
      clearCart();
      setStep(2);
    } else {
      setStep(step + 1);
    }
  };

  return (
    <main className="pt-32 pb-24 bg-bg min-h-screen">
      <div className="container mx-auto px-6 max-w-4xl">
        {/* Stepper */}
        <div className="flex justify-between mb-16 relative">
          <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-primary/10 -translate-y-1/2 -z-10" />
          {steps.map((s, i) => (
            <div key={s} className="flex flex-col items-center gap-2">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-500 ${
                i <= step ? 'bg-primary border-primary text-white' : 'bg-white border-primary/20 text-primary/20'
              }`}>
                {i < step ? <CheckCircle2 size={20} /> : i + 1}
              </div>
              <span className={`text-[10px] uppercase tracking-widest font-bold ${
                i <= step ? 'text-accent' : 'text-dark/20'
              }`}>{s}</span>
            </div>
          ))}
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Main Form */}
          <div className="flex-1 bg-white rounded-3xl p-8 shadow-premium border border-primary/5">
            <AnimatePresence mode="wait">
              {step === 0 && (
                <motion.div
                  key="step0"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="space-y-6"
                >
                  <h2 className="text-3xl mb-8">Informations de Livraison</h2>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs uppercase tracking-widest font-bold text-dark/40">Prénom</label>
                      <input type="text" className="input-field" placeholder="Sarah" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs uppercase tracking-widest font-bold text-dark/40">Nom</label>
                      <input type="text" className="input-field" placeholder="Belkacem" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest font-bold text-dark/40">Téléphone</label>
                    <input type="tel" className="input-field" placeholder="0550 00 00 00" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest font-bold text-dark/40">Wilaya</label>
                    <select className="input-field appearance-none">
                      <option>Alger</option>
                      <option>Oran</option>
                      <option>Constantine</option>
                      <option>Annaba</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest font-bold text-dark/40">Adresse</label>
                    <textarea className="input-field h-24 pt-3" placeholder="Votre adresse complète..."></textarea>
                  </div>
                </motion.div>
              )}

              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="space-y-6"
                >
                  <h2 className="text-3xl mb-8">Mode de Paiement</h2>
                  <div className="space-y-4">
                    {[
                      { id: 'cod', name: 'Paiement à la livraison', icon: <Truck size={24} /> },
                      { id: 'cib', name: 'CIB / Edahabia', icon: <CreditCard size={24} /> },
                    ].map((method) => (
                      <label key={method.id} className="flex items-center justify-between p-6 rounded-2xl border-2 border-primary/10 hover:border-primary cursor-pointer transition-all group">
                        <div className="flex items-center gap-4">
                          <div className="text-primary">{method.icon}</div>
                          <span className="font-bold text-accent">{method.name}</span>
                        </div>
                        <input type="radio" name="payment" className="w-5 h-5 accent-primary" defaultChecked={method.id === 'cod'} />
                      </label>
                    ))}
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12 space-y-6"
                >
                  <div className="w-20 h-20 bg-green-500 text-white rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg shadow-green-500/20">
                    <CheckCircle2 size={48} />
                  </div>
                  <h2 className="text-4xl">Commande Confirmée !</h2>
                  <p className="text-dark/60">
                    Merci pour votre confiance. Votre commande <span className="font-mono font-bold text-accent">#NB-2026-4582</span> est en cours de préparation.
                  </p>
                  <div className="pt-8">
                    <Button onClick={() => navigate('/')}>Retour à l'accueil</Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {step < 2 && (
              <div className="mt-12 flex justify-end">
                <Button className="flex items-center gap-2" onClick={handleNext}>
                  {step === 1 ? "Confirmer la commande" : "Étape Suivante"}
                  <ChevronRight size={18} />
                </Button>
              </div>
            )}
          </div>

          {/* Summary Sidebar */}
          {step < 2 && (
            <div className="lg:w-80 space-y-6">
              <div className="bg-white rounded-3xl p-6 shadow-premium border border-primary/5">
                <h3 className="text-xl mb-6">Résumé</h3>
                <div className="space-y-4 mb-6">
                  {items.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span className="text-dark/60">{item.quantity}x {item.name}</span>
                      <span className="font-mono">{(item.pricePromo || item.price) * item.quantity} دج</span>
                    </div>
                  ))}
                </div>
                <div className="pt-6 border-t border-primary/10 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-dark/40">Sous-total</span>
                    <span className="font-mono">{total} دج</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-dark/40">Livraison</span>
                    <span className="font-mono text-green-500">Gratuit</span>
                  </div>
                  <div className="flex justify-between text-xl pt-4 font-bold text-accent">
                    <span>Total</span>
                    <span className="font-mono">{total} دج</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default Checkout;
