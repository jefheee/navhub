'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useScheduling } from '@/context/SchedulingContext';
import { Mail, Lock, User, Phone, Scissors } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function LoginPage() {
  const router = useRouter();
  const { loginUser, signupUser, isAuthenticated, selectedUnit } = useScheduling();
  
  const [activeTab, setActiveTab] = useState<'entrar' | 'criar'>('entrar');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // If already authenticated, redirect
  useEffect(() => {
    if (isAuthenticated) {
      const redirectPath = selectedUnit ? '/agendamento/servico' : '/';
      router.replace(redirectPath);
    }
  }, [isAuthenticated, selectedUnit, router]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!email || !senha) {
      setError('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    setIsLoading(true);

    // Simulate network delay for premium feel
    setTimeout(() => {
      if (activeTab === 'entrar') {
        const success = loginUser(email, email.split('@')[0]);
        if (success) {
          const redirectPath = selectedUnit ? '/agendamento/servico' : '/';
          router.push(redirectPath);
        } else {
          setError('Credenciais inválidas.');
          setIsLoading(false);
        }
      } else {
        if (!nome || !telefone) {
          setError('Por favor, preencha o Nome e o Telefone.');
          setIsLoading(false);
          return;
        }
        const success = signupUser(email, nome, telefone);
        if (success) {
          const redirectPath = selectedUnit ? '/agendamento/servico' : '/';
          router.push(redirectPath);
        } else {
          setError('Erro ao criar conta.');
          setIsLoading(false);
        }
      }
    }, 1000);
  };

  const handleGoogleLogin = () => {
    setIsLoading(true);
    setTimeout(() => {
      loginUser('daniel.google@gmail.com', 'Daniel Quirino');
      const redirectPath = selectedUnit ? '/agendamento/servico' : '/';
      router.push(redirectPath);
    }, 1200);
  };

  return (
    <div className="w-full max-w-md mx-auto bg-[#0D0D0D] border border-nav-border rounded-2xl overflow-hidden shadow-2xl my-4 flex flex-col min-h-[680px]">
      {/* Orange-to-Yellow Gradient Header */}
      <div className="bg-gradient-to-b from-[#F48B29] to-[#E5B05C] p-8 text-black relative flex flex-col items-center text-center">
        {/* Scissor Logo */}
        <div className="flex items-center gap-1.5 text-black mb-3">
          <div className="p-2 rounded bg-black/10 border border-black/10">
            <Scissors className="w-6 h-6 stroke-[2.5]" />
          </div>
          <span className="font-display font-black text-2xl uppercase tracking-tighter">
            Nav<span className="text-white">Hub</span>
          </span>
        </div>

        <h2 className="text-2xl font-extrabold font-display tracking-tight text-[#0D0D0D] mb-1">
          Seja Bem Vindo!
        </h2>
        <p className="text-xs font-semibold text-[#0D0D0D]/70 max-w-[220px]">
          Faça login para continuar seu agendamento.
        </p>
        
        {/* Curved bottom effect */}
        <div className="absolute bottom-0 left-0 right-0 h-4 bg-[#0D0D0D] rounded-t-2xl" />
      </div>

      {/* Main Card Content */}
      <div className="flex-1 px-6 pb-8 pt-2 flex flex-col bg-[#0D0D0D]">
        {/* Tab Selector */}
        <div className="bg-[#161616] p-1 rounded-xl flex gap-1 mb-6 border border-nav-border">
          <button
            type="button"
            onClick={() => {
              setActiveTab('entrar');
              setError('');
            }}
            className={`flex-1 py-3 text-xs font-bold font-display rounded-lg transition-all cursor-pointer ${
              activeTab === 'entrar'
                ? 'bg-[#2A2A2A] text-white shadow-md'
                : 'text-nav-text-muted hover:text-nav-text-light'
            }`}
          >
            Entrar
          </button>
          <button
            type="button"
            onClick={() => {
              setActiveTab('criar');
              setError('');
            }}
            className={`flex-1 py-3 text-xs font-bold font-display rounded-lg transition-all cursor-pointer ${
              activeTab === 'criar'
                ? 'bg-[#2A2A2A] text-white shadow-md'
                : 'text-nav-text-muted hover:text-nav-text-light'
            }`}
          >
            Criar Conta
          </button>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-xs p-3 rounded-lg mb-4 text-center">
            {error}
          </div>
        )}

        {/* Login / Register Form */}
        <form onSubmit={handleSubmit} className="flex-1 flex flex-col gap-4">
          <AnimatePresence mode="wait">
            {activeTab === 'criar' && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="space-y-4 overflow-hidden"
                key="register-fields"
              >
                <div>
                  <label className="text-xs font-semibold text-nav-text-light font-display block mb-1.5 ml-0.5">
                    Nome Completo
                  </label>
                  <div className="relative flex items-center bg-[#161616] rounded-xl border border-nav-border focus-within:border-nav-gold/50 transition-colors">
                    <User className="w-4 h-4 text-nav-text-muted absolute left-4 shrink-0" />
                    <input
                      type="text"
                      placeholder="Seu nome"
                      value={nome}
                      onChange={(e) => setNome(e.target.value)}
                      className="w-full bg-transparent pl-11 pr-4 py-3.5 text-sm text-white placeholder-nav-text-muted/50 border-0 outline-none focus:ring-0"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-nav-text-light font-display block mb-1.5 ml-0.5">
                    Telefone
                  </label>
                  <div className="relative flex items-center bg-[#161616] rounded-xl border border-nav-border focus-within:border-nav-gold/50 transition-colors">
                    <Phone className="w-4 h-4 text-nav-text-muted absolute left-4 shrink-0" />
                    <input
                      type="tel"
                      placeholder="(48) 99999-9999"
                      value={telefone}
                      onChange={(e) => setTelefone(e.target.value)}
                      className="w-full bg-transparent pl-11 pr-4 py-3.5 text-sm text-white placeholder-nav-text-muted/50 border-0 outline-none focus:ring-0"
                    />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div>
            <label className="text-xs font-semibold text-nav-text-light font-display block mb-1.5 ml-0.5">
              Email
            </label>
            <div className="relative flex items-center bg-[#161616] rounded-xl border border-nav-border focus-within:border-nav-gold/50 transition-colors">
              <Mail className="w-4 h-4 text-nav-text-muted absolute left-4 shrink-0" />
              <input
                type="email"
                placeholder="email123@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-transparent pl-11 pr-4 py-3.5 text-sm text-white placeholder-nav-text-muted/50 border-0 outline-none focus:ring-0"
                required
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="text-xs font-semibold text-nav-text-light font-display block ml-0.5">
                Senha
              </label>
              {activeTab === 'entrar' && (
                <button
                  type="button"
                  className="text-xs text-nav-gold hover:underline font-semibold font-display"
                  onClick={() => alert('Link de redefinição enviado para seu e-mail!')}
                >
                  Esqueceu sua Senha?
                </button>
              )}
            </div>
            <div className="relative flex items-center bg-[#161616] rounded-xl border border-nav-border focus-within:border-nav-gold/50 transition-colors">
              <Lock className="w-4 h-4 text-nav-text-muted absolute left-4 shrink-0" />
              <input
                type="password"
                placeholder="******"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                className="w-full bg-transparent pl-11 pr-4 py-3.5 text-sm text-white placeholder-nav-text-muted/50 border-0 outline-none focus:ring-0"
                required
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full mt-2 py-3.5 bg-nav-gold text-black font-extrabold font-display rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2 hover:bg-yellow-500 active:scale-[0.98] ${
              isLoading ? 'opacity-85 cursor-not-allowed' : ''
            }`}
          >
            {isLoading ? (
              <span className="w-5 h-5 rounded-full border-2 border-black border-t-transparent animate-spin" />
            ) : activeTab === 'entrar' ? (
              'Entrar'
            ) : (
              'Criar Conta'
            )}
          </button>

          {/* Divider */}
          <div className="flex items-center gap-3 my-3">
            <span className="h-[1px] flex-1 bg-nav-border" />
            <span className="text-[10px] uppercase tracking-wider text-nav-text-muted font-bold">Ou</span>
            <span className="h-[1px] flex-1 bg-nav-border" />
          </div>

          {/* Google Button */}
          <button
            type="button"
            onClick={handleGoogleLogin}
            disabled={isLoading}
            className="w-full py-3.5 bg-white text-black font-bold font-display rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2 hover:bg-neutral-100 active:scale-[0.98]"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            <span>Continuar com o Google</span>
          </button>
        </form>
      </div>
    </div>
  );
}
