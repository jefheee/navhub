'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Barber } from '@/context/SchedulingContext';
import { Star } from 'lucide-react';

interface BarberSelectProps {
  barbers: Barber[];
  selectedBarber: Barber | null;
  onSelect: (barber: Barber) => void;
}

export function BarberSelect({ barbers, selectedBarber, onSelect }: BarberSelectProps) {
  return (
    <div className="flex gap-4 overflow-x-auto pb-4 pt-1 px-1 no-scrollbar -mx-4 px-4 snap-x">
      {barbers.map((barber) => {
        const isSelected = selectedBarber?.id === barber.id;
        return (
          <div
            key={barber.id}
            onClick={() => onSelect(barber)}
            className={`flex-none w-[115px] snap-center bg-nav-card border rounded-lg p-3 text-center cursor-pointer transition-all duration-300 ${
              isSelected
                ? 'border-nav-gold bg-[#161616] shadow-[0_0_12px_rgba(229,176,92,0.12)]'
                : 'border-nav-border hover:border-neutral-700 hover:bg-[#121212]'
            }`}
          >
            {/* Avatar Container with motion layoutId */}
            <div className="relative w-16 h-16 mx-auto mb-2 rounded-full overflow-hidden border-2 border-transparent">
              <motion.img
                layoutId={`barber-avatar-${barber.id}`}
                src={barber.image}
                alt={barber.name}
                className={`w-full h-full object-cover rounded-full transition-transform duration-300 ${
                  isSelected ? 'scale-105 border-nav-gold' : 'border-[#333]'
                }`}
              />
              {isSelected && (
                <div className="absolute inset-0 bg-nav-gold/10 border-2 border-nav-gold rounded-full" />
              )}
            </div>

            {/* Barber info */}
            <h4 className={`text-xs font-bold truncate font-display ${
              isSelected ? 'text-nav-gold' : 'text-nav-text-light'
            }`}>
              {barber.name}
            </h4>
            <p className="text-[9px] text-nav-text-muted truncate mt-0.5">
              {barber.role.split(' / ')[0]}
            </p>

            <div className="flex items-center justify-center gap-0.5 mt-1.5 text-[9px] font-bold text-nav-gold">
              <Star className="w-2.5 h-2.5 fill-nav-gold text-nav-gold shrink-0" />
              <span>{barber.rating}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
