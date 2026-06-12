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
      className={`group relative overflow-hidden rounded-[10px] p-5 cursor-pointer transition-all duration-300 ${
        isSelected
          ? 'bg-[#191715] border border-nav-gold shadow-[0_0_15px_rgba(229,176,92,0.15)]'
          : 'bg-[#191715] border border-transparent hover:border-nav-border-light'
      }`}
    >
      <div className="flex justify-between items-start gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h4 className={`text-[16px] font-bold transition-colors font-display ${
              isSelected ? 'text-nav-gold' : 'text-white'
            }`}>
              {service.name}
            </h4>
            {isSelected && (
              <span className="bg-nav-gold text-black rounded-full p-0.5">
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
          <span className={`text-[16px] font-bold font-display transition-colors ${
            isSelected ? 'text-nav-gold' : 'text-white'
          }`}>
            R$ {service.price}
          </span>
        </div>
      </div>
    </div>
  );
}
