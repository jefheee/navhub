'use client';

import React from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Home, CalendarDays, Sparkles, User } from 'lucide-react';

export function Navbar() {
  const router = useRouter();
  const pathname = usePathname();

  const navItems = [
    {
      label: 'Início',
      icon: Home,
      path: '/',
      active: pathname === '/',
    },
    {
      label: 'Agendar',
      icon: CalendarDays,
      path: '/agendamento/unidade',
      active: pathname.startsWith('/agendamento'),
    },
    {
      label: 'Clube VIP',
      icon: Sparkles,
      path: '/#assinaturas',
      active: false,
    },
    {
      label: 'Perfil',
      icon: '/#perfil',
      active: false,
      customIcon: true,
    },
  ];

  const handleNav = (item: typeof navItems[0]) => {
    if (item.path) {
      router.push(item.path);
    }
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-[#0D0D0D]/85 backdrop-blur-md border-t border-[#1A1A1A] px-6 py-3 flex justify-between items-center z-50 pwa-bottom shadow-[0_-5px_15px_rgba(0,0,0,0.5)]">
      {navItems.map((item, idx) => {
        const Icon = item.icon;
        return (
          <button
            key={idx}
            onClick={() => handleNav(item)}
            className="flex flex-col items-center justify-center gap-1 cursor-pointer group py-1 relative"
          >
            {item.active && (
              <span className="absolute -top-3 w-8 h-[2px] bg-nav-gold rounded-full shadow-[0_0_8px_#E5B05C]" />
            )}
            
            {item.customIcon ? (
              <div className={`w-6 h-6 rounded-full overflow-hidden border ${item.active ? 'border-nav-gold' : 'border-neutral-700'}`}>
                <img
                  src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=100&auto=format&fit=crop"
                  alt="Perfil"
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              <Icon
                className={`w-5.5 h-5.5 transition-all duration-200 group-hover:scale-110 ${
                  item.active ? 'text-nav-gold' : 'text-nav-text-muted hover:text-nav-text-light'
                }`}
              />
            )}
            <span
              className={`text-[10px] font-medium transition-colors font-display ${
                item.active ? 'text-nav-gold font-semibold' : 'text-nav-text-muted'
              }`}
            >
              {item.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
}
