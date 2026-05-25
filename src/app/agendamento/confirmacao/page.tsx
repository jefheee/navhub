'use client';

import React, { useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useScheduling } from '@/context/SchedulingContext';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Scissors, Clock, Check } from 'lucide-react';
import gsap from 'gsap';

function ConfirmationContent() {
  const { appointments, clearSelections } = useScheduling();
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get('id');

  // Find the current appointment
  const appointment = appointments.find((appt) => appt.id === id) || appointments[0];

  useEffect(() => {
    // Reveal details with GSAP after checkmark animation starts
    if (appointment) {
      gsap.from('.confirm-fade-in', {
        opacity: 0,
        y: 15,
        stagger: 0.15,
        duration: 0.6,
        delay: 0.5,
        ease: 'power2.out',
      });
    }
  }, [appointment]);

  const handleReturnHome = () => {
    clearSelections();
    router.push('/');
  };

  const formatDate = (dateStr: string) => {
    const [year, month, day] = dateStr.split('-');
    const dateObj = new Date(Number(year), Number(month) - 1, Number(day));
    return dateObj.toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' });
  };

  if (!appointment) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center">
        <p className="text-sm text-nav-text-muted">Carregando detalhes do agendamento...</p>
      </div>
    );
  }

  // Animation variants
  const circleVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { type: 'spring' as const, stiffness: 200, damping: 15, delay: 0.1 }
    }
  };

  const checkmarkVariants = {
    hidden: { pathLength: 0 },
    visible: {
      pathLength: 1,
      transition: { duration: 0.5, ease: 'easeOut' as const, delay: 0.5 }
    }
  };

  return (
    <div className="py-6 flex flex-col items-center justify-center">
      {/* Animated Checkmark Icon */}
      <div className="flex flex-col items-center mb-6">
        <div className="relative flex items-center justify-center w-20 h-20 mb-4">
          {/* Glowing pulse rings */}
          <motion.div
            className="absolute inset-0 rounded-full bg-nav-gold/10"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1.3, opacity: [0, 0.4, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: 'easeOut' }}
          />
          <motion.div
            className="absolute inset-0 rounded-full bg-nav-gold/10"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1.5, opacity: [0, 0.25, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: 'easeOut', delay: 0.6 }}
          />

          <motion.svg
            width="80"
            height="80"
            viewBox="0 0 80 80"
            className="z-10"
            initial="hidden"
            animate="visible"
          >
            {/* Background Circle */}
            <motion.circle
              cx="40"
              cy="40"
              r="36"
              fill="none"
              stroke="#E5B05C"
              strokeWidth="4"
              variants={circleVariants}
            />
            {/* Checkmark Path */}
            <motion.path
              d="M26 40 L36 50 L56 30"
              fill="none"
              stroke="#E5B05C"
              strokeWidth="5"
              strokeLinecap="round"
              strokeLinejoin="round"
              variants={checkmarkVariants}
            />
          </motion.svg>
        </div>

        <motion.h3
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-2xl font-black text-nav-text-light font-display tracking-tight text-center"
        >
          Agendamento Concluído!
        </motion.h3>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-xs text-nav-text-muted mt-1 text-center"
        >
          Seu horário foi reservado com sucesso
        </motion.p>
      </div>

      {/* Summary card */}
      <div className="confirm-fade-in w-full bg-nav-card border border-nav-border rounded-lg p-5 mb-8 relative premium-glow">
        <div className="absolute top-0 right-0 w-24 h-24 bg-nav-gold/5 rounded-bl-full pointer-events-none" />
        
        {/* Selected Barber Hero Avatar Morph (layoutId) */}
        <div className="flex items-center gap-4 border-b border-nav-border pb-4 mb-4">
          <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-nav-gold shadow-[0_0_10px_rgba(229,176,92,0.2)]">
            <motion.img
              layoutId={`barber-avatar-${appointment.barber.id}`}
              src={appointment.barber.image}
              alt={appointment.barber.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <span className="text-[10px] text-nav-gold font-bold uppercase tracking-wider block font-display">
              Barbeiro Escolhido
            </span>
            <h4 className="text-md font-bold text-nav-text-light font-display">
              {appointment.barber.name}
            </h4>
            <p className="text-xs text-nav-text-muted mt-0.5">
              {appointment.barber.role}
            </p>
          </div>
        </div>

        {/* Details List */}
        <div className="space-y-3.5">
          <div className="flex items-start gap-3">
            <MapPin className="w-4 h-4 text-nav-gold mt-0.5 shrink-0" />
            <div>
              <span className="text-[10px] text-nav-text-muted uppercase tracking-wider block font-display">
                Unidade
              </span>
              <span className="text-sm font-semibold text-nav-text-light">
                {appointment.unit.name}
              </span>
              <span className="text-xs text-nav-text-muted block mt-0.5">
                {appointment.unit.address}
              </span>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Scissors className="w-4 h-4 text-nav-gold mt-0.5 shrink-0" />
            <div>
              <span className="text-[10px] text-nav-text-muted uppercase tracking-wider block font-display">
                Serviço
              </span>
              <span className="text-sm font-semibold text-nav-text-light">
                {appointment.service.name}
              </span>
              <span className="text-xs text-nav-text-muted block mt-0.5">
                R$ {appointment.service.price} • {appointment.service.duration}
              </span>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Calendar className="w-4 h-4 text-nav-gold mt-0.5 shrink-0" />
            <div>
              <span className="text-[10px] text-nav-text-muted uppercase tracking-wider block font-display">
                Data & Horário
              </span>
              <span className="text-sm font-semibold text-nav-text-light capitalize">
                {formatDate(appointment.date)} às {appointment.time}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Primary Action Button */}
      <div className="confirm-fade-in fixed bottom-6 left-1/2 -translate-x-1/2 w-[calc(100%-2.5rem)] max-w-[calc(430px-2.5rem)] z-50 pwa-bottom">
        <button
          onClick={handleReturnHome}
          className="w-full bg-nav-gold text-black hover:bg-yellow-500 font-bold font-display rounded-2xl py-4 transition-colors cursor-pointer text-center shadow-2xl hover:shadow-[0_0_20px_rgba(229,176,92,0.4)] active:scale-[0.98]"
        >
          Ver meus Agendamentos
        </button>
      </div>
    </div>
  );
}

export default function ConfirmationPage() {
  return (
    <Suspense fallback={
      <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center">
        <p className="text-sm text-nav-text-muted">Carregando detalhes do agendamento...</p>
      </div>
    }>
      <ConfirmationContent />
    </Suspense>
  );
}
