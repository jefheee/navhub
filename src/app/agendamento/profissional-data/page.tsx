'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useScheduling } from '@/context/SchedulingContext';
import { ArrowLeft, CalendarDays } from 'lucide-react';
import Image from 'next/image';

export default function ProfessionalDataPage() {
  const { 
    selectedBarber, 
    setSelectedBarber,
    selectedDate,
    setSelectedDate,
    selectedTime,
    setSelectedTime,
    createAppointment
  } = useScheduling();
  
  const router = useRouter();
  
  const barbeirosExatos = [
    { id: '1', name: 'Jefh Santos', subtitle: 'Especialista em Fade', avatar: 'https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=400&q=80' },
    { id: '2', name: 'Daniel A...', subtitle: 'Especialista em d...', avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=400&q=80' }
  ];

  const horarios = [
    '10:00', '10:30', '11:00', '11:30', 
    '14:30', '15:00', '15:30', '16:00', 
    '16:30', '17:00', '17:30', '18:00'
  ];

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleBarberSelect = (barber: any) => {
    setSelectedBarber(barber);
  };

  const handleConfirm = () => {
    if (!selectedBarber || !selectedDate || !selectedTime) return;
    setIsSubmitting(true);
    setTimeout(() => {
      createAppointment();
      router.push('/agendamento/confirmacao');
    }, 1000);
  };

  return (
    <div className="flex flex-col w-full bg-[#12100E] min-h-screen">
      <main className="flex-1 px-6 pt-2 pb-32 flex flex-col w-full max-w-md mx-auto overflow-y-auto">
        
        {/* Seta de Voltar */}
        <button onClick={() => router.back()} className="mb-6 cursor-pointer">
          <ArrowLeft className="w-6 h-6 text-white" />
        </button>

        {/* Barra de Progresso ÚNICA */}
        <div className="flex flex-col mb-8">
          <div className="w-full bg-[#332F30] h-[4px] rounded-full overflow-hidden mb-2">
            <div className="bg-[#EEB74F] h-full" style={{ width: '40%' }} />
          </div>
          <span className="text-[#A3A3A3] text-sm font-medium">
            Passo 2 de 5 - Barbeiro
          </span>
        </div>

        {/* 1. Escolha o barbeiro */}
        <section className="mb-10">
          <div className="mb-5">
            <h1 className="text-white text-[28px] font-bold font-display leading-tight">
              Escolha o barbeiro
            </h1>
            <p className="text-[#A3A3A3] text-[15px] mt-1">
              Com quem você prefere fazer o serviço
            </p>
          </div>

          <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-2 hide-scrollbar -mx-6 px-6">
            {barbeirosExatos.map((barbeiro) => {
              const isSelected = selectedBarber?.name === barbeiro.name;
              return (
                <div 
                  key={barbeiro.id}
                  onClick={() => handleBarberSelect(barbeiro)}
                  className={`min-w-[140px] max-w-[140px] flex flex-col snap-start cursor-pointer rounded-[12px] overflow-hidden border-2 transition-all ${
                    isSelected ? 'border-[#EEB74F] shadow-[0_4px_15px_rgba(238,183,79,0.2)]' : 'border-transparent'
                  }`}
                >
                  <div className="w-full h-[180px] relative">
                    <img 
                      src={barbeiro.avatar} 
                      alt={barbeiro.name} 
                      className={`w-full h-full object-cover transition-transform ${isSelected ? 'scale-105' : 'scale-100 grayscale hover:grayscale-0'}`} 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                    <div className="absolute bottom-3 left-3 right-3">
                      <h3 className="text-white font-bold text-[15px] leading-tight mb-1">{barbeiro.name}</h3>
                      <p className="text-[#EEB74F] text-[11px] font-medium leading-tight">{barbeiro.subtitle}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* 2. Escolha a data */}
        <section className="mb-10">
          <div className="mb-5">
            <h2 className="text-white text-[24px] font-bold font-display leading-tight">
              Escolha a data
            </h2>
            <p className="text-[#A3A3A3] text-[15px] mt-1">
              Selecione um dia que seu barbeiro tem disponível
            </p>
          </div>

          {/* Calendário em Grade (Tabela) */}
          <div className="w-full overflow-x-auto hide-scrollbar">
            <div className="min-w-[320px]">
              {/* Header de Dias da Semana */}
              <div className="flex w-full mb-2">
                <div className="w-10 flex-shrink-0 flex items-center justify-center">
                  <span className="text-[#666] text-[11px] font-medium">05</span>
                </div>
                <div className="flex-1 grid grid-cols-7 gap-1 text-center">
                  {['seg', 'ter', 'qua', 'qui', 'sex'].map(d => (
                    <span key={d} className="text-[#A3A3A3] text-[11px] font-medium uppercase">{d}</span>
                  ))}
                  {['sab', 'dom'].map(d => (
                    <span key={d} className="text-[#EEB74F] text-[11px] font-bold uppercase">{d}</span>
                  ))}
                </div>
              </div>

              {/* Semanas Mockadas */}
              {[
                { week: 18, start: 4 },
                { week: 19, start: 11 },
                { week: 20, start: 18 },
              ].map((row, rIdx) => (
                <div key={row.week} className="flex w-full mb-1">
                  {/* Numero da Semana (Esquerda) */}
                  <div className="w-10 flex-shrink-0 bg-[#1A1A1A] rounded-[6px] flex items-center justify-center mr-2">
                    <span className="text-[#666] text-[12px] font-medium">{row.week}</span>
                  </div>
                  {/* Dias da Semana */}
                  <div className="flex-1 grid grid-cols-7 gap-1">
                    {[0, 1, 2, 3, 4, 5, 6].map(i => {
                      const dayNum = row.start + i;
                      const dateStr = `2026-05-${dayNum.toString().padStart(2, '0')}`;
                      const isSelected = selectedDate === dateStr;
                      const isWeekend = i === 5 || i === 6;
                      const isUnavailable = rIdx === 2 && i > 3; // Alguns dias indisponíveis
                      
                      return (
                        <div 
                          key={i} 
                          onClick={() => !isUnavailable && setSelectedDate(dateStr)}
                          className={`
                            h-10 flex items-center justify-center rounded-[6px] text-[13px] font-medium transition-colors cursor-pointer
                            ${isSelected ? 'bg-[#EEB74F] text-black font-bold' : ''}
                            ${!isSelected && !isUnavailable && isWeekend ? 'text-[#EEB74F] hover:bg-[#EEB74F]/10' : ''}
                            ${!isSelected && !isUnavailable && !isWeekend ? 'text-white bg-[#1A1A1A] hover:bg-[#333]' : ''}
                            ${isUnavailable ? 'text-[#EF4444] opacity-50 cursor-not-allowed bg-[#1A1A1A]' : ''}
                          `}
                        >
                          {dayNum}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 3. Escolha o horário */}
        <section className="mb-10">
          <div className="mb-5">
            <h2 className="text-white text-[24px] font-bold font-display leading-tight">
              Escolha o horário
            </h2>
            <p className="text-[#A3A3A3] text-[15px] mt-1">
              Selecione um horário disponível
            </p>
          </div>

          <div className="grid grid-cols-3 gap-3">
            {horarios.map((time) => {
              const isSelected = selectedTime === time;
              return (
                <button
                  key={time}
                  onClick={() => setSelectedTime(time)}
                  className={`
                    py-3 rounded-[8px] text-[14px] font-medium transition-all border
                    ${isSelected ? 'bg-[#EEB74F] text-black border-[#EEB74F]' : 'bg-[#1A1A1A] text-white border-[#333] hover:border-[#EEB74F]/50'}
                  `}
                >
                  {time}
                </button>
              );
            })}
          </div>
        </section>

      </main>

      {/* Floating Call to Action Bar */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[calc(100%-3rem)] max-w-md z-50">
        <button
          disabled={!selectedBarber || !selectedDate || !selectedTime || isSubmitting}
          onClick={handleConfirm}
          className={`w-full py-[16px] flex items-center justify-center gap-3 font-bold text-[16px] rounded-[12px] transition-all cursor-pointer ${
            selectedBarber && selectedDate && selectedTime
              ? 'bg-[#EEB74F] text-black hover:opacity-90 shadow-[0_4px_20px_rgba(238,183,79,0.3)]'
              : 'bg-[#332F30] text-[#777] cursor-not-allowed'
          }`}
        >
          {isSubmitting ? (
            <span>Processando...</span>
          ) : (
            <>
              <CalendarDays className="w-5 h-5 text-black" />
              <span>Agendar Horário</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
