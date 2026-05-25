'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useScheduling, Unit } from '@/context/SchedulingContext';
import { Calendar, MapPin, Sparkles, ChevronRight, Scissors, AlertCircle, Mail, Phone, Clock } from 'lucide-react';
import Link from 'next/link';
import gsap from 'gsap';

export default function HomePage() {
  const { appointments, cancelAppointment, setSelectedUnit, mockUnits, isAuthenticated } = useScheduling();
  const router = useRouter();
  
  const containerRef = useRef<HTMLDivElement>(null);
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});
  
  // Find active scheduled appointments and sort chronologically ascending
  const activeAppointments = appointments
    .filter(appt => appt.status === 'scheduled')
    .sort((a, b) => {
      const dateTimeA = new Date(`${a.date}T${a.time}`);
      const dateTimeB = new Date(`${b.date}T${b.time}`);
      return dateTimeA.getTime() - dateTimeB.getTime();
    });

  useEffect(() => {
    // GSAP reveal animations for dashboard elements
    const ctx = gsap.context(() => {
      gsap.from('.reveal-item', {
        opacity: 0,
        y: 20,
        stagger: 0.1,
        duration: 0.6,
        ease: 'power3.out',
      });
    }, containerRef);
    
    return () => ctx.revert();
  }, []);

  const handleSelectUnit = (unit: Unit) => {
    if (!isAuthenticated) {
      // Store unit selection in session/context first, so after login they go to servico
      setSelectedUnit(unit);
      router.push('/login');
      return;
    }
    setSelectedUnit(unit);
    router.push('/agendamento/servico');
  };

  const handleAgendarAgora = () => {
    if (!isAuthenticated) {
      router.push('/login');
    } else {
      router.push('/agendamento/unidade');
    }
  };

  const formatDate = (dateStr: string) => {
    const [year, month, day] = dateStr.split('-');
    const dateObj = new Date(Number(year), Number(month) - 1, Number(day));
    return dateObj.toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' });
  };

  return (
    <div ref={containerRef} className="flex flex-col gap-6 pb-12 w-full relative">
      
      {/* Hero Background */}
      <div className="absolute top-0 left-0 w-full h-[45vh] -z-10 overflow-hidden">
        <img 
          src="/hero.jpeg" 
          alt="NavHub Hero" 
          className="absolute top-0 left-0 w-full h-full object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0D0D0D]/10 via-[#0D0D0D]/70 to-[#0D0D0D]" />
      </div>

      {/* Header/Greeting */}
      <section className="reveal-item pt-8 mb-2">
        <h2 className="text-2xl font-display font-bold text-nav-text-light">
          Olá, <span className="text-nav-gold">{isAuthenticated ? userProfile.name : 'Visitante'}</span>
        </h2>
        <p className="text-nav-text-muted text-sm mt-1">
          O estilo que define quem você é.
        </p>
      </section>

      {/* Appointment Section */}
      <section className="reveal-item">
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-xs uppercase tracking-widest text-nav-text-light font-bold font-display">
            Seu Último Agendamento
          </h3>
          {activeAppointments.length > 0 && (
            <span className="text-[10px] bg-nav-gold/15 text-nav-gold border border-nav-gold/30 px-2.5 py-0.5 rounded-full font-bold font-display">
              {activeAppointments.length} Ativo{activeAppointments.length !== 1 ? 's' : ''}
            </span>
          )}
        </div>
        
        {activeAppointments.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {activeAppointments.map((appt) => (
              <div key={appt.id} className="bg-nav-card border border-nav-gold/30 rounded-lg p-5 premium-glow relative overflow-hidden flex flex-col justify-between">
                <div className="absolute top-0 right-0 w-20 h-20 bg-nav-gold/5 rounded-bl-full pointer-events-none" />
                
                <div>
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <span className="text-xs text-nav-gold font-semibold uppercase tracking-wider font-display">
                        Confirmado
                      </span>
                      <h4 className="text-md font-bold text-nav-text-light font-display mt-0.5">
                        {appt.service.name}
                      </h4>
                    </div>
                    <div className="text-right">
                      <p className="text-base font-extrabold text-nav-gold font-display">
                        R$ {appt.service.price}
                      </p>
                      <p className="text-[9px] text-nav-text-muted">
                        {appt.service.duration}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2 border-t border-[#222] pt-3 mt-3 mb-4">
                    <div className="flex items-center gap-2 text-xs text-nav-text-light">
                      <MapPin className="w-3.5 h-3.5 text-nav-gold shrink-0" />
                      <span>{appt.unit.name}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-nav-text-light">
                      <Calendar className="w-3.5 h-3.5 text-nav-gold shrink-0" />
                      <span className="capitalize">{formatDate(appt.date)} às {appt.time}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-nav-text-light">
                      <div className="w-4 h-4 rounded-full overflow-hidden border border-nav-gold/20">
                        <img
                          src={appt.barber.image}
                          alt={appt.barber.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <span>Profissional: <strong className="text-nav-gold">{appt.barber.name}</strong></span>
                    </div>
                  </div>
                </div>

                <button 
                  onClick={() => cancelAppointment(appt.id)}
                  className="w-full py-2 bg-neutral-900 border border-red-500/30 text-red-400 text-xs font-semibold rounded hover:bg-red-500/10 hover:border-red-500 transition-all cursor-pointer mt-2"
                >
                  Cancelar Agendamento
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-nav-card border border-nav-border rounded-lg p-5 flex flex-col items-center text-center justify-center min-h-[140px]">
            <AlertCircle className="w-8 h-8 text-nav-text-muted/60 mb-2.5" />
            <p className="text-sm text-nav-text-light font-medium mb-1">
              Nenhum agendamento marcado
            </p>
            <p className="text-xs text-nav-text-muted max-w-[240px] mb-4">
              Escolha uma unidade abaixo para agendar o seu próximo corte.
            </p>
            <button 
              onClick={handleAgendarAgora}
              className="px-5 py-2 bg-nav-gold text-black text-xs font-semibold rounded hover:bg-yellow-500 transition-colors cursor-pointer"
            >
              Agendar Agora
            </button>
          </div>
        )}
      </section>

      {/* Units List */}
      <section className="reveal-item">
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-xs uppercase tracking-widest text-nav-text-muted font-bold font-display">
            Selecione a Unidade
          </h3>
          <span 
            onClick={handleAgendarAgora}
            className="text-[10px] text-nav-gold uppercase tracking-wider font-semibold flex items-center gap-0.5 cursor-pointer hover:underline"
          >
            Ver todas <ChevronRight className="w-3 h-3" />
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {mockUnits.map((unit) => (
            <div
              key={unit.id}
              onClick={() => handleSelectUnit(unit)}
              className="bg-nav-card border border-nav-border rounded-lg p-3.5 flex items-center cursor-pointer hover:border-nav-gold/50 hover:-translate-y-0.5 transition-all duration-200 premium-glow-hover"
            >
              {/* Gold rounded icon box on the left */}
              <div className="w-12 h-12 rounded-xl bg-nav-gold flex items-center justify-center shrink-0 mr-3.5 shadow-[0_0_10px_rgba(229,176,92,0.15)]">
                <MapPin className="w-5.5 h-5.5 text-black fill-black stroke-[2.5]" />
              </div>
              
              {/* Unit Info in the center */}
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-extrabold text-nav-text-light font-display">
                  {unit.name}
                </h4>
                <p className="text-xs text-nav-text-muted mt-1 truncate">
                  {unit.address}
                </p>
              </div>

              {/* Chevron arrow on the right */}
              <div className="text-nav-text-muted group-hover:text-nav-gold transition-colors shrink-0 ml-3">
                <ChevronRight className="w-5 h-5 text-nav-gold" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Subscription Cards (Assinaturas) */}
      <section className="reveal-item" id="assinaturas">
        <h3 className="text-xs uppercase tracking-widest text-nav-text-muted font-bold font-display mb-3">
          Assinaturas NavHub
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {/* Basic Plan */}
          <Link 
            href="/clube-vip?plan=basico"
            className="bg-nav-card border border-nav-border rounded-lg p-4 flex flex-col justify-between relative overflow-hidden cursor-pointer hover:border-nav-gold/30 hover:-translate-y-0.5 transition-all duration-200"
          >
            <div>
              <div className="flex items-center gap-1 text-[9px] text-nav-text-muted uppercase tracking-widest mb-1.5">
                <Scissors className="w-3 h-3 text-nav-gold" />
                <span>Básico</span>
              </div>
              <h4 className="text-md font-bold text-nav-text-light font-display mb-0.5">
                Plano Barber
              </h4>
              <p className="text-2xl font-black text-nav-text-light font-display">
                R$ 39,90<span className="text-xs font-normal text-nav-text-muted">/mês</span>
              </p>
              <ul className="text-[10px] text-nav-text-muted space-y-1.5 mt-3">
                <li>• 2 Cortes inclusos</li>
                <li>• 10% Off adicionais</li>
                <li>• Bebida cortesia</li>
              </ul>
            </div>
            <div className="mt-4 py-1.5 w-full bg-neutral-900 border border-[#333] text-nav-text-light text-[10px] font-semibold rounded text-center">
              Assinar Plano
            </div>
          </Link>

          {/* Premium Plan */}
          <Link
            href="/clube-vip?plan=premium"
            className="bg-nav-card border border-nav-gold/30 rounded-lg p-4 flex flex-col justify-between relative overflow-hidden premium-glow cursor-pointer hover:border-nav-gold/60 hover:-translate-y-0.5 transition-all duration-200"
          >
            <div className="absolute top-0 right-0 bg-nav-gold text-black text-[8px] uppercase tracking-widest font-black py-0.5 px-3 rotate-45 translate-x-3 translate-y-1 select-none font-display">
              VIP
            </div>
            <div>
              <div className="flex items-center gap-1 text-[9px] text-nav-gold uppercase tracking-widest mb-1.5 font-bold">
                <Sparkles className="w-3 h-3 fill-nav-gold" />
                <span>Premium</span>
              </div>
              <h4 className="text-md font-bold text-nav-text-light font-display mb-0.5">
                Nav Premium
              </h4>
              <p className="text-2xl font-black text-nav-gold font-display">
                R$ 79,90<span className="text-xs font-normal text-nav-text-muted">/mês</span>
              </p>
              <ul className="text-[10px] text-nav-text-light/95 space-y-1.5 mt-3">
                <li>• Cortes ilimitados</li>
                <li>• Barba premium inclusa</li>
                <li>• Prioridade agendamento</li>
                <li>• Chopp duplo grátis</li>
              </ul>
            </div>
            <div className="mt-4 py-1.5 w-full bg-nav-gold text-black text-[10px] font-bold rounded text-center font-display">
              Assinar Premium
            </div>
          </Link>
        </div>
      </section>

      {/* Institutional Sections */}
      <section className="reveal-item mt-6 border-t border-nav-border/30 pt-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Sobre a NavHub */}
          <div className="bg-nav-card border border-nav-border rounded-lg p-5 flex flex-col justify-between hover:border-nav-gold/30 transition-all duration-200">
            <div>
              <div className="flex items-center gap-2 text-nav-gold mb-3">
                <Scissors className="w-4 h-4" />
                <h4 className="font-display font-bold text-sm uppercase tracking-wider">
                  Sobre a NavHub
                </h4>
              </div>
              <p className="text-xs text-nav-text-muted leading-relaxed">
                A NavHub une estilo, precisão e tradição em um ambiente premium e moderno. Nosso foco é oferecer um atendimento de excelência com visagismo personalizado, garantindo que você tenha a melhor versão do seu visual pelas mãos dos barbeiros mais experientes.
              </p>
            </div>
            <div className="mt-4 text-[10px] text-nav-gold font-semibold uppercase tracking-wider">
              Estilo e Tradição
            </div>
          </div>

          {/* Visite-nos */}
          <div className="bg-nav-card border border-nav-border rounded-lg p-5 flex flex-col justify-between hover:border-nav-gold/30 transition-all duration-200">
            <div>
              <div className="flex items-center gap-2 text-nav-gold mb-3">
                <MapPin className="w-4 h-4" />
                <h4 className="font-display font-bold text-sm uppercase tracking-wider">
                  Visite-nos
                </h4>
              </div>
              <div className="space-y-3">
                <div className="text-xs">
                  <span className="font-bold text-nav-text-light block">Nav Pagani & Jardim Eldorado</span>
                  <span className="text-nav-text-muted text-[11px] block">Av. Atílio Pagani, 270 / R. Eldorado, 45</span>
                </div>
                <div className="text-xs">
                  <span className="font-bold text-nav-text-light block">Nav Pedra Branca & Bela Vista</span>
                  <span className="text-nav-text-muted text-[11px] block">Av. Paulo R. Vidal, 123 / R. José C. Pamplona, 1447</span>
                </div>
              </div>
            </div>
            <div className="mt-4 text-[10px] text-nav-gold font-semibold uppercase tracking-wider">
              4 Unidades em Palhoça
            </div>
          </div>

          {/* Horário de Atendimento */}
          <div className="bg-nav-card border border-nav-border rounded-lg p-5 flex flex-col justify-between hover:border-nav-gold/30 transition-all duration-200">
            <div>
              <div className="flex items-center gap-2 text-nav-gold mb-3">
                <Clock className="w-4 h-4" />
                <h4 className="font-display font-bold text-sm uppercase tracking-wider">
                  Horários
                </h4>
              </div>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between border-b border-nav-border/30 pb-1.5">
                  <span className="text-nav-text-muted">Segunda a Sexta</span>
                  <span className="text-nav-text-light font-bold">09:00 às 20:00</span>
                </div>
                <div className="flex justify-between border-b border-nav-border/30 pb-1.5">
                  <span className="text-nav-text-muted">Sábado</span>
                  <span className="text-nav-text-light font-bold">09:00 às 18:00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-nav-text-muted">Domingo</span>
                  <span className="text-red-400 font-semibold">Fechado</span>
                </div>
              </div>
            </div>
            <div className="mt-4 text-[10px] text-nav-gold font-semibold uppercase tracking-wider">
              Atendimento Sem Hora Marcada se VIP
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
