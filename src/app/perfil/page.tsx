'use client';

import React, { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useScheduling } from '@/context/SchedulingContext';
import { ArrowLeft, User, Settings, Bell, CreditCard, LogOut, ChevronRight, Shield } from 'lucide-react';
import Link from 'next/link';
import gsap from 'gsap';

export default function ProfilePage() {
  const router = useRouter();
  const { clearSelections } = useScheduling();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.profile-reveal', {
        opacity: 0,
        y: 15,
        stagger: 0.1,
        duration: 0.5,
        ease: 'power2.out',
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const handleLogout = () => {
    // Simulate logout: clear scheduling selections and send home
    clearSelections();
    router.push('/');
  };

  return (
    <div ref={containerRef} className="py-4 flex flex-col gap-6 pb-24">
      {/* Custom Profile Header */}
      <div className="flex items-center gap-4 profile-reveal">
        <Link
          href="/"
          className="p-2.5 rounded-lg bg-nav-surface border border-nav-border hover:bg-neutral-800 transition-colors text-nav-text-light cursor-pointer"
        >
          <ArrowLeft className="w-5 h-5 text-nav-gold" />
        </Link>
        <div>
          <h2 className="text-xl font-bold text-nav-text-light font-display">Meu Perfil</h2>
          <p className="text-xs text-nav-text-muted">Gerencie suas configurações</p>
        </div>
      </div>

      {/* User Card */}
      <div className="bg-nav-card border border-nav-border rounded-lg p-5 flex items-center gap-4 profile-reveal premium-glow">
        <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-nav-gold shadow-[0_0_10px_rgba(229,176,92,0.15)]">
          <img
            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200&auto=format&fit=crop"
            alt="Daniel Profile"
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <h3 className="text-lg font-bold text-nav-text-light font-display">Daniel</h3>
          <p className="text-xs text-nav-text-muted">daniel@navhub.com.br</p>
          <span className="inline-block text-[9px] bg-nav-gold/15 text-nav-gold border border-nav-gold/20 font-bold px-2 py-0.5 rounded mt-2 uppercase tracking-wider font-display">
            Cliente VIP Premium
          </span>
        </div>
      </div>

      {/* Menu Options Group 1 */}
      <div className="flex flex-col bg-nav-card border border-nav-border rounded-lg overflow-hidden profile-reveal">
        <div className="p-4 border-b border-nav-border/50 bg-[#121212]">
          <span className="text-[10px] text-nav-gold font-bold uppercase tracking-wider font-display">
            Configurações da Conta
          </span>
        </div>
        
        {/* Option: Meus Dados */}
        <button className="flex items-center justify-between p-4 hover:bg-[#151515] transition-colors border-b border-nav-border/30 text-left cursor-pointer group">
          <div className="flex items-center gap-3">
            <User className="w-4 h-4 text-nav-gold group-hover:scale-110 transition-transform" />
            <div>
              <span className="text-sm font-semibold text-nav-text-light block">Meus Dados</span>
              <span className="text-[10px] text-nav-text-muted">Nome, e-mail e telefone de contato</span>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-nav-text-muted group-hover:text-nav-gold transition-colors" />
        </button>

        {/* Option: Preferências */}
        <button className="flex items-center justify-between p-4 hover:bg-[#151515] transition-colors border-b border-nav-border/30 text-left cursor-pointer group">
          <div className="flex items-center gap-3">
            <Settings className="w-4 h-4 text-nav-gold group-hover:scale-110 transition-transform" />
            <div>
              <span className="text-sm font-semibold text-nav-text-light block">Preferências</span>
              <span className="text-[10px] text-nav-text-muted">Barbeiro favorito e notificações push</span>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-nav-text-muted group-hover:text-nav-gold transition-colors" />
        </button>

        {/* Option: Segurança */}
        <button className="flex items-center justify-between p-4 hover:bg-[#151515] transition-colors text-left cursor-pointer group">
          <div className="flex items-center gap-3">
            <Shield className="w-4 h-4 text-nav-gold group-hover:scale-110 transition-transform" />
            <div>
              <span className="text-sm font-semibold text-nav-text-light block">Segurança</span>
              <span className="text-[10px] text-nav-text-muted">Alterar senha e autenticação</span>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-nav-text-muted group-hover:text-nav-gold transition-colors" />
        </button>
      </div>

      {/* Menu Options Group 2 */}
      <div className="flex flex-col bg-nav-card border border-nav-border rounded-lg overflow-hidden profile-reveal">
        <div className="p-4 border-b border-nav-border/50 bg-[#121212]">
          <span className="text-[10px] text-nav-gold font-bold uppercase tracking-wider font-display">
            Financeiro & Planos
          </span>
        </div>

        <Link href="/clube-vip" className="flex items-center justify-between p-4 hover:bg-[#151515] transition-colors border-b border-nav-border/30 text-left cursor-pointer group">
          <div className="flex items-center gap-3">
            <CreditCard className="w-4 h-4 text-nav-gold group-hover:scale-110 transition-transform" />
            <div>
              <span className="text-sm font-semibold text-nav-text-light block">Clube VIP NavHub</span>
              <span className="text-[10px] text-nav-text-muted">Gerenciar assinatura ou ver benefícios</span>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-nav-text-muted group-hover:text-nav-gold transition-colors" />
        </Link>
      </div>

      {/* Logout Action */}
      <div className="profile-reveal mt-2">
        <button
          onClick={handleLogout}
          className="w-full py-3.5 border border-red-950/50 bg-red-950/10 hover:bg-red-900/20 text-red-400 hover:text-red-300 font-bold font-display rounded-md transition-all cursor-pointer flex items-center justify-center gap-2 active:scale-[0.98]"
        >
          <LogOut className="w-4 h-4" />
          Sair da Conta
        </button>
      </div>
    </div>
  );
}
