'use client';

import React, { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useScheduling } from '@/context/SchedulingContext';
import { ServiceCard } from '@/components/ServiceCard';
import { Sparkles, CalendarDays, Calendar } from 'lucide-react';
import gsap from 'gsap';

export default function ServiceSelectionPage() {
  const { 
    selectedUnit, 
    mockServices, 
    selectedService, 
    setSelectedService,
    appointments
  } = useScheduling();
  
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);

  const activeAppointments = appointments
    .filter(appt => appt.status === 'scheduled')
    .sort((a, b) => {
      const dateTimeA = new Date(`${a.date}T${a.time}`);
      const dateTimeB = new Date(`${b.date}T${b.time}`);
      return dateTimeA.getTime() - dateTimeB.getTime();
    });

  // Redirect if no unit selected
  useEffect(() => {
    if (!selectedUnit) {
      router.replace('/agendamento/unidade');
    }
  }, [selectedUnit, router]);

  useEffect(() => {
    if (!selectedUnit) return;
    
    const ctx = gsap.context(() => {
      gsap.from('.srv-reveal-card', {
        opacity: 0,
        x: -20,
        stagger: 0.1,
        duration: 0.5,
        ease: 'power2.out',
      });
    }, containerRef);
    return () => ctx.revert();
  }, [selectedUnit]);

  if (!selectedUnit) return null;

  return (
    <div ref={containerRef} className="py-2 flex flex-col gap-6 pb-32">
      {/* Active Appointments Banner */}
      {activeAppointments.length > 0 && (
        <div className="bg-nav-gold/10 border border-nav-gold/30 rounded-xl p-4 flex flex-col gap-3 srv-reveal-card">
          <div className="flex items-center gap-2 text-nav-gold">
            <Calendar className="w-4.5 h-4.5" />
            <span className="text-xs font-bold uppercase tracking-wider font-display">
              Seus Agendamentos Ativos
            </span>
          </div>
          <div className="space-y-2">
            {activeAppointments.map((appt) => {
              const [year, month, day] = appt.date.split('-');
              const dateObj = new Date(Number(year), Number(month) - 1, Number(day));
              const formattedDate = dateObj.toLocaleDateString('pt-BR', { day: 'numeric', month: 'short' });
              return (
                <div key={appt.id} className="flex flex-col sm:flex-row justify-between sm:items-center text-xs text-nav-text-light border-b border-nav-border/30 pb-2 last:border-0 last:pb-0 gap-1.5">
                  <div>
                    <span className="font-semibold text-nav-gold">{appt.service.name}</span> com <span className="font-medium text-white">{appt.barber.name}</span> em <span className="text-nav-text-muted">{appt.unit.name}</span>
                  </div>
                  <div className="text-nav-text-muted font-display shrink-0">
                    <span className="capitalize font-semibold text-white">{formattedDate}</span> às <span className="text-nav-gold font-semibold">{appt.time}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Unit Selected Badge Info */}
      <div className="bg-nav-surface border border-nav-border rounded-lg p-3 flex justify-between items-center">
        <div>
          <span className="text-[10px] text-nav-gold font-bold uppercase tracking-wider block font-display">
            Unidade Selecionada
          </span>
          <span className="text-sm font-semibold text-nav-text-light">{selectedUnit.name}</span>
        </div>
        <button
          onClick={() => router.push('/agendamento/unidade')}
          className="text-xs text-nav-gold hover:underline font-semibold font-display cursor-pointer"
        >
          Alterar
        </button>
      </div>

      <div className="text-center mb-1">
        <h3 className="text-xs uppercase tracking-widest text-nav-text-muted font-bold font-display">
          Escolha os serviços desejados
        </h3>
      </div>

      {/* Services List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {mockServices.map((service) => (
          <div key={service.id} className="srv-reveal-card">
            <ServiceCard
              service={service}
              isSelected={selectedService?.id === service.id}
              onSelect={setSelectedService}
            />
          </div>
        ))}
      </div>

      {/* Floating Call to Action Bar constrained to 430px */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[calc(100%-2.5rem)] max-w-[calc(430px-2.5rem)] z-50 pwa-bottom">
        <button
          disabled={!selectedService}
          onClick={() => router.push('/agendamento/profissional-data')}
          className={`w-full py-4 flex items-center justify-center gap-2 font-bold font-display rounded-2xl shadow-2xl transition-all cursor-pointer ${
            selectedService
              ? 'bg-nav-gold text-black hover:bg-yellow-500 hover:shadow-[0_0_20px_rgba(229,176,92,0.4)] active:scale-[0.98]'
              : 'bg-neutral-800 text-neutral-500 border border-neutral-700 cursor-not-allowed opacity-90'
          }`}
        >
          <CalendarDays className="w-5 h-5" />
          <span>Continuar</span>
        </button>
      </div>
    </div>
  );
}
