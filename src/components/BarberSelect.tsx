'use client';

import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Barber } from '@/context/SchedulingContext';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';

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
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});

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

  const scrollCarousel = (direction: 'left' | 'right') => {
    if (!containerRef.current) return;
    const scrollAmount = 240;
    containerRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

  return (
    <div className="relative group/carousel w-full">
      {/* Left Arrow Button for Desktop */}
      <button
        onClick={() => scrollCarousel('left')}
        className="absolute left-2 top-1/2 -translate-y-1/2 z-10 hidden md:flex items-center justify-center w-9 h-9 rounded-full bg-[#161616]/90 border border-nav-border text-nav-gold hover:bg-neutral-800 hover:text-white transition-all cursor-pointer shadow-[0_0_10px_rgba(0,0,0,0.5)] hover:scale-105 active:scale-95"
        title="Anterior"
      >
        <ChevronLeft className="w-5 h-5 stroke-[2.5]" />
      </button>

      {/* Scrollable Container */}
      <div
        ref={containerRef}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        className={`flex gap-4 overflow-x-auto pb-4 pt-2 px-4 no-scrollbar scroll-smooth snap-x ${
          isDragging ? 'cursor-grabbing select-none' : 'cursor-grab'
        }`}
      >
        {barbers.map((barber) => {
          const isSelected = selectedBarber?.id === barber.id;
          const hasError = imageErrors[barber.id];
          const initials = barber.name
            .split(' ')
            .map((n) => n[0])
            .slice(0, 2)
            .join('')
            .toUpperCase();

          return (
            <div
              key={barber.id}
              onClick={() => handleBarberClick(barber)}
              className={`flex-none w-[140px] snap-center bg-nav-card border rounded-lg p-3.5 text-center transition-all duration-300 cursor-pointer select-none premium-glow-hover ${
                isSelected
                  ? 'border-nav-gold bg-[#161616] ring-1 ring-nav-gold/30 shadow-[0_0_15px_rgba(229,176,92,0.15)] scale-[1.02]'
                  : 'border-nav-border hover:border-neutral-700 hover:bg-[#121212]'
              }`}
            >
              {/* Avatar Container with size animation */}
              <div className="h-28 flex items-center justify-center mb-2">
                <motion.div
                  animate={{
                    width: isSelected ? 110 : 76,
                    height: isSelected ? 110 : 76,
                  }}
                  className={`relative rounded-full overflow-hidden border-2 transition-colors duration-300 ${
                    isSelected ? 'border-nav-gold' : 'border-neutral-800'
                  }`}
                  transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                >
                  {!hasError ? (
                    <img
                      src={barber.image}
                      alt={barber.name}
                      className="w-full h-full object-cover select-none pointer-events-none"
                      onError={() => setImageErrors((prev) => ({ ...prev, [barber.id]: true }))}
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-[#1F170E] to-[#121212] flex items-center justify-center text-nav-gold font-bold font-display text-lg border border-nav-gold/20 select-none">
                      {initials}
                    </div>
                  )}
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
              <p className="text-[9px] text-nav-text-muted truncate mt-0.5 font-medium">
                {barber.role.split(' / ')[0]}
              </p>

              <div className="flex items-center justify-center gap-0.5 mt-2 text-[9px] font-bold text-nav-gold">
                <Star className="w-2.5 h-2.5 fill-nav-gold text-nav-gold shrink-0" />
                <span>{barber.rating}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Right Arrow Button for Desktop */}
      <button
        onClick={() => scrollCarousel('right')}
        className="absolute right-2 top-1/2 -translate-y-1/2 z-10 hidden md:flex items-center justify-center w-9 h-9 rounded-full bg-[#161616]/90 border border-nav-border text-nav-gold hover:bg-neutral-800 hover:text-white transition-all cursor-pointer shadow-[0_0_10px_rgba(0,0,0,0.5)] hover:scale-105 active:scale-95"
        title="Próximo"
      >
        <ChevronRight className="w-5 h-5 stroke-[2.5]" />
      </button>
    </div>
  );
}
