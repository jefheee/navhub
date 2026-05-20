'use client';

import React from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { ArrowLeft, Sparkles, Scissors, MapPin, Calendar, CheckSquare } from 'lucide-react';

export function Header() {
  const pathname = usePathname();
  const router = useRouter();

  const getStepInfo = () => {
    switch (pathname) {
      case '/':
        return null;
      case '/agendamento/unidade':
        return { step: 1, title: 'Selecione a Unidade', icon: MapPin };
      case '/agendamento/servico':
        return { step: 2, title: 'Escolha o Serviço', icon: Scissors };
      case '/agendamento/profissional-data':
        return { step: 3, title: 'Barbeiro & Horário', icon: Calendar };
      case '/agendamento/confirmacao':
        return { step: 4, title: 'Confirmado!', icon: CheckSquare };
      default:
        return null;
    }
  };

  const stepInfo = getStepInfo();

  if (pathname === '/') {
    return (
      <header className="p-6 bg-gradient-to-b from-[#141414] to-transparent flex items-center justify-between border-b border-[#1A1A1A]/30">
        <div>
          <div className="flex items-center gap-1.5 text-nav-gold mb-1">
            <Sparkles className="w-4 h-4 fill-nav-gold" />
            <span className="text-xs uppercase tracking-wider font-semibold font-display">Clube VIP NavHub</span>
          </div>
          <h1 className="text-2xl font-bold font-display text-nav-text-light">Olá, Daniel</h1>
          <p className="text-xs text-nav-text-muted">Seja bem-vindo de volta</p>
        </div>
        <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-nav-gold/30 premium-glow">
          <img
            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200&auto=format&fit=crop"
            alt="Daniel Profile"
            className="w-full h-full object-cover"
          />
        </div>
      </header>
    );
  }

  if (!stepInfo) return null;

  const { step, title } = stepInfo;

  return (
    <header className="p-5 bg-[#0D0D0D] border-b border-[#1A1A1A] sticky top-0 z-50 pwa-top">
      <div className="flex items-center justify-between mb-4">
        {step < 4 ? (
          <button
            onClick={() => router.back()}
            className="p-2 rounded-lg bg-nav-surface border border-nav-border hover:bg-neutral-800 transition-colors text-nav-text-light cursor-pointer"
            aria-label="Voltar"
          >
            <ArrowLeft className="w-5 h-5 text-nav-gold" />
          </button>
        ) : (
          <div className="w-9 h-9" /> // spacer to balance
        )}

        <div className="text-center">
          <span className="text-[10px] uppercase tracking-widest text-nav-gold font-bold font-display">
            Passo {step} de 4
          </span>
          <h2 className="text-md font-semibold text-nav-text-light font-display">{title}</h2>
        </div>

        <div className="text-xs font-semibold px-2.5 py-1 rounded bg-[#E5B05C]/10 text-nav-gold border border-[#E5B05C]/20 font-display">
          NavHub
        </div>
      </div>

      {/* Stepper Progress Bar */}
      <div className="w-full h-[3px] bg-nav-surface rounded-full overflow-hidden flex gap-0.5">
        <div className={`h-full flex-1 transition-all duration-300 ${step >= 1 ? 'bg-nav-gold' : 'bg-neutral-800'}`} />
        <div className={`h-full flex-1 transition-all duration-300 ${step >= 2 ? 'bg-nav-gold' : 'bg-neutral-800'}`} />
        <div className={`h-full flex-1 transition-all duration-300 ${step >= 3 ? 'bg-nav-gold' : 'bg-neutral-800'}`} />
        <div className={`h-full flex-1 transition-all duration-300 ${step >= 4 ? 'bg-nav-gold' : 'bg-neutral-800'}`} />
      </div>
    </header>
  );
}
