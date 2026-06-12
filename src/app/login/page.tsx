'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useScheduling } from '@/context/SchedulingContext';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './login.module.css';

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
    <div className={styles.loginPage}>
      {/* Orange-to-Yellow Gradient Header */}
      <div className={styles.gradientHeader}>
        {/* Scissor Logo */}
        <div className="flex justify-start mb-4">
          <Image 
            src="/assets/icone-navhub-escuro-login.png" 
            alt="NavHub Logo" 
            width={123} 
            height={37} 
            className="object-contain"
          />
        </div>

        <h2 className="text-[28px] font-extrabold font-display tracking-tight text-[#1A1C1E] mt-4 mb-1">
          Seja Bem Vindo!
        </h2>
        <p className="text-[14px] font-medium text-[rgba(68,51,18,0.8)] font-inter text-left max-w-[280px]">
          Faça login para continuar seu agendamento.
        </p>
      </div>

      {/* Main Card Content */}
      <div className={styles.mainCard}>
        {/* Tab Selector */}
        <div className={styles.tabsContainer}>
          <button
            type="button"
            onClick={() => { setActiveTab('entrar'); setError(''); }}
            className={`${styles.tabBtn} ${activeTab === 'entrar' ? styles.active : ''}`}
          >
            Entrar
          </button>
          <button
            type="button"
            onClick={() => { setActiveTab('criar'); setError(''); }}
            className={`${styles.tabBtn} ${activeTab === 'criar' ? styles.active : ''}`}
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
        <form onSubmit={handleSubmit} className="flex-1 flex flex-col">
          <AnimatePresence mode="wait">
            {activeTab === 'criar' && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="flex flex-col gap-4 mb-4 overflow-hidden"
              >
                <div>
                  <label className={styles.inputLabel}>Nome Completo</label>
                  <div className={styles.inputField}>
                    <input
                      type="text"
                      placeholder="Daniel Quirino"
                      value={nome}
                      onChange={(e) => setNome(e.target.value)}
                      className="bg-transparent border-none text-white outline-none w-full text-sm"
                    />
                  </div>
                </div>
                <div>
                  <label className={styles.inputLabel}>Telefone</label>
                  <div className={styles.inputField}>
                    <input
                      type="tel"
                      placeholder="(48) 99999-9999"
                      value={telefone}
                      onChange={(e) => setTelefone(e.target.value)}
                      className="bg-transparent border-none text-white outline-none w-full text-sm"
                    />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex flex-col gap-4 mb-4">
            <div>
              <label className={styles.inputLabel}>Email</label>
              <div className={styles.inputField}>
                <Image src="/assets/icone-email-escuro-login.png" alt="Email" width={16} height={12} className="opacity-50" />
                <input
                  type="email"
                  placeholder="email123@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-transparent border-none text-white outline-none w-full text-sm placeholder-white/50"
                  required
                />
              </div>
            </div>

            <div>
              <label className={styles.inputLabel}>Senha</label>
              <div className={styles.inputField}>
                <Image src="/assets/icone-cadeado-escuro-senha-login.png" alt="Senha" width={12} height={16} className="opacity-50" />
                <input
                  type="password"
                  placeholder="******"
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  className="bg-transparent border-none text-white outline-none w-full text-sm placeholder-white/50 tracking-widest"
                  required
                />
              </div>
            </div>
          </div>

          {activeTab === 'entrar' && (
            <div className="flex justify-end mb-6">
              <button type="button" className="text-xs font-semibold text-[#EEB74F] hover:text-[#FFA44A] transition-colors">
                Esqueceu sua Senha?
              </button>
            </div>
          )}

          <div className="mt-auto pt-6 flex flex-col gap-4">
            <button
              type="submit"
              disabled={isLoading}
              className={styles.primaryBtn}
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-[#443312] border-t-transparent rounded-full animate-spin" />
              ) : activeTab === 'entrar' ? (
                'Entrar'
              ) : (
                'Criar Conta'
              )}
            </button>

            <button type="button" className={styles.googleBtn}>
              <svg width="24" height="24" viewBox="0 0 24 24">
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
          </div>
        </form>
      </div>
    </div>
  );
}
