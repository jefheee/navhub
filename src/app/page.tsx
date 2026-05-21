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
  
  // Find active scheduled appointments
  const activeAppointment = appointments.find(appt => appt.status === 'scheduled');

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
    <div ref={containerRef} className="flex flex-col gap-6 py-2 pb-12">
      
      {/* Appointment Section */}
      <section className="reveal-item">
        <h3 className="text-xs uppercase tracking-widest text-nav-text-muted font-bold font-display mb-3">
          Próximo Agendamento
        </h3>
        
        {activeAppointment ? (
          <div className="bg-nav-card border border-nav-gold/30 rounded-lg p-5 premium-glow relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-nav-gold/5 rounded-bl-full pointer-events-none" />
            
            <div className="flex justify-between items-start mb-4">
              <div>
                <span className="text-xs text-nav-gold font-semibold uppercase tracking-wider font-display">
                  Confirmado
                </span>
                <h4 className="text-lg font-bold text-nav-text-light font-display mt-0.5">
                  {activeAppointment.service.name}
                </h4>
              </div>
              <div className="text-right">
                <p className="text-xl font-extrabold text-nav-gold font-display">
                  R$ {activeAppointment.service.price}
                </p>
                <p className="text-[10px] text-nav-text-muted">
                  {activeAppointment.service.duration}
                </p>
              </div>
            </div>

            <div className="space-y-2 border-y border-[#222] py-3.5 my-3.5">
              <div className="flex items-center gap-2.5 text-sm text-nav-text-light">
                <MapPin className="w-4 h-4 text-nav-gold shrink-0" />
                <span>{activeAppointment.unit.name}</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm text-nav-text-light">
                <Calendar className="w-4 h-4 text-nav-gold shrink-0" />
                <span className="capitalize">{formatDate(activeAppointment.date)} às {activeAppointment.time}</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm text-nav-text-light">
                <div className="w-5 h-5 rounded-full overflow-hidden border border-nav-gold/20">
                  <img
                    src={activeAppointment.barber.image}
                    alt={activeAppointment.barber.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <span>Profissional: <strong className="text-nav-gold">{activeAppointment.barber.name}</strong></span>
              </div>
            </div>

            <div className="flex gap-3">
              <button 
                onClick={() => cancelAppointment(activeAppointment.id)}
                className="w-full py-2 bg-neutral-900 border border-red-500/30 text-red-400 text-xs font-semibold rounded hover:bg-red-500/10 hover:border-red-500 transition-all cursor-pointer"
              >
                Cancelar Agendamento
              </button>
            </div>
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
              className="bg-nav-card border border-nav-border rounded-lg overflow-hidden flex cursor-pointer hover:border-nav-gold/30 hover:-translate-y-0.5 transition-all duration-200 premium-glow-hover"
            >
              <div className="w-24 h-24 shrink-0 relative bg-[#1A1A1A] flex items-center justify-center">
                {!imageErrors[unit.id] ? (
                  <img
                    src={unit.image}
                    alt={unit.name}
                    className="w-full h-full object-cover select-none"
                    onError={() => setImageErrors(prev => ({ ...prev, [unit.id]: true }))}
                  />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-neutral-800 to-[#121212] flex items-center justify-center text-nav-gold">
                    <MapPin className="w-6 h-6 opacity-45" />
                  </div>
                )}
                <span className="absolute top-1.5 left-1.5 px-1.5 py-0.5 rounded bg-black/70 border border-nav-gold/30 text-[10px] text-nav-gold font-bold">
                  ★ {unit.rating}
                </span>
              </div>
              <div className="p-3.5 flex flex-col justify-between flex-1">
                <div>
                  <h4 className="text-sm font-bold text-nav-text-light font-display">
                    {unit.name}
                  </h4>
                  <p className="text-xs text-nav-text-muted flex items-center gap-1 mt-1">
                    <MapPin className="w-3.5 h-3.5 text-nav-gold shrink-0" />
                    <span className="truncate">{unit.address.split(' - ')[0]}</span>
                  </p>
                </div>
                <div className="flex justify-end">
                  <span className="text-[10px] bg-nav-gold/10 text-nav-gold border border-nav-gold/20 px-2 py-0.5 rounded font-semibold font-display">
                    Agendar
                  </span>
                </div>
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

      {/* RODAPÉ INSTITUCIONAL (NavHub, Visite-nos, Horário de Atendimento) */}
      <section className="reveal-item mt-6 border-t border-nav-border pt-8 pb-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          {/* About Section */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-nav-gold">
              <Scissors className="w-4 h-4" />
              <h4 className="font-display font-black text-lg uppercase tracking-tight">
                Nav<span className="text-white">Hub</span>
              </h4>
            </div>
            <p className="text-xs text-nav-text-muted leading-relaxed">
              NavHub Barbearia - Estilo, precisão e tradição em um único lugar. O seu visual cuidado pelos melhores profissionais da região, com agilidade e excelência.
            </p>
          </div>

          {/* Addresses Section */}
          <div className="space-y-3">
            <h4 className="font-display font-bold text-xs uppercase tracking-widest text-nav-text-light">
              Visite-nos
            </h4>
            <ul className="text-xs text-nav-text-muted space-y-2">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-nav-gold shrink-0 mt-0.5" />
                <span>Rua Valdemar Vieira, 123 - Jardim Eldorado</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-nav-gold shrink-0 mt-0.5" />
                <span>Av. Atílio Pagani, 299 - Pagani</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-nav-gold shrink-0 mt-0.5" />
                <span>Rua José Cosme Pamplona, 1447 - Bela Vista</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-nav-gold shrink-0 mt-0.5" />
                <span>Avenida Paulo Roberto Vidal, 123 - Pedra Branca</span>
              </li>
              <li className="flex items-center gap-2 pt-1 border-t border-nav-border/30 mt-2">
                <Mail className="w-4 h-4 text-nav-gold shrink-0" />
                <a href="mailto:contato@navhub.com" className="hover:text-nav-gold transition-colors">contato@navhub.com</a>
              </li>
            </ul>
          </div>

          {/* Opening Hours Section */}
          <div className="space-y-3">
            <h4 className="font-display font-bold text-xs uppercase tracking-widest text-nav-text-light">
              Horário de Atendimento
            </h4>
            <div className="bg-nav-card border border-nav-border p-4 rounded-lg space-y-2">
              <div className="flex items-center justify-between text-xs text-nav-text-light">
                <span className="font-medium">Segunda a sexta</span>
                <span className="text-nav-gold font-bold">09h - 20h</span>
              </div>
              <div className="flex items-center justify-between text-xs text-nav-text-light">
                <span className="font-medium">Sábado</span>
                <span className="text-nav-gold font-bold">09h - 18h</span>
              </div>
              <div className="flex items-center gap-1.5 text-[10px] text-nav-text-muted pt-2 border-t border-nav-border/30 mt-2">
                <Clock className="w-3.5 h-3.5 text-nav-gold shrink-0" />
                <span>Fechado aos domingos e feriados.</span>
              </div>
            </div>
          </div>
        </div>

        {/* Rights Bottom Bar */}
        <div className="border-t border-nav-border/40 mt-8 pt-4 flex flex-col sm:flex-row justify-between items-center gap-2 text-[10px] text-nav-text-muted">
          <span>&copy; 2026 NavHub. Todos os direitos reservados.</span>
          <span className="font-display font-semibold italic text-nav-gold/80">Pente com precisão de navalha.</span>
        </div>
      </section>

    </div>
  );
}
