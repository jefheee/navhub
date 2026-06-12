'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useScheduling } from '@/context/SchedulingContext';
import { Check } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function HomePage() {
  const { setSelectedUnit, isAuthenticated, userProfile } = useScheduling();
  const router = useRouter();

  const unidades = [
    { id: '1', name: 'Nav Pagani', address: 'Av. Hilza Terezina pagani, 289 - Pagani' },
    { id: '2', name: 'Nav Jardim Eldorado', address: 'Rua Valdemar Viera, 123 - Jardim Eldorado' },
    { id: '3', name: 'Nav Pedra Branca', address: 'Av. Paulo Roberto Vidal, 123 - Pedra Branca' },
    { id: '4', name: 'Nav Bela Vista', address: 'Rua José Cosme Pamplona, 1447 - Bela Vista' },
  ];

  const handleSelectUnit = (unit: any) => {
    setSelectedUnit(unit);
    if (!isAuthenticated) {
      router.push('/login');
    } else {
      router.push('/agendamento/servico');
    }
  };

  return (
    <div className="flex flex-col w-full bg-[#12100E] min-h-screen">
      {/* Hero Background with Gradient */}
      <div className="absolute top-0 left-0 w-full h-[350px] -z-10">
        <Image 
          src="/hero.jpeg" 
          alt="NavHub Hero" 
          fill
          style={{ objectFit: 'cover' }}
          className="opacity-40"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#12100E]/10 via-[#12100E]/80 to-[#12100E]" />
      </div>

      <main className="flex-1 px-6 pt-6 pb-12 flex flex-col gap-8 w-full max-w-md mx-auto">
        
        {/* Header/Greeting */}
        <section className="mt-2">
          <h1 className="text-[26px] font-bold text-white font-display leading-tight">
            Olá <span className="text-[#EEB74F]">{isAuthenticated ? userProfile.name : 'Daniel'}</span>
          </h1>
          <p className="text-[#A3A3A3] text-sm mt-1">
            Quinta, 7 mai 2026
          </p>
        </section>

        {/* Seu Último Agendamento */}
        <section>
          <h2 className="text-[11px] uppercase tracking-widest text-white font-bold font-display mb-3">
            SEU ÚLTIMO AGENDAMENTO
          </h2>
          <div className="w-full bg-[#EEB74F] rounded-[16px] p-8 flex flex-col items-center justify-center min-h-[140px] shadow-[0_10px_30px_rgba(238,183,79,0.15)] relative overflow-hidden">
            <Image src="/assets/icone-navhub-escuro-login.png" alt="NavHub Logo" width={110} height={40} className="brightness-0 mb-3" />
            <p className="text-black text-sm font-semibold font-display text-center relative z-10">
              Você ainda não fez nenhum agendamento!
            </p>
          </div>
        </section>

        {/* Unidades */}
        <section>
          <h2 className="text-[11px] uppercase tracking-widest text-[#A3A3A3] font-bold font-display mb-3">
            UNIDADES
          </h2>
          <div className="flex flex-col gap-3">
            {unidades.map((unit) => (
              <div 
                key={unit.id}
                onClick={() => handleSelectUnit(unit)}
                className="flex items-center gap-4 bg-[#1A1A1A] p-4 rounded-[12px] cursor-pointer hover:bg-[#222] transition-colors"
              >
                <div className="w-11 h-11 bg-[#EEB74F] rounded-[8px] flex items-center justify-center flex-shrink-0">
                  <Image src="/assets/icone-localizacao-pin.png" alt="Localização" width={20} height={20} className="brightness-0" />
                </div>
                <div className="flex-1">
                  <h3 className="text-white font-bold text-[15px] font-display">{unit.name}</h3>
                  <p className="text-[#A3A3A3] text-[11px] mt-0.5">{unit.address}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Assinaturas */}
        <section>
          <h2 className="text-[11px] uppercase tracking-widest text-[#A3A3A3] font-bold font-display mb-3">
            ASSINATURAS
          </h2>
          <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-4 -mx-6 px-6 hide-scrollbar">
            
            {/* Plano Básico */}
            <div className="min-w-[260px] max-w-[260px] bg-[#1A1A1A] rounded-[16px] p-5 flex flex-col snap-center border border-[#333]">
              <h3 className="text-white text-xl font-bold font-display text-center mb-1">Plano Básico</h3>
              <div className="text-center mb-5">
                <span className="text-white text-2xl font-bold font-display">R$ 39,90</span>
                <span className="text-[#A3A3A3] text-xs">/mês</span>
              </div>
              <ul className="flex flex-col gap-3 mb-6 flex-1">
                {['2 cortes por mês', 'Agendamento Prioritário', '10% de desconto em produtos', 'Cancelamento a qualquer momento'].map((beneficio, i) => (
                  <li key={i} className="flex items-start gap-2 text-[13px] text-[#D4D4D4]">
                    <Check className="w-4 h-4 text-[#EEB74F] mt-0.5 flex-shrink-0" />
                    <span>{beneficio}</span>
                  </li>
                ))}
              </ul>
              <button className="w-full py-3 rounded-lg bg-black border border-[#EEB74F] text-[#EEB74F] font-bold text-[13px] uppercase tracking-wide cursor-pointer hover:bg-[#EEB74F]/10 transition-colors">
                Quero o Premium
              </button>
            </div>

            {/* Plano Premium */}
            <div className="min-w-[260px] max-w-[260px] bg-[#1A1A1A] rounded-[16px] p-5 flex flex-col snap-center border border-[#EEB74F] relative shadow-[0_0_20px_rgba(238,183,79,0.15)]">
              <div className="absolute top-0 right-0 bg-[#EEB74F] text-black text-[9px] font-bold px-2 py-1 rounded-bl-lg rounded-tr-[14px] uppercase tracking-wider">
                MAIS POPULAR
              </div>
              <h3 className="text-[#EEB74F] text-xl font-bold font-display text-center mb-1">Plano Premium</h3>
              <div className="text-center mb-5">
                <span className="text-white text-2xl font-bold font-display">R$ 79,90</span>
                <span className="text-[#A3A3A3] text-xs">/mês</span>
              </div>
              <ul className="flex flex-col gap-3 mb-6 flex-1">
                {['Cortes ilimitados', '1 barba inclusa por mês', 'Prioridade máxima nos...', '15% de desconto em pr...', 'Brinde no aniversário'].map((beneficio, i) => (
                  <li key={i} className="flex items-start gap-2 text-[13px] text-[#D4D4D4]">
                    <Check className="w-4 h-4 text-[#EEB74F] mt-0.5 flex-shrink-0" />
                    <span>{beneficio}</span>
                  </li>
                ))}
              </ul>
              <button className="w-full py-3 rounded-lg bg-[#EEB74F] text-black font-bold text-[13px] uppercase tracking-wide cursor-pointer hover:bg-[#D49830] transition-colors">
                Quero o Pr...
              </button>
            </div>

          </div>
        </section>

        {/* Rodapé (Footer) Limpo */}
        <footer className="mt-8 pt-8 border-t border-[#1A1A1A] flex flex-col gap-8">
          
          <div className="flex flex-col items-start text-left gap-1">
            <h3 className="text-white font-serif text-[28px] font-semibold tracking-wide">NavHub</h3>
            <p className="text-[#A3A3A3] text-sm font-sans">
              NavHub Barbearia · Estilo, precisão e tradição em um único lugar.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <h4 className="text-white font-serif text-lg font-semibold">Visite-nos</h4>
            <ul className="flex flex-col gap-3">
              {[
                'Rua Valdemar Viera, 123, - Jardim Eldorado',
                'Av. Hilza Terezinha Pagani, 289 - Pagani.',
                'Rua José Cosme Pamplona, 1447 – Bela Vista.',
                'Avenida Paulo Roberto Vidal, 123 - Pedra Branca.',
              ].map((address, i) => (
                <li key={i} className="flex items-center gap-3">
                  <div className="w-6 h-6 flex items-center justify-center">
                    <Image 
                      src="/assets/icone-localizacao-pin.png" 
                      alt="Pin" 
                      width={16} 
                      height={16} 
                      style={{ filter: 'brightness(0) saturate(100%) invert(82%) sepia(43%) saturate(1099%) hue-rotate(341deg) brightness(96%) contrast(93%)' }} 
                    />
                  </div>
                  <span className="text-[#D4D4D4] text-sm">{address}</span>
                </li>
              ))}
            </ul>
            
            <div className="flex items-center gap-3 mt-1">
              <div className="w-6 h-6 flex items-center justify-center">
                <Image 
                  src="/assets/icone-email.png" 
                  alt="Email" 
                  width={16} 
                  height={16} 
                  style={{ filter: 'brightness(0) saturate(100%) invert(82%) sepia(43%) saturate(1099%) hue-rotate(341deg) brightness(96%) contrast(93%)' }} 
                />
              </div>
              <span className="text-[#D4D4D4] text-sm">contato@navhub.com</span>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <h4 className="text-white font-serif text-lg font-semibold">Horário de Atendimento</h4>
            <div className="flex flex-col gap-1.5 text-sm text-[#D4D4D4]">
              <p>Segunda a sexta - 09h-20h</p>
              <p>Sábado - 09h-18h</p>
            </div>
          </div>

          <div className="w-full flex flex-col items-center gap-6 mt-4 pb-8">
            <div className="w-full h-[1px] bg-[#EBC351]/50" />
            <div className="text-center text-xs text-[#A3A3A3] leading-relaxed">
              <p>© 2026 NavHub. Todos os direitos reservados.</p>
              <p>Feito com precisão de navalha.</p>
            </div>
          </div>

        </footer>
      </main>
    </div>
  );
}
