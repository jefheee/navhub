'use client';

import React, { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useScheduling, Unit } from '@/context/SchedulingContext';
import { MapPin, Star, ChevronRight } from 'lucide-react';
import gsap from 'gsap';

export default function UnitSelectionPage() {
  const { mockUnits, setSelectedUnit, selectedUnit } = useScheduling();
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.unit-reveal-card', {
        opacity: 0,
        y: 20,
        stagger: 0.15,
        duration: 0.5,
        ease: 'power3.out',
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const handleUnitSelect = (unit: Unit) => {
    setSelectedUnit(unit);
    router.push('/agendamento/servico');
  };

  return (
    <div ref={containerRef} className="py-3 flex flex-col gap-5">
      <div className="text-center px-4 mb-2">
        <p className="text-sm text-nav-text-muted">
          Escolha a barbearia Nav mais conveniente para você
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {mockUnits.map((unit) => {
          const isSelected = selectedUnit?.id === unit.id;
          return (
            <div
              key={unit.id}
              onClick={() => handleUnitSelect(unit)}
              className={`unit-reveal-card bg-nav-card border rounded-lg overflow-hidden cursor-pointer transition-all duration-300 premium-glow-hover flex flex-col ${
                isSelected
                  ? 'border-nav-gold ring-2 ring-nav-gold/50 opacity-100 scale-[1.01] shadow-[0_0_20px_rgba(229,176,92,0.15)]'
                  : selectedUnit
                    ? 'border-nav-border opacity-50 grayscale-[15%]'
                    : 'border-nav-border opacity-100'
              }`}
            >
              <div className="h-44 w-full relative">
                <img
                  src={unit.image}
                  alt={unit.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                  <div>
                    <h3 className="text-lg font-bold text-white font-display">
                      {unit.name}
                    </h3>
                    <p className="text-xs text-nav-text-muted flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3.5 h-3.5 text-nav-gold shrink-0" />
                      <span>{unit.address}</span>
                    </p>
                  </div>
                  <div className="flex items-center gap-1 bg-[#E5B05C] text-black text-xs font-bold px-2 py-0.5 rounded">
                    <Star className="w-3.5 h-3.5 fill-black text-black" />
                    <span>{unit.rating}</span>
                  </div>
                </div>
              </div>
              <div className="p-4 flex items-center justify-between bg-[#111] hover:bg-[#151515] transition-colors border-t border-nav-border">
                <span className="text-xs text-nav-text-muted">
                  Horário: Seg - Sáb: 09:00 às 20:00
                </span>
                <span className="text-xs text-nav-gold font-semibold flex items-center gap-0.5">
                  Selecionar <ChevronRight className="w-4 h-4" />
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
