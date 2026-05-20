'use client';

import React from 'react';
import { Service } from '@/context/SchedulingContext';
import { Clock, Check } from 'lucide-react';

interface ServiceCardProps {
  service: Service;
  isSelected: boolean;
  onSelect: (service: Service) => void;
}

export function ServiceCard({ service, isSelected, onSelect }: ServiceCardProps) {
  return (
    <div
      onClick={() => onSelect(service)}
      className={`group relative overflow-hidden bg-nav-card border rounded-lg p-5 cursor-pointer transition-all duration-300 ${
        isSelected
          ? 'border-nav-gold shadow-[0_0_15px_rgba(229,176,92,0.15)] bg-[#171717]'
          : 'border-nav-border hover:border-neutral-700 hover:bg-[#121212]'
      }`}
    >
      <div className="flex justify-between items-start gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h4 className={`text-md font-bold transition-colors font-display ${
              isSelected ? 'text-nav-gold' : 'text-nav-text-light'
            }`}>
              {service.name}
            </h4>
            {isSelected && (
              <span className="bg-nav-gold text-black rounded-full p-0.5 animate-pulse">
                <Check className="w-3 h-3 stroke-[3]" />
              </span>
            )}
          </div>
          <p className="text-xs text-nav-text-muted mt-1.5 leading-relaxed">
            {service.description}
          </p>
          <div className="flex items-center gap-1.5 mt-3 text-nav-text-muted text-[11px]">
            <Clock className="w-3.5 h-3.5 text-nav-gold" />
            <span>{service.duration}</span>
          </div>
        </div>
        
        <div className="text-right shrink-0">
          <span className={`text-lg font-black font-display transition-colors ${
            isSelected ? 'text-nav-gold' : 'text-nav-text-light'
          }`}>
            R$ {service.price}
          </span>
        </div>
      </div>
      
      {/* Decorative vertical golden line when selected */}
      {isSelected && (
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-nav-gold" />
      )}
    </div>
  );
}
