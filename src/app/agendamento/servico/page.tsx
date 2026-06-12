'use client';

import React, { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useScheduling } from '@/context/SchedulingContext';
import { ArrowLeft, Scissors } from 'lucide-react';
import Image from 'next/image';

export default function ServiceSelectionPage() {
  const { 
    selectedUnit, 
    selectedService, 
    setSelectedService
  } = useScheduling();
  
  const router = useRouter();
  
  const servicosExatos = [
    { id: '1', name: 'Corte Clássico', price: 50, duration: 30 },
    { id: '2', name: 'Corte Degradê', price: 60, duration: 40 },
    { id: '3', name: 'Corte + Barba', price: 80, duration: 60 },
    { id: '4', name: 'Corte Premium', price: 100, duration: 70 }
  ];

  const handleSelect = (service: any) => {
    setSelectedService(service);
  };

  return (
    <div className="flex flex-col w-full bg-[#12100E] min-h-screen">
      <main className="flex-1 px-6 pt-2 pb-32 flex flex-col w-full max-w-md mx-auto">
        
        {/* Seta de Voltar */}
        <button onClick={() => router.back()} className="mb-6 cursor-pointer">
          <ArrowLeft className="w-6 h-6 text-white" />
        </button>

        {/* Barra de Progresso */}
        <div className="flex flex-col mb-8">
          <div className="w-full bg-[#332F30] h-[4px] rounded-full overflow-hidden mb-2">
            <div className="bg-[#EEB74F] h-full" style={{ width: '20%' }} />
          </div>
          <span className="text-[#A3A3A3] text-sm font-medium">
            Passo 1 de 5 - Serviço
          </span>
        </div>

        {/* Localização */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-8 h-8 flex items-center justify-center">
            <Image 
              src="/assets/icone-localizacao-pin.png" 
              alt="Localização" 
              width={20} 
              height={20} 
              style={{ filter: 'brightness(0) saturate(100%) invert(82%) sepia(43%) saturate(1099%) hue-rotate(341deg) brightness(96%) contrast(93%)' }} 
            />
          </div>
          <span className="text-white text-lg font-semibold font-display">
            Nav Jardim Eldorado
          </span>
        </div>

        {/* Títulos */}
        <div className="mb-8">
          <h1 className="text-white text-[28px] font-bold font-display leading-tight">
            Escolha o serviço
          </h1>
          <p className="text-[#A3A3A3] text-[15px] mt-1">
            Qual é a experiência que você procura?
          </p>
        </div>

        {/* Lista de Serviços */}
        <div className="flex flex-col gap-3">
          {servicosExatos.map((servico) => {
            const isSelected = selectedService?.name === servico.name;
            return (
              <div 
                key={servico.id}
                onClick={() => handleSelect(servico)}
                className={`flex items-center justify-between p-4 rounded-[12px] border cursor-pointer transition-colors ${
                  isSelected ? 'bg-[#222] border-[#EEB74F]' : 'bg-[#1A1A1A] border-transparent hover:border-[#333]'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-[#EEB74F] rounded-[8px] flex items-center justify-center flex-shrink-0">
                    <Scissors className="w-6 h-6 text-black" />
                  </div>
                  <h3 className="text-white font-bold text-[16px] font-display">{servico.name}</h3>
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-white font-bold text-[16px]">R${servico.price}</span>
                  <span className="text-[#A3A3A3] text-[12px]">{servico.duration} min</span>
                </div>
              </div>
            );
          })}
        </div>

      </main>

      {/* Floating Call to Action Bar */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[calc(100%-3rem)] max-w-md z-50">
        <button
          disabled={!selectedService}
          onClick={() => router.push('/agendamento/profissional-data')}
          className={`w-full py-[16px] flex items-center justify-center font-bold text-[16px] rounded-[12px] transition-all cursor-pointer ${
            selectedService
              ? 'bg-[#EEB74F] text-black hover:opacity-90 shadow-[0_4px_20px_rgba(238,183,79,0.3)]'
              : 'bg-[#332F30] text-[#777] cursor-not-allowed'
          }`}
        >
          Próximo Passo →
        </button>
      </div>
    </div>
  );
}
