'use client';

import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Barber } from '@/context/SchedulingContext';
import { Star } from 'lucide-react';

interface BarberSelectProps {
  barbers: Barber[];
  selectedBarber: Barber | null;
  onSelect: (barber: Barber) => void;
}

export function BarberSelect({ barbers, selectedBarber, onSelect }: BarberSelectProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const dragDistance = useRef(0);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - containerRef.current.offsetLeft);
    setScrollLeft(containerRef.current.scrollLeft);
    dragDistance.current = 0;
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !containerRef.current) return;
    e.preventDefault();
    const x = e.pageX - containerRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    containerRef.current.scrollLeft = scrollLeft - walk;
    dragDistance.current += Math.abs(e.movementX);
  };

  const handleBarberClick = (barber: Barber) => {
    if (dragDistance.current > 10) return;
    onSelect(barber);
  };

  return (
    <div
      ref={containerRef}
      onMouseDown={handleMouseDown}
      onMouseLeave={handleMouseLeave}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
      className={`flex gap-4 overflow-x-auto pb-4 pt-1 px-1 no-scrollbar -mx-4 px-4 snap-x ${
        isDragging ? 'cursor-grabbing select-none' : 'cursor-grab'
      }`}
    >
      {barbers.map((barber) => {
        const isSelected = selectedBarber?.id === barber.id;
        return (
          <div
            key={barber.id}
            onClick={() => handleBarberClick(barber)}
            className={`flex-none w-[115px] snap-center bg-nav-card border rounded-lg p-3 text-center transition-all duration-300 ${
              isSelected
                ? 'border-nav-gold bg-[#161616] shadow-[0_0_12px_rgba(229,176,92,0.12)]'
                : 'border-nav-border hover:border-neutral-700 hover:bg-[#121212]'
            }`}
          >
            {/* Avatar Container with size animation */}
            <div className="h-24 flex items-center justify-center mb-2">
              <motion.div
                animate={{
                  width: isSelected ? 90 : 60,
                  height: isSelected ? 90 : 60,
                }}
                className={`relative rounded-full overflow-hidden border-2 transition-colors duration-300 ${
                  isSelected ? 'border-nav-gold' : 'border-neutral-800'
                }`}
                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              >
                <img
                  src={barber.image}
                  alt={barber.name}
                  className="w-full h-full object-cover select-none pointer-events-none"
                />
                {isSelected && (
                  <div className="absolute inset-0 bg-nav-gold/10" />
                )}
              </motion.div>
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
