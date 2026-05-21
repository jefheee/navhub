'use client';

import React from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Sparkles, Scissors, MapPin, Calendar, CheckSquare, User, LogOut } from 'lucide-react';
import { useScheduling } from '@/context/SchedulingContext';

export function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const { userProfile, isAuthenticated, logoutUser } = useScheduling();

  const getStepInfo = () => {
    switch (pathname) {
      case '/':
        return null;
      case '/agendamento/unidade':
        return { step: 1, title: 'Selecione a Unidade', icon: MapPin };
      case '/agendamento/servico':
        return { step: 2, title: 'Escolha o Serviço', icon: Scissors };
      case '/agendamento/profissional-data':
        return { step: 3, title: 'Barbeiro & Horário', icon: Calendar };
      case '/agendamento/confirmacao':
        return { step: 4, title: 'Confirmado!', icon: CheckSquare };
      default:
        return null;
    }
  };

  const stepInfo = getStepInfo();

  const desktopNavItems = [
    { label: 'Início', path: '/' },
    { label: 'Agendar', path: '/agendamento/unidade' },
    { label: 'Clube VIP', path: '/clube-vip' },
    { label: 'Perfil', path: '/perfil' },
  ];

  return (
    <>
      {/* 1. DESKTOP NAVIGATION HEADER (Visible on all pages on desktop) */}
      <header className="hidden md:block w-full border-b border-[#1A1A1A] bg-[#0D0D0D]/90 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 text-nav-text-light hover:text-nav-gold transition-colors group">
            <div className="p-2 rounded bg-nav-gold/10 text-nav-gold border border-nav-gold/20 group-hover:scale-105 transition-transform">
              <Scissors className="w-5 h-5" />
            </div>
            <span className="font-display font-black text-xl tracking-tight uppercase">
              Nav<span className="text-nav-gold">Hub</span>
            </span>
          </Link>

          {/* Navigation Links */}
          <nav className="flex items-center gap-8">
            {desktopNavItems.map((item) => {
              const isActive = item.path === '/' 
                ? pathname === '/' 
                : pathname.startsWith(item.path);

              return (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`text-sm font-medium tracking-wide transition-colors relative py-1 hover:text-nav-gold ${
                    isActive ? 'text-nav-gold font-semibold' : 'text-nav-text-muted'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-nav-gold rounded-full shadow-[0_0_8px_#E5B05C]" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Profile / Auth Area */}
          <div className="flex items-center gap-4">
            {isAuthenticated ? (
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="text-xs text-nav-text-muted">Olá,</p>
                  <p className="text-sm font-bold text-nav-text-light font-display">{userProfile.name}</p>
                </div>
                <Link href="/perfil" className="w-10 h-10 rounded-full overflow-hidden border-2 border-nav-gold/30 hover:border-nav-gold transition-colors block relative premium-glow">
                  <img
                    src={userProfile.avatar}
                    alt={userProfile.name}
                    className="w-full h-full object-cover"
                  />
                </Link>
                <button
                  onClick={() => {
                    logoutUser();
                    router.push('/login');
                  }}
                  className="p-2 rounded-lg bg-nav-surface border border-nav-border hover:bg-red-950/20 hover:border-red-900/50 hover:text-red-400 text-nav-text-muted transition-colors cursor-pointer"
                  title="Sair"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                className="px-4 py-2 rounded bg-nav-gold text-black font-semibold text-sm hover:bg-yellow-500 transition-colors font-display"
              >
                Entrar / Cadastrar
              </Link>
            )}
          </div>
        </div>
      </header>

      {/* 2. MOBILE HEADERS (Visible only on mobile) */}
      <div className="md:hidden w-full">
        {pathname === '/' ? (
          <header className="p-6 bg-gradient-to-b from-[#141414] to-transparent flex items-center justify-between border-b border-[#1A1A1A]/30">
            <div>
              <div className="flex items-center gap-1.5 text-nav-gold mb-1">
                <Sparkles className="w-4 h-4 fill-nav-gold" />
                <span className="text-xs uppercase tracking-wider font-semibold font-display">Clube VIP NavHub</span>
              </div>
              <h1 className="text-2xl font-bold font-display text-nav-text-light">
                Olá, {isAuthenticated ? userProfile.name : 'Visitante'}
              </h1>
              <p className="text-xs text-nav-text-muted">Seja bem-vindo de volta</p>
            </div>
            <Link href={isAuthenticated ? "/perfil" : "/login"} className="w-12 h-12 rounded-full overflow-hidden border-2 border-nav-gold/30 premium-glow cursor-pointer active:scale-95 transition-transform block">
              <img
                src={isAuthenticated ? userProfile.avatar : "https://ui-avatars.com/api/?name=V&background=A3A3A3&color=000&bold=true"}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </Link>
          </header>
        ) : stepInfo ? (
          <header className="p-5 bg-[#0D0D0D] border-b border-[#1A1A1A] sticky top-0 z-50 pwa-top">
            <div className="flex items-center justify-between mb-4">
              {stepInfo.step < 4 ? (
                <button
                  onClick={() => router.back()}
                  className="p-2 rounded-lg bg-nav-surface border border-nav-border hover:bg-neutral-800 transition-colors text-nav-text-light cursor-pointer"
                  aria-label="Voltar"
                >
                  <ArrowLeft className="w-5 h-5 text-nav-gold" />
                </button>
              ) : (
                <div className="w-9 h-9" />
              )}

              <div className="text-center">
                <span className="text-[10px] uppercase tracking-widest text-nav-gold font-bold font-display">
                  Passo {stepInfo.step} de 4
                </span>
                <h2 className="text-md font-semibold text-nav-text-light font-display">{stepInfo.title}</h2>
              </div>

              <div className="text-xs font-semibold px-2.5 py-1 rounded bg-[#E5B05C]/10 text-nav-gold border border-[#E5B05C]/20 font-display">
                NavHub
              </div>
            </div>

            {/* Stepper Progress Bar */}
            <div className="w-full h-[3px] bg-nav-surface rounded-full overflow-hidden flex gap-0.5">
              <div className={`h-full flex-1 transition-all duration-300 ${stepInfo.step >= 1 ? 'bg-nav-gold' : 'bg-neutral-800'}`} />
              <div className={`h-full flex-1 transition-all duration-300 ${stepInfo.step >= 2 ? 'bg-nav-gold' : 'bg-neutral-800'}`} />
              <div className={`h-full flex-1 transition-all duration-300 ${stepInfo.step >= 3 ? 'bg-nav-gold' : 'bg-neutral-800'}`} />
              <div className={`h-full flex-1 transition-all duration-300 ${stepInfo.step >= 4 ? 'bg-nav-gold' : 'bg-neutral-800'}`} />
            </div>
          </header>
        ) : null}
      </div>
    </>
  );
}
