'use client';

import React, { useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useScheduling } from '@/context/SchedulingContext';
import Image from 'next/image';
import { Check } from 'lucide-react';

function ConfirmationContent() {
  const { appointments, clearSelections } = useScheduling();
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get('id');

  // Find the current appointment
  const appointment = appointments.find((appt) => appt.id === id) || appointments[0];

  const handleReturnHome = () => {
    clearSelections();
    router.push('/');
  };

  const formatMockDate = () => {
    // Para simplificar e manter a fidelidade pedida
    return "Sexta, 20 Maio";
  };

  if (!appointment) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center bg-[#050505]">
        <p className="text-sm text-[#A3A3A3]">Carregando detalhes do agendamento...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full bg-[#050505] min-h-screen">
      <main className="flex-1 px-6 pt-6 pb-32 flex flex-col w-full max-w-md mx-auto items-center">
        
        {/* Logo Centralizada */}
        <div className="w-full flex justify-center mb-10">
          <Image 
            src="/assets/icone-navhub-escuro-login.png" 
            alt="NavHub Logo" 
            width={123} 
            height={37} 
            className="object-contain"
          />
        </div>

        {/* Ícone de Sucesso */}
        <div className="w-20 h-20 rounded-full bg-[#EEB74F] flex items-center justify-center mb-6">
          <Check className="w-10 h-10 text-black stroke-[3]" />
        </div>

        {/* Títulos */}
        <h1 className="text-white text-[28px] font-bold font-display leading-tight text-center mb-2">
          Agendamento Realizado!
        </h1>
        <p className="text-[#A3A3A3] text-[15px] text-center mb-10">
          Te esperamos no dia e horário marcados
        </p>

        {/* Lista de Dados */}
        <div className="w-full flex flex-col gap-4">
          <div className="flex justify-between items-center border-b border-[#1A1A1A] pb-4">
            <span className="text-[#A3A3A3] text-[15px]">Data</span>
            <span className="text-white text-[15px] font-semibold">{formatMockDate()}</span>
          </div>
          
          <div className="flex justify-between items-center border-b border-[#1A1A1A] pb-4">
            <span className="text-[#A3A3A3] text-[15px]">Horário</span>
            <span className="text-white text-[15px] font-semibold">{appointment.time || '15:30'}</span>
          </div>

          <div className="flex justify-between items-center border-b border-[#1A1A1A] pb-4">
            <span className="text-[#A3A3A3] text-[15px]">Profissional</span>
            <span className="text-white text-[15px] font-semibold">{appointment.barber?.name || 'Jefh Santos'}</span>
          </div>

          <div className="flex justify-between items-center border-b border-[#1A1A1A] pb-4">
            <span className="text-[#A3A3A3] text-[15px]">Serviço</span>
            <span className="text-white text-[15px] font-semibold">{appointment.service?.name || 'Corte Clássico'}</span>
          </div>

          <div className="flex justify-between items-center pt-2">
            <span className="text-[#A3A3A3] text-[15px]">Valor a pagar</span>
            <span className="text-[#EEB74F] text-[18px] font-bold">R$ {appointment.service?.price || '50,00'}</span>
          </div>
        </div>
      </main>

      {/* Floating Call to Action Bar */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[calc(100%-3rem)] max-w-md z-50">
        <button
          onClick={handleReturnHome}
          className="w-full py-[16px] flex items-center justify-center font-bold text-[16px] rounded-[12px] bg-[#EEB74F] text-black hover:opacity-90 transition-all cursor-pointer shadow-[0_4px_20px_rgba(238,183,79,0.3)]"
        >
          Voltar para o Início
        </button>
      </div>
    </div>
  );
}

export default function ConfirmationPage() {
  return (
    <Suspense fallback={
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#050505]">
        <p className="text-[#A3A3A3]">Carregando...</p>
      </div>
    }>
      <ConfirmationContent />
    </Suspense>
  );
}
