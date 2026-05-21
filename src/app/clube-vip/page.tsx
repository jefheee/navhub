/* eslint-disable */
'use client';

import React, { useEffect, useRef, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { ArrowLeft, Check, Sparkles, Scissors, Beer, Trophy, Star } from 'lucide-react';
import Link from 'next/link';
import gsap from 'gsap';

function ClubeVipContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Read target plan from query parameters, default to premium
  const planParam = searchParams.get('plan');
  const initialPlan = planParam === 'basico' ? 'basico' : 'premium';
  
  const [selectedPlan, setSelectedPlan] = useState<'basico' | 'premium'>(initialPlan);
  const [subscribing, setSubscribing] = useState(false);
  const [success, setSuccess] = useState(false);

  // Sync state if param changes
  useEffect(() => {
    if (planParam === 'basico' || planParam === 'premium') {
      setSelectedPlan(planParam);
    }
  }, [planParam]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.vip-reveal', {
        opacity: 0,
        y: 20,
        stagger: 0.1,
        duration: 0.5,
        ease: 'power2.out',
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const handleSubscribe = () => {
    setSubscribing(true);
    // Simulate API subscription delay
    setTimeout(() => {
      setSubscribing(false);
      setSuccess(true);
      // Redirect home after displaying success state
      setTimeout(() => {
        router.push('/');
      }, 1500);
    }, 1200);
  };

  return (
    <div ref={containerRef} className="py-4 flex flex-col gap-6 pb-12 relative">
      {/* Custom Header */}
      <div className="flex items-center gap-4 vip-reveal">
        <Link
          href="/"
          className="p-2.5 rounded-lg bg-nav-surface border border-nav-border hover:bg-neutral-800 transition-colors text-nav-text-light cursor-pointer"
        >
          <ArrowLeft className="w-5 h-5 text-nav-gold" />
        </Link>
        <div>
          <h2 className="text-xl font-bold text-nav-text-light font-display">Clube VIP NavHub</h2>
          <p className="text-xs text-nav-text-muted">A assinatura ideal para o seu estilo</p>
        </div>
      </div>

      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-[#1E160A] to-[#121212] border border-nav-gold/30 rounded-lg p-5 relative overflow-hidden vip-reveal premium-glow">
        <div className="absolute right-[-10px] bottom-[-10px] opacity-10">
          <Trophy className="w-32 h-32 text-nav-gold" />
        </div>
        <div className="relative z-10 flex flex-col gap-2">
          <div className="flex items-center gap-1.5 text-nav-gold text-[10px] uppercase tracking-wider font-bold">
            <Star className="w-4.5 h-4.5 fill-nav-gold" />
            <span>Estilo sem preocupações</span>
          </div>
          <h3 className="text-md font-bold text-nav-text-light font-display">Cabelo e barba sempre impecáveis</h3>
          <p className="text-xs text-nav-text-muted leading-relaxed max-w-[85%]">
            Assine o Clube VIP e garanta a recorrência dos seus cuidados com condições e benefícios exclusivos na NavHub.
          </p>
        </div>
      </div>

      {/* Plan Selector */}
      <div className="flex bg-nav-card p-1 rounded-lg border border-nav-border vip-reveal">
        <button
          onClick={() => setSelectedPlan('basico')}
          className={`flex-1 py-2 text-xs font-semibold rounded-md transition-all cursor-pointer font-display ${
            selectedPlan === 'basico'
              ? 'bg-neutral-800 text-nav-text-light shadow-md'
              : 'text-nav-text-muted hover:text-nav-text-light'
          }`}
        >
          Plano Básico
        </button>
        <button
          onClick={() => setSelectedPlan('premium')}
          className={`flex-1 py-2 text-xs font-semibold rounded-md transition-all cursor-pointer font-display flex items-center justify-center gap-1.5 ${
            selectedPlan === 'premium'
              ? 'bg-nav-gold text-black font-bold shadow-md'
              : 'text-nav-text-muted hover:text-nav-text-light'
          }`}
        >
          <Sparkles className="w-3 h-3 fill-black/30" />
          Nav Premium (Recomendado)
        </button>
      </div>

      {/* Plan Detail Card */}
      <div className="vip-reveal">
        {selectedPlan === 'basico' ? (
          <div className="bg-nav-card border border-nav-border rounded-lg p-5 flex flex-col gap-5">
            <div className="flex justify-between items-start border-b border-nav-border/50 pb-4">
              <div>
                <h4 className="text-lg font-bold text-nav-text-light font-display">Plano Barber</h4>
                <p className="text-xs text-nav-text-muted mt-0.5">Ideal para corte regular de cabelo</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-black text-nav-text-light font-display">R$ 39,90</p>
                <p className="text-[10px] text-nav-text-muted uppercase tracking-wider font-semibold">por mês</p>
              </div>
            </div>

            <div className="flex flex-col gap-3.5">
              <span className="text-[10px] text-nav-gold font-bold uppercase tracking-wider font-display">O que está incluso:</span>
              <ul className="space-y-3">
                <li className="flex gap-2.5 items-start text-xs text-nav-text-light">
                  <Check className="w-4.5 h-4.5 text-nav-gold shrink-0 mt-0.5" />
                  <span><strong>2 Cortes de Cabelo por mês</strong> (válido para qualquer estilo/técnica)</span>
                </li>
                <li className="flex gap-2.5 items-start text-xs text-nav-text-light">
                  <Check className="w-4.5 h-4.5 text-nav-gold shrink-0 mt-0.5" />
                  <span><strong>10% de Desconto Adicional</strong> em barbas ou qualquer outro serviço extra</span>
                </li>
                <li className="flex gap-2.5 items-start text-xs text-nav-text-light">
                  <Check className="w-4.5 h-4.5 text-nav-gold shrink-0 mt-0.5" />
                  <span><strong>Bebida Cortesia</strong> (café expresso, água ou chopp gelado em todas as visitas)</span>
                </li>
              </ul>
            </div>
          </div>
        ) : (
          <div className="bg-nav-card border border-nav-gold/30 rounded-lg p-5 flex flex-col gap-5 premium-glow relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-nav-gold text-black text-[9px] uppercase tracking-widest font-black py-1 px-4 rotate-45 translate-x-4 translate-y-2 select-none font-display">
              MELHOR CUSTO
            </div>
            
            <div className="flex justify-between items-start border-b border-nav-border/50 pb-4">
              <div>
                <h4 className="text-lg font-bold text-nav-gold font-display flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 fill-nav-gold" />
                  Nav Premium
                </h4>
                <p className="text-xs text-nav-text-muted mt-0.5">O cuidado completo para cabelo e barba</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-black text-nav-gold font-display">R$ 79,90</p>
                <p className="text-[10px] text-nav-text-muted uppercase tracking-wider font-semibold">por mês</p>
              </div>
            </div>

            <div className="flex flex-col gap-3.5">
              <span className="text-[10px] text-nav-gold font-bold uppercase tracking-wider font-display">O que está incluso:</span>
              <ul className="space-y-3">
                <li className="flex gap-2.5 items-start text-xs text-nav-text-light">
                  <Check className="w-4.5 h-4.5 text-nav-gold shrink-0 mt-0.5" />
                  <span><strong>Cortes de Cabelo Ilimitados</strong> (estilo sempre em dia e sem limites)</span>
                </li>
                <li className="flex gap-2.5 items-start text-xs text-nav-text-light">
                  <Check className="w-4.5 h-4.5 text-nav-gold shrink-0 mt-0.5" />
                  <span><strong>Barba Premium Inclusa</strong> (alinhamento facial com toalha quente e massagem)</span>
                </li>
                <li className="flex gap-2.5 items-start text-xs text-nav-text-light">
                  <Check className="w-4.5 h-4.5 text-nav-gold shrink-0 mt-0.5" />
                  <span><strong>Prioridade nos Agendamentos</strong> (bloqueio especial e facilidade em datas comemorativas)</span>
                </li>
                <li className="flex gap-2.5 items-start text-xs text-nav-text-light">
                  <Check className="w-4.5 h-4.5 text-nav-gold shrink-0 mt-0.5" />
                  <span><strong>Chopp Duplo Grátis</strong> (ganhe 2 chopps artesanais gelados a cada atendimento)</span>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>

      {/* Guarantee Badge */}
      <div className="flex items-center gap-3 bg-[#121212] border border-nav-border/50 rounded-lg p-4 vip-reveal">
        <Beer className="w-6 h-6 text-nav-gold shrink-0" />
        <div className="text-[11px] text-nav-text-muted leading-snug">
          Sem taxas de cancelamento ou fidelidade. Altere ou cancele o seu plano diretamente pelo aplicativo a qualquer momento.
        </div>
      </div>

      {/* Inline CTA Button (Not fixed to avoid Navbar overlapping) */}
      <div className="vip-reveal w-full mt-2">
        <button
          onClick={handleSubscribe}
          disabled={subscribing || success}
          className={`w-full py-3.5 flex items-center justify-center gap-2 font-bold font-display rounded-md transition-all cursor-pointer ${
            selectedPlan === 'premium'
              ? 'bg-nav-gold text-black hover:bg-yellow-500 shadow-lg shadow-nav-gold/20'
              : 'bg-neutral-800 text-nav-text-light hover:bg-neutral-700'
          } active:scale-[0.98] disabled:opacity-50`}
        >
          {subscribing ? (
            <div className="flex items-center gap-2">
              <span className="w-4 h-4 rounded-full border-2 border-black border-t-transparent animate-spin" />
              <span>Processando assinatura...</span>
            </div>
          ) : success ? (
            <div className="flex items-center gap-1">
              <Check className="w-4.5 h-4.5" />
              <span>Assinatura Ativa!</span>
            </div>
          ) : (
            <span>Assinar Plano {selectedPlan === 'basico' ? 'Barber' : 'Premium'}</span>
          )}
        </button>
      </div>

      {/* Success Modal Overlay */}
      {success && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex items-center justify-center p-6">
          <div className="bg-[#121212] border border-nav-gold/30 p-6 rounded-xl flex flex-col items-center text-center max-w-xs shadow-2xl animate-fade-in">
            <div className="w-14 h-14 bg-nav-gold/10 border border-nav-gold/30 rounded-full flex items-center justify-center text-nav-gold mb-4 premium-glow">
              <Sparkles className="w-7 h-7 fill-nav-gold" />
            </div>
            <h3 className="text-md font-bold text-nav-text-light font-display">Parabéns, Daniel!</h3>
            <p className="text-xs text-nav-text-muted mt-2 leading-relaxed">
              Você agora é um membro oficial do clube <strong>Nav {selectedPlan === 'basico' ? 'Barber' : 'Premium'}</strong>. Seus benefícios já estão ativos!
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default function ClubeVipPage() {
  return (
    <Suspense fallback={
      <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center">
        <p className="text-sm text-nav-text-muted">Carregando Clube VIP...</p>
      </div>
    }>
      <ClubeVipContent />
    </Suspense>
  );
}
