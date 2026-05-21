'use client';

import React, { useState } from 'react';
import { Scissors, MapPin, Mail, Clock, ChevronDown, ChevronUp } from 'lucide-react';

export function Footer() {
  const [isAddressesOpen, setIsAddressesOpen] = useState(false);

  return (
    <footer className="w-full border-t border-nav-border bg-[#060606] pt-12 pb-24 md:pb-8 mt-auto px-6 relative z-10">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
        {/* About Section */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-nav-gold">
            <div className="p-1.5 rounded bg-nav-gold/10 text-nav-gold border border-nav-gold/20">
              <Scissors className="w-4 h-4" />
            </div>
            <h4 className="font-display font-black text-lg uppercase tracking-tight">
              Nav<span className="text-white">Hub</span>
            </h4>
          </div>
          <p className="text-xs text-nav-text-muted leading-relaxed max-w-sm">
            NavHub Barbearia - Estilo, precisão e tradição em um único lugar. O seu visual cuidado pelos melhores profissionais da região, com agilidade e excelência.
          </p>
        </div>

        {/* Addresses Section (Collapsible on mobile for cleaner footprint) */}
        <div className="space-y-4">
          <div className="flex items-center justify-between md:block">
            <h4 className="font-display font-bold text-xs uppercase tracking-widest text-nav-text-light border-l-2 border-nav-gold pl-2">
              Nossas Unidades
            </h4>
            <button 
              onClick={() => setIsAddressesOpen(!isAddressesOpen)}
              className="md:hidden p-1 text-nav-gold hover:text-white transition-colors"
            >
              {isAddressesOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
          </div>
          
          <ul className={`text-xs text-nav-text-muted space-y-3 md:block ${isAddressesOpen ? 'block' : 'hidden'}`}>
            <li className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-nav-gold shrink-0 mt-0.5" />
              <div>
                <strong className="text-nav-text-light block">Nav Pagani</strong>
                <span>Av. Atílio Pagani, 270 - Palhoça</span>
              </div>
            </li>
            <li className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-nav-gold shrink-0 mt-0.5" />
              <div>
                <strong className="text-nav-text-light block">Nav Jardim Eldorado</strong>
                <span>R. Eldorado, 45 - Palhoça</span>
              </div>
            </li>
            <li className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-nav-gold shrink-0 mt-0.5" />
              <div>
                <strong className="text-nav-text-light block">Nav Pedra Branca</strong>
                <span>Av. Paulo Roberto Vidal, 123 - Pedra Branca</span>
              </div>
            </li>
            <li className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-nav-gold shrink-0 mt-0.5" />
              <div>
                <strong className="text-nav-text-light block">Nav Bela Vista</strong>
                <span>Rua José Cosme Pamplona, 1447 - Bela Vista</span>
              </div>
            </li>
            <li className="flex items-center gap-2 pt-2 border-t border-nav-border/30 mt-2">
              <Mail className="w-4 h-4 text-nav-gold shrink-0" />
              <a href="mailto:contato@navhub.com" className="hover:text-nav-gold transition-colors">contato@navhub.com</a>
            </li>
          </ul>
        </div>

        {/* Opening Hours Section */}
        <div className="space-y-4">
          <h4 className="font-display font-bold text-xs uppercase tracking-widest text-nav-text-light border-l-2 border-nav-gold pl-2">
            Horário de Atendimento
          </h4>
          <div className="bg-[#121212] border border-nav-border p-4 rounded-lg space-y-3">
            <div className="flex items-center justify-between text-xs text-nav-text-light">
              <span className="font-medium">Segunda a Sexta</span>
              <span className="text-nav-gold font-bold">09h às 20h</span>
            </div>
            <div className="flex items-center justify-between text-xs text-nav-text-light">
              <span className="font-medium">Sábado</span>
              <span className="text-nav-gold font-bold">09h às 18h</span>
            </div>
            <div className="flex items-center gap-1.5 text-[10px] text-nav-text-muted pt-2 border-t border-nav-border/30 mt-2">
              <Clock className="w-3.5 h-3.5 text-nav-gold shrink-0" />
              <span>Fechado aos domingos e feriados.</span>
            </div>
          </div>
        </div>
      </div>

      {/* Rights Bottom Bar */}
      <div className="max-w-6xl mx-auto border-t border-nav-border/40 mt-10 pt-4 flex flex-col sm:flex-row justify-between items-center gap-3 text-[10px] text-nav-text-muted">
        <span>&copy; {new Date().getFullYear()} NavHub. Todos os direitos reservados.</span>
        <span className="font-display font-semibold italic text-nav-gold/80">Pente com precisão de navalha.</span>
      </div>
    </footer>
  );
}
