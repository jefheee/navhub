'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useScheduling } from '@/context/SchedulingContext';
import { ArrowLeft, User, Settings, CreditCard, LogOut, ChevronRight, Shield, X, Check, Save, Camera, Bell, BellOff, Upload } from 'lucide-react';
import Link from 'next/link';
import gsap from 'gsap';
import { motion, AnimatePresence } from 'framer-motion';

export default function ProfilePage() {
  const router = useRouter();
  const { userProfile, setUserProfile, clearSelections, isAuthenticated, logoutUser, mockBarbers } = useScheduling();
  const containerRef = useRef<HTMLDivElement>(null);

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      router.replace('/login');
    }
  }, [isAuthenticated, router]);

  // GSAP reveal animations for content sections
  useEffect(() => {
    if (!isAuthenticated) return;
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
  }, [isAuthenticated]);

  // Modal control states
  const [isDataModalOpen, setIsDataModalOpen] = useState(false);
  const [isPrefsModalOpen, setIsPrefsModalOpen] = useState(false);
  const [isSecurityModalOpen, setIsSecurityModalOpen] = useState(false);
  const [isPhotoModalOpen, setIsPhotoModalOpen] = useState(false);

  // Form input states
  // Meus Dados Form
  const [formDataName, setFormDataName] = useState('');
  const [formDataEmail, setFormDataEmail] = useState('');
  const [formDataPhone, setFormDataPhone] = useState('');

  // Preferências Form
  const [formFavBarber, setFormFavBarber] = useState('');
  const [formNotifications, setFormNotifications] = useState(true);

  // Segurança Form
  const [formCurrentPassword, setFormCurrentPassword] = useState('');
  const [formNewPassword, setFormNewPassword] = useState('');
  const [formConfirmPassword, setFormConfirmPassword] = useState('');

  // Mudar Foto Form
  const [customAvatarUrl, setCustomAvatarUrl] = useState('');

  // Toast notification state
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Initialize form states when modals open
  useEffect(() => {
    if (userProfile) {
      setFormDataName(userProfile.name);
      setFormDataEmail(userProfile.email);
      setFormDataPhone(userProfile.phone);
      setFormFavBarber(userProfile.favoriteBarberId || '');
      setFormNotifications(userProfile.allowNotifications);
    }
  }, [userProfile, isDataModalOpen, isPrefsModalOpen]);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const handleSaveData = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formDataName || !formDataEmail) {
      showToast('Por favor, preencha nome e e-mail.');
      return;
    }
    setUserProfile({
      ...userProfile,
      name: formDataName,
      email: formDataEmail,
      phone: formDataPhone,
    });
    setIsDataModalOpen(false);
    showToast('Dados atualizados com sucesso!');
  };

  const handleSavePrefs = (e: React.FormEvent) => {
    e.preventDefault();
    setUserProfile({
      ...userProfile,
      favoriteBarberId: formFavBarber,
      allowNotifications: formNotifications,
    });
    setIsPrefsModalOpen(false);
    showToast('Preferências salvas com sucesso!');
  };

  const handleSaveSecurity = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formCurrentPassword || !formNewPassword || !formConfirmPassword) {
      showToast('Preencha todos os campos de senha.');
      return;
    }
    if (formNewPassword !== formConfirmPassword) {
      showToast('A nova senha e a confirmação não conferem.');
      return;
    }
    // Simulate API update
    setIsSecurityModalOpen(false);
    setFormCurrentPassword('');
    setFormNewPassword('');
    setFormConfirmPassword('');
    showToast('Senha alterada com sucesso!');
  };

  const handleSelectPresetAvatar = (url: string) => {
    setUserProfile({
      ...userProfile,
      avatar: url,
    });
    setIsPhotoModalOpen(false);
    showToast('Foto de perfil alterada com sucesso!');
  };

  const handleSaveCustomAvatar = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customAvatarUrl) {
      showToast('Insira uma URL válida.');
      return;
    }
    setUserProfile({
      ...userProfile,
      avatar: customAvatarUrl,
    });
    setCustomAvatarUrl('');
    setIsPhotoModalOpen(false);
    showToast('Foto de perfil customizada alterada!');
  };

  const handleLocalAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      showToast('A imagem deve ter no máximo 2MB.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const base64Url = event.target?.result as string;
      if (base64Url) {
        setUserProfile({
          ...userProfile,
          avatar: base64Url,
        });
        setIsPhotoModalOpen(false);
        showToast('Foto de perfil atualizada com sucesso!');
      }
    };
    reader.readAsDataURL(file);
  };

  const handleLogout = () => {
    logoutUser();
    router.push('/login');
  };

  // Preset avatars definitions
  const presetAvatars = [
    { name: 'Padrão (Daniel)', url: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200&auto=format&fit=crop' },
    { name: 'Executiva', url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop' },
    { name: 'Barba Estilosa', url: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?q=80&w=200&auto=format&fit=crop' },
    { name: 'Casual Moderno', url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop' },
    { name: 'Ondulado Sorridente', url: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&auto=format&fit=crop' },
    { name: 'Estilo Urbano', url: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=200&auto=format&fit=crop' },
  ];

  if (!isAuthenticated) return null;

  return (
    <div ref={containerRef} className="py-4 flex flex-col gap-6 pb-24 relative">
      
      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-20 left-1/2 -translate-x-1/2 bg-nav-gold text-black text-xs font-bold px-6 py-3 rounded-full z-[101] shadow-[0_4px_12px_rgba(229,176,92,0.3)] flex items-center gap-2"
          >
            <Check className="w-4 h-4 stroke-[3]" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

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

      {/* Profile Items in a Two-Column Grid on Desktop */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
        
        {/* Left Column: User Card & Logout Button */}
        <div className="md:col-span-4 flex flex-col gap-6 profile-reveal">
          {/* User Card */}
          <div className="bg-nav-card border border-nav-border rounded-lg p-5 flex flex-row md:flex-col items-center md:text-center gap-4 premium-glow">
            <div className="relative group md:mx-auto">
              <div className="w-16 h-16 md:w-24 md:h-24 rounded-full overflow-hidden border-2 border-nav-gold shadow-[0_0_10px_rgba(229,176,92,0.15)] relative bg-neutral-900 mx-auto">
                <img
                  src={userProfile.avatar}
                  alt={userProfile.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <button 
                onClick={() => setIsPhotoModalOpen(true)}
                className="absolute -bottom-1 -right-1 p-1.5 rounded-full bg-nav-gold text-black border border-black hover:bg-yellow-500 transition-colors cursor-pointer active:scale-90"
                title="Alterar Foto"
              >
                <Camera className="w-3.5 h-3.5" />
              </button>
            </div>
            <div className="md:w-full">
              <h3 className="text-lg font-bold text-nav-text-light font-display">{userProfile.name}</h3>
              <p className="text-xs text-nav-text-muted">{userProfile.email}</p>
              <span className="inline-block text-[9px] bg-nav-gold/15 text-nav-gold border border-nav-gold/20 font-bold px-2 py-0.5 rounded mt-2 uppercase tracking-wider font-display">
                {userProfile.vipStatus === 'premium' 
                  ? 'Cliente VIP Premium' 
                  : userProfile.vipStatus === 'basic' 
                    ? 'Cliente VIP Básico' 
                    : 'Cliente Regular'}
              </span>
            </div>
          </div>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="w-full py-3.5 border border-red-950/50 bg-red-950/10 hover:bg-red-900/20 text-red-400 hover:text-red-300 font-bold font-display rounded-md transition-all cursor-pointer flex items-center justify-center gap-2 active:scale-[0.98]"
          >
            <LogOut className="w-4 h-4" />
            Sair da Conta
          </button>
        </div>

        {/* Right Column: Settings and Preferences */}
        <div className="md:col-span-8 flex flex-col gap-6 profile-reveal">
          {/* Menu Options Group 1 */}
          <div className="flex flex-col bg-nav-card border border-nav-border rounded-lg overflow-hidden">
            <div className="p-4 border-b border-nav-border/50 bg-[#121212]">
              <span className="text-[10px] text-nav-gold font-bold uppercase tracking-wider font-display">
                Configurações da Conta
              </span>
            </div>
            
            {/* Option: Meus Dados */}
            <button 
              onClick={() => setIsDataModalOpen(true)}
              className="flex items-center justify-between p-4 hover:bg-[#151515] transition-colors border-b border-nav-border/30 text-left cursor-pointer group w-full bg-transparent border-0"
            >
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
            <button 
              onClick={() => setIsPrefsModalOpen(true)}
              className="flex items-center justify-between p-4 hover:bg-[#151515] transition-colors border-b border-nav-border/30 text-left cursor-pointer group w-full bg-transparent border-0"
            >
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
            <button 
              onClick={() => setIsSecurityModalOpen(true)}
              className="flex items-center justify-between p-4 hover:bg-[#151515] transition-colors text-left cursor-pointer group w-full bg-transparent border-0"
            >
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
          <div className="flex flex-col bg-nav-card border border-nav-border rounded-lg overflow-hidden">
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
        </div>

      </div>

      {/* ==================================== MODALS ==================================== */}

      {/* 1. Modal: Meus Dados */}
      <AnimatePresence>
        {isDataModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsDataModalOpen(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="w-full max-w-md bg-[#0D0D0D] border border-nav-border rounded-xl p-6 relative z-10 shadow-2xl"
            >
              <div className="flex justify-between items-center mb-5 border-b border-nav-border pb-3">
                <h3 className="text-md font-bold text-nav-text-light font-display flex items-center gap-2">
                  <User className="w-5 h-5 text-nav-gold" />
                  Meus Dados
                </h3>
                <button 
                  onClick={() => setIsDataModalOpen(false)}
                  className="p-1 rounded-lg bg-nav-surface border border-nav-border text-nav-text-muted hover:text-white cursor-pointer transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleSaveData} className="space-y-4">
                <div>
                  <label className="text-xs font-semibold text-nav-text-muted font-display block mb-1.5 ml-0.5">
                    Nome Completo
                  </label>
                  <input
                    type="text"
                    value={formDataName}
                    onChange={(e) => setFormDataName(e.target.value)}
                    className="w-full bg-[#161616] border border-nav-border focus:border-nav-gold/50 rounded-xl px-4 py-3 text-sm text-white outline-none transition-colors"
                    placeholder="Seu nome"
                    required
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-nav-text-muted font-display block mb-1.5 ml-0.5">
                    Endereço de E-mail
                  </label>
                  <input
                    type="email"
                    value={formDataEmail}
                    onChange={(e) => setFormDataEmail(e.target.value)}
                    className="w-full bg-[#161616] border border-nav-border focus:border-nav-gold/50 rounded-xl px-4 py-3 text-sm text-white outline-none transition-colors"
                    placeholder="email@dominio.com"
                    required
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-nav-text-muted font-display block mb-1.5 ml-0.5">
                    Telefone celular
                  </label>
                  <input
                    type="tel"
                    value={formDataPhone}
                    onChange={(e) => setFormDataPhone(e.target.value)}
                    className="w-full bg-[#161616] border border-nav-border focus:border-nav-gold/50 rounded-xl px-4 py-3 text-sm text-white outline-none transition-colors"
                    placeholder="(48) 99999-9999"
                  />
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsDataModalOpen(false)}
                    className="flex-1 py-3 bg-neutral-900 border border-nav-border hover:bg-neutral-800 text-nav-text-light text-xs font-bold rounded-lg transition-colors cursor-pointer"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-3 bg-nav-gold text-black hover:bg-yellow-500 text-xs font-bold rounded-lg transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <Save className="w-4 h-4" />
                    Salvar
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 2. Modal: Preferências */}
      <AnimatePresence>
        {isPrefsModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsPrefsModalOpen(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="w-full max-w-md bg-[#0D0D0D] border border-nav-border rounded-xl p-6 relative z-10 shadow-2xl"
            >
              <div className="flex justify-between items-center mb-5 border-b border-nav-border pb-3">
                <h3 className="text-md font-bold text-nav-text-light font-display flex items-center gap-2">
                  <Settings className="w-5 h-5 text-nav-gold" />
                  Preferências
                </h3>
                <button 
                  onClick={() => setIsPrefsModalOpen(false)}
                  className="p-1 rounded-lg bg-nav-surface border border-nav-border text-nav-text-muted hover:text-white cursor-pointer transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleSavePrefs} className="space-y-5">
                <div>
                  <label className="text-xs font-semibold text-nav-text-muted font-display block mb-1.5 ml-0.5">
                    Barbeiro Favorito
                  </label>
                  <select
                    value={formFavBarber}
                    onChange={(e) => setFormFavBarber(e.target.value)}
                    className="w-full bg-[#161616] border border-nav-border focus:border-nav-gold/50 rounded-xl px-4 py-3 text-sm text-white outline-none transition-colors cursor-pointer"
                  >
                    <option value="" className="bg-[#0D0D0D]">Nenhum preferido</option>
                    {mockBarbers.map((b) => (
                      <option key={b.id} value={b.id} className="bg-[#0D0D0D]">
                        {b.name} ({b.role.split(' / ')[0]})
                      </option>
                    ))}
                  </select>
                  <p className="text-[10px] text-nav-text-muted mt-1.5 ml-0.5">
                    O profissional favorito selecionado ficará pré-selecionado ao agendar.
                  </p>
                </div>

                <div className="border-t border-nav-border/50 pt-4 flex items-center justify-between">
                  <div>
                    <span className="text-sm font-semibold text-nav-text-light block">Notificações Push</span>
                    <span className="text-[10px] text-nav-text-muted block max-w-[240px]">
                      Receber alertas sobre horários e novidades do clube VIP.
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setFormNotifications(!formNotifications)}
                    className={`w-12 h-6 rounded-full p-1 transition-all duration-300 ${
                      formNotifications ? 'bg-nav-gold' : 'bg-neutral-800'
                    }`}
                  >
                    <div
                      className={`w-4 h-4 rounded-full bg-black transition-transform duration-300 ${
                        formNotifications ? 'translate-x-6' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsPrefsModalOpen(false)}
                    className="flex-1 py-3 bg-neutral-900 border border-nav-border hover:bg-neutral-800 text-nav-text-light text-xs font-bold rounded-lg transition-colors cursor-pointer"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-3 bg-nav-gold text-black hover:bg-yellow-500 text-xs font-bold rounded-lg transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <Save className="w-4 h-4" />
                    Salvar
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 3. Modal: Segurança */}
      <AnimatePresence>
        {isSecurityModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSecurityModalOpen(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="w-full max-w-md bg-[#0D0D0D] border border-nav-border rounded-xl p-6 relative z-10 shadow-2xl"
            >
              <div className="flex justify-between items-center mb-5 border-b border-nav-border pb-3">
                <h3 className="text-md font-bold text-nav-text-light font-display flex items-center gap-2">
                  <Shield className="w-5 h-5 text-nav-gold" />
                  Segurança da Conta
                </h3>
                <button 
                  onClick={() => setIsSecurityModalOpen(false)}
                  className="p-1 rounded-lg bg-nav-surface border border-nav-border text-nav-text-muted hover:text-white cursor-pointer transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleSaveSecurity} className="space-y-4">
                <div>
                  <label className="text-xs font-semibold text-nav-text-muted font-display block mb-1.5 ml-0.5">
                    Senha Atual
                  </label>
                  <input
                    type="password"
                    value={formCurrentPassword}
                    onChange={(e) => setFormCurrentPassword(e.target.value)}
                    className="w-full bg-[#161616] border border-nav-border focus:border-nav-gold/50 rounded-xl px-4 py-3 text-sm text-white outline-none transition-colors"
                    placeholder="Sua senha atual"
                    required
                  />
                </div>

                <div className="border-t border-nav-border/30 pt-3">
                  <label className="text-xs font-semibold text-nav-text-muted font-display block mb-1.5 ml-0.5">
                    Nova Senha
                  </label>
                  <input
                    type="password"
                    value={formNewPassword}
                    onChange={(e) => setFormNewPassword(e.target.value)}
                    className="w-full bg-[#161616] border border-nav-border focus:border-nav-gold/50 rounded-xl px-4 py-3 text-sm text-white outline-none transition-colors"
                    placeholder="Mínimo 6 caracteres"
                    required
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-nav-text-muted font-display block mb-1.5 ml-0.5">
                    Confirmar Nova Senha
                  </label>
                  <input
                    type="password"
                    value={formConfirmPassword}
                    onChange={(e) => setFormConfirmPassword(e.target.value)}
                    className="w-full bg-[#161616] border border-nav-border focus:border-nav-gold/50 rounded-xl px-4 py-3 text-sm text-white outline-none transition-colors"
                    placeholder="Repita a nova senha"
                    required
                  />
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsSecurityModalOpen(false)}
                    className="flex-1 py-3 bg-neutral-900 border border-nav-border hover:bg-neutral-800 text-nav-text-light text-xs font-bold rounded-lg transition-colors cursor-pointer"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-3 bg-nav-gold text-black hover:bg-yellow-500 text-xs font-bold rounded-lg transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <Save className="w-4 h-4" />
                    Alterar Senha
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 4. Modal: Mudar Foto de Perfil */}
      <AnimatePresence>
        {isPhotoModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsPhotoModalOpen(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="w-full max-w-md bg-[#0D0D0D] border border-nav-border rounded-xl p-6 relative z-10 shadow-2xl"
            >
              <div className="flex justify-between items-center mb-5 border-b border-nav-border pb-3">
                <h3 className="text-md font-bold text-nav-text-light font-display flex items-center gap-2">
                  <Camera className="w-5 h-5 text-nav-gold" />
                  Mudar Foto de Perfil
                </h3>
                <button 
                  onClick={() => setIsPhotoModalOpen(false)}
                  className="p-1 rounded-lg bg-nav-surface border border-nav-border text-nav-text-muted hover:text-white cursor-pointer transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Grid of Preset Avatars */}
              <div className="mb-5">
                <span className="text-xs font-semibold text-nav-text-muted font-display block mb-3 ml-0.5">
                  Selecione um Avatar Premium:
                </span>
                <div className="grid grid-cols-3 gap-3">
                  {presetAvatars.map((preset, idx) => {
                    const isCurrent = userProfile.avatar === preset.url;
                    return (
                      <div
                        key={idx}
                        onClick={() => handleSelectPresetAvatar(preset.url)}
                        className={`relative rounded-xl overflow-hidden aspect-square border-2 cursor-pointer transition-all hover:scale-105 ${
                          isCurrent ? 'border-nav-gold scale-95 shadow-[0_0_10px_rgba(229,176,92,0.3)]' : 'border-nav-border'
                        }`}
                      >
                        <img
                          src={preset.url}
                          alt={preset.name}
                          className="w-full h-full object-cover select-none"
                        />
                        {isCurrent && (
                          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                            <div className="p-1 bg-nav-gold rounded-full text-black">
                              <Check className="w-3 h-3 stroke-[3]" />
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Local File Upload Option */}
              <div className="border-t border-nav-border/30 pt-4 mb-4">
                <span className="text-xs font-semibold text-nav-text-muted font-display block mb-3 ml-0.5">
                  Ou selecione do seu computador/celular:
                </span>
                <input
                  type="file"
                  id="local-avatar-input"
                  accept="image/*"
                  className="hidden"
                  onChange={handleLocalAvatarChange}
                />
                <button
                  type="button"
                  onClick={() => document.getElementById('local-avatar-input')?.click()}
                  className="w-full py-3 border border-nav-gold/30 bg-nav-gold/5 hover:bg-nav-gold/10 text-nav-gold font-bold font-display rounded-lg transition-all cursor-pointer flex items-center justify-center gap-2 active:scale-[0.98] text-xs"
                >
                  <Upload className="w-4 h-4" />
                  Enviar Foto do Dispositivo
                </button>
              </div>

              {/* Custom URL Input option */}
              <form onSubmit={handleSaveCustomAvatar} className="border-t border-nav-border/30 pt-4 space-y-4">
                <div>
                  <label className="text-xs font-semibold text-nav-text-muted font-display block mb-1.5 ml-0.5">
                    Ou insira a URL de uma Imagem
                  </label>
                  <input
                    type="url"
                    value={customAvatarUrl}
                    onChange={(e) => setCustomAvatarUrl(e.target.value)}
                    className="w-full bg-[#161616] border border-nav-border focus:border-nav-gold/50 rounded-xl px-4 py-3 text-sm text-white outline-none transition-colors"
                    placeholder="https://exemplo.com/suafoto.jpg"
                  />
                </div>

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setIsPhotoModalOpen(false)}
                    className="flex-1 py-3 bg-neutral-900 border border-nav-border hover:bg-neutral-800 text-nav-text-light text-xs font-bold rounded-lg transition-colors cursor-pointer"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-3 bg-nav-gold text-black hover:bg-yellow-500 text-xs font-bold rounded-lg transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <Save className="w-4 h-4" />
                    Aplicar URL
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
