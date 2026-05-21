'use client';

import React from 'react';
import Link from 'next/link';
import { Scissors, Mail, Phone } from 'lucide-react';

export function Footer() {
  return (
    <footer className="w-full border-t border-nav-border bg-[#060606] pt-10 pb-24 md:pb-10 mt-auto px-6 relative z-10">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
        
        {/* Brand Section */}
        <div className="flex flex-col gap-3 max-w-sm">
          <Link href="/" className="flex items-center gap-2 text-nav-text-light hover:text-nav-gold transition-colors group">
            <div className="p-1.5 rounded bg-nav-gold/10 text-nav-gold border border-nav-gold/20 group-hover:scale-105 transition-transform">
              <Scissors className="w-4.5 h-4.5" />
            </div>
            <span className="font-display font-black text-md tracking-tight uppercase">
              Nav<span className="text-nav-gold">Hub</span>
            </span>
          </Link>
          <p className="text-xs text-nav-text-muted leading-relaxed">
            Estilo, precisão e tradição em um só lugar. O seu visual cuidado pelos melhores barbeiros da região.
          </p>
        </div>

        {/* Quick Links Menu */}
        <div className="flex flex-wrap gap-x-8 gap-y-3">
          <Link href="/" className="text-xs text-nav-text-muted hover:text-nav-gold transition-colors font-medium">
            Início
          </Link>
          <Link href="/agendamento/unidade" className="text-xs text-nav-text-muted hover:text-nav-gold transition-colors font-medium">
            Agendar
          </Link>
          <Link href="/clube-vip" className="text-xs text-nav-text-muted hover:text-nav-gold transition-colors font-medium">
            Clube VIP
          </Link>
          <Link href="/perfil" className="text-xs text-nav-text-muted hover:text-nav-gold transition-colors font-medium">
            Perfil
          </Link>
        </div>

        {/* Contact & Socials */}
        <div className="flex items-center gap-4">
          <a
            href="mailto:contato@navhub.com.br"
            className="p-2 rounded-lg bg-nav-surface border border-nav-border text-nav-text-muted hover:text-nav-gold transition-colors"
            title="E-mail"
          >
            <Mail className="w-4 h-4" />
          </a>
          <a
            href="tel:+5548999999999"
            className="p-2 rounded-lg bg-nav-surface border border-nav-border text-nav-text-muted hover:text-nav-gold transition-colors"
            title="Telefone"
          >
            <Phone className="w-4 h-4" />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg bg-nav-surface border border-nav-border text-nav-text-muted hover:text-nav-gold transition-colors"
            title="Instagram"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
              <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
            </svg>
          </a>
        </div>

      </div>

      {/* Divider */}
      <div className="max-w-6xl mx-auto border-t border-nav-border/30 mt-8 pt-4 flex flex-col sm:flex-row justify-between items-center gap-3 text-[10px] text-nav-text-muted">
        <span>&copy; {new Date().getFullYear()} NavHub. Todos os direitos reservados.</span>
        <span className="font-display font-semibold italic text-nav-gold/80">Pente com precisão de navalha.</span>
      </div>
    </footer>
  );
}
