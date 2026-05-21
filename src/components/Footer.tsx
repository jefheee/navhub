'use client';

import React from 'react';
import Link from 'next/link';
import { Scissors, Mail, Phone } from 'lucide-react';

export function Footer() {
  return (
    <footer className="w-full bg-[#030303] border-t border-nav-border/40 pt-16 pb-24 md:pb-12 mt-auto relative z-10">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
        
        {/* Brand Section */}
        <div className="flex flex-col gap-4 md:col-span-2">
          <Link href="/" className="flex items-center gap-2 text-nav-text-light hover:text-nav-gold transition-colors group">
            <div className="p-1.5 rounded-lg bg-nav-gold/10 text-nav-gold border border-nav-gold/20 group-hover:scale-105 transition-transform">
              <Scissors className="w-5 h-5" />
            </div>
            <span className="font-display font-black text-xl tracking-tight uppercase">
              Nav<span className="text-nav-gold">Hub</span>
            </span>
          </Link>
          <p className="text-sm text-nav-text-muted leading-relaxed max-w-sm mt-2">
            A barbearia que une estilo, precisão e tradição. Especialistas no seu visual com o melhor atendimento da região.
          </p>
          <div className="flex items-center gap-3 mt-2">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-full bg-nav-card border border-nav-border text-nav-text-muted hover:text-nav-gold hover:border-nav-gold/50 transition-colors">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
              </svg>
            </a>
          </div>
        </div>

        {/* Quick Links Menu */}
        <div className="flex flex-col gap-4">
          <h4 className="text-nav-text-light font-display font-bold uppercase tracking-widest text-xs mb-1">Navegação</h4>
          <Link href="/" className="text-sm text-nav-text-muted hover:text-nav-gold transition-colors w-fit">
            Início
          </Link>
          <Link href="/agendamento/unidade" className="text-sm text-nav-text-muted hover:text-nav-gold transition-colors w-fit">
            Agendar Horário
          </Link>
          <Link href="/clube-vip" className="text-sm text-nav-text-muted hover:text-nav-gold transition-colors w-fit">
            Clube VIP
          </Link>
          <Link href="/perfil" className="text-sm text-nav-text-muted hover:text-nav-gold transition-colors w-fit">
            Meu Perfil
          </Link>
        </div>

        {/* Contact Info */}
        <div className="flex flex-col gap-4">
          <h4 className="text-nav-text-light font-display font-bold uppercase tracking-widest text-xs mb-1">Contato</h4>
          <a href="mailto:contato@navhub.com.br" className="flex items-center gap-2 text-sm text-nav-text-muted hover:text-nav-gold transition-colors w-fit">
            <Mail className="w-4 h-4" />
            contato@navhub.com.br
          </a>
          <a href="tel:+5548999999999" className="flex items-center gap-2 text-sm text-nav-text-muted hover:text-nav-gold transition-colors w-fit">
            <Phone className="w-4 h-4" />
            (48) 99999-9999
          </a>
        </div>
      </div>

      {/* Divider */}
      <div className="max-w-6xl mx-auto px-6">
        <div className="border-t border-[#1A1A1A] pt-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-nav-text-muted">
          <span>&copy; {new Date().getFullYear()} NavHub. Todos os direitos reservados.</span>
          <span className="font-display font-bold text-nav-gold/70 tracking-widest uppercase text-[10px]">Pente com precisão de navalha</span>
        </div>
      </div>
    </footer>
  );
}
