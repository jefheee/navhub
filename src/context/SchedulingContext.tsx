/* eslint-disable */
'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export interface UserProfile {
  name: string;
  email: string;
  phone: string;
  avatar: string;
  favoriteBarberId: string;
  allowNotifications: boolean;
  vipStatus: 'none' | 'basic' | 'premium';
}

export interface Unit {
  id: string;
  name: string;
  address: string;
  image: string;
  rating: string;
}

export interface Service {
  id: string;
  name: string;
  price: number;
  duration: string;
  description: string;
}

export interface Barber {
  id: string;
  name: string;
  role: string;
  image: string;
  rating: string;
}

export interface Appointment {
  id: string;
  unit: Unit;
  service: Service;
  barber: Barber;
  date: string; // YYYY-MM-DD
  time: string;
  createdAt: string;
  status: 'scheduled' | 'cancelled';
}

interface SchedulingContextType {
  // Authentication & Profile
  userProfile: UserProfile;
  setUserProfile: (profile: UserProfile) => void;
  isAuthenticated: boolean;
  loginUser: (email: string, name?: string) => boolean;
  signupUser: (email: string, name: string, phone: string) => boolean;
  logoutUser: () => void;

  // Current selections
  selectedUnit: Unit | null;
  setSelectedUnit: (unit: Unit | null) => void;
  selectedService: Service | null;
  setSelectedService: (service: Service | null) => void;
  selectedBarber: Barber | null;
  setSelectedBarber: (barber: Barber | null) => void;
  selectedDate: string | null;
  setSelectedDate: (date: string | null) => void;
  selectedTime: string | null;
  setSelectedTime: (time: string | null) => void;

  // Bookings list
  appointments: Appointment[];
  createAppointment: () => Appointment | null;
  cancelAppointment: (id: string) => void;
  clearSelections: () => void;

  // Helpers
  mockUnits: Unit[];
  mockServices: Service[];
  mockBarbers: Barber[];
}

const mockUnits: Unit[] = [
  {
    id: 'unit-1',
    name: 'Nav Pagani',
    address: 'Av. Atílio Pagani, 270 - Palhoça',
    image: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=800&q=80',
    rating: '4.9',
  },
  {
    id: 'unit-2',
    name: 'Nav Jardim Eldorado',
    address: 'R. Eldorado, 45 - Palhoça',
    image: 'https://images.unsplash.com/photo-1517832606299-7ae9b720a186?auto=format&fit=crop&w=800&q=80',
    rating: '4.8',
  },
  {
    id: 'unit-3',
    name: 'Nav Pedra Branca',
    address: 'Av. Paulo Roberto Vidal, 123 - Pedra Branca',
    image: 'https://images.unsplash.com/photo-1605497746445-97d1b0a9eaf4?auto=format&fit=crop&w=800&q=80',
    rating: '4.9',
  },
  {
    id: 'unit-4',
    name: 'Nav Bela Vista',
    address: 'Rua José Cosme Pamplona, 1447 - Bela Vista',
    image: 'https://images.unsplash.com/photo-1622398476015-55865559c45b?auto=format&fit=crop&w=800&q=80',
    rating: '4.7',
  },
];

const mockServices: Service[] = [
  {
    id: 'srv-1',
    name: 'Corte Degradê',
    price: 60,
    duration: '30 min',
    description: 'Estilo moderno com transição suave nas laterais, lavagem inclusa e finalização premium.',
  },
  {
    id: 'srv-2',
    name: 'Corte Clássico',
    price: 50,
    duration: '30 min',
    description: 'Corte tradicional na tesoura ou máquina, lavagem inclusa e finalização com pomada modeladora.',
  },
  {
    id: 'srv-3',
    name: 'Barba Premium',
    price: 45,
    duration: '40 min',
    description: 'Tratamento completo com toalha quente, óleo hidratante, massagem facial e navalha afiada.',
  },
  {
    id: 'srv-4',
    name: 'Combo Nav (Corte + Barba)',
    price: 95,
    duration: '60 min',
    description: 'O serviço supremo da casa. Corte clássico ou degradê e tratamento de barba premium.',
  },
];

const mockBarbers: Barber[] = [
  {
    id: 'barber-1',
    name: 'Marcos Silva',
    role: 'Barbeiro Master / Visagista',
    image: 'https://images.unsplash.com/photo-1618077360395-f3068be8e001?auto=format&fit=crop&w=400&q=80',
    rating: '4.9',
  },
  {
    id: 'barber-2',
    name: 'Rafael Costa',
    role: 'Especialista em Degradê',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80',
    rating: '4.8',
  },
  {
    id: 'barber-3',
    name: 'Thiago Oliveira',
    role: 'Barbeiro Sênior / Specialist',
    image: 'https://images.unsplash.com/photo-1520699049698-acd2fce18738?auto=format&fit=crop&w=400&q=80',
    rating: '5.0',
  },
  {
    id: 'barber-4',
    name: 'Lucas Santos',
    role: 'Especialista em Barba / Beard Stylist',
    image: 'https://images.unsplash.com/photo-1621644793614-2795a25f187a?auto=format&fit=crop&w=400&q=80',
    rating: '4.9',
  },
  {
    id: 'barber-5',
    name: 'Felipe Almeida',
    role: 'Cortes Clássicos & Modernos',
    image: 'https://images.unsplash.com/photo-1583712704256-4dc01642139b?auto=format&fit=crop&w=400&q=80',
    rating: '4.9',
  },
];

const defaultProfile: UserProfile = {
  name: 'Daniel',
  email: 'daniel@navhub.com.br',
  phone: '(48) 99999-9999',
  avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200&auto=format&fit=crop',
  favoriteBarberId: 'barber-1',
  allowNotifications: true,
  vipStatus: 'premium',
};

const SchedulingContext = createContext<SchedulingContextType | undefined>(undefined);

export function SchedulingProvider({ children }: { children: React.ReactNode }) {
  // Authentication & Profile States
  const [userProfile, setUserProfileState] = useState<UserProfile>(defaultProfile);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  // Selections
  const [selectedUnit, setSelectedUnit] = useState<Unit | null>(null);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedBarber, setSelectedBarber] = useState<Barber | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  // Load from localStorage on mount
  useEffect(() => {
    // 1. Load Profile
    const savedProfile = localStorage.getItem('navhub_user_profile');
    if (savedProfile) {
      try {
        setUserProfileState(JSON.parse(savedProfile));
      } catch (e) {
        console.error('Failed to parse user profile', e);
      }
    }

    // 2. Load Auth State (default to true for preview, but let's check localStorage first)
    const savedAuth = localStorage.getItem('navhub_is_authenticated');
    if (savedAuth !== null) {
      setIsAuthenticated(savedAuth === 'true');
    } else {
      // Default to false so the user can experience the login page first!
      setIsAuthenticated(false);
    }

    // 3. Load Appointments
    const savedAppts = localStorage.getItem('navhub_appointments');
    if (savedAppts) {
      try {
        setAppointments(JSON.parse(savedAppts));
      } catch (e) {
        console.error('Failed to load appointments', e);
      }
    }
  }, []);

  const setUserProfile = (profile: UserProfile) => {
    setUserProfileState(profile);
    localStorage.setItem('navhub_user_profile', JSON.stringify(profile));
  };

  const loginUser = (email: string, name?: string) => {
    // Simulate login
    setIsAuthenticated(true);
    localStorage.setItem('navhub_is_authenticated', 'true');
    
    // Update profile if name is provided (e.g. from login form)
    const updated = {
      ...userProfile,
      email,
      name: name || userProfile.name,
    };
    setUserProfile(updated);
    return true;
  };

  const signupUser = (email: string, name: string, phone: string) => {
    // Simulate register
    setIsAuthenticated(true);
    localStorage.setItem('navhub_is_authenticated', 'true');
    
    const updated: UserProfile = {
      ...userProfile,
      name,
      email,
      phone,
      vipStatus: 'none', // starts as regular user
    };
    setUserProfile(updated);
    return true;
  };

  const logoutUser = () => {
    setIsAuthenticated(false);
    localStorage.setItem('navhub_is_authenticated', 'false');
    clearSelections();
  };

  const clearSelections = () => {
    setSelectedUnit(null);
    setSelectedService(null);
    setSelectedBarber(null);
    setSelectedDate(null);
    setSelectedTime(null);
  };

  const createAppointment = () => {
    if (!selectedUnit || !selectedService || !selectedBarber || !selectedDate || !selectedTime) {
      return null;
    }

    // Check for conflict (same date and time)
    const hasConflict = appointments.some(
      appt => appt.status === 'scheduled' && appt.date === selectedDate && appt.time === selectedTime
    );
    if (hasConflict) {
      return null;
    }

    const newAppt: Appointment = {
      id: `appt-${Date.now()}`,
      unit: selectedUnit,
      service: selectedService,
      barber: selectedBarber,
      date: selectedDate,
      time: selectedTime,
      createdAt: new Date().toISOString(),
      status: 'scheduled',
    };

    const updated = [newAppt, ...appointments];
    setAppointments(updated);
    localStorage.setItem('navhub_appointments', JSON.stringify(updated));
    return newAppt;
  };

  const cancelAppointment = (id: string) => {
    const filtered = appointments.filter(appt => appt.id !== id);
    setAppointments(filtered);
    localStorage.setItem('navhub_appointments', JSON.stringify(filtered));
  };

  return (
    <SchedulingContext.Provider
      value={{
        userProfile,
        setUserProfile,
        isAuthenticated,
        loginUser,
        signupUser,
        logoutUser,
        selectedUnit,
        setSelectedUnit,
        selectedService,
        setSelectedService,
        selectedBarber,
        setSelectedBarber,
        selectedDate,
        setSelectedDate,
        selectedTime,
        setSelectedTime,
        appointments,
        createAppointment,
        cancelAppointment,
        clearSelections,
        mockUnits,
        mockServices,
        mockBarbers,
      }}
    >
      {children}
    </SchedulingContext.Provider>
  );
}

export function useScheduling() {
  const context = useContext(SchedulingContext);
  if (!context) {
    throw new Error('useScheduling must be used within a SchedulingProvider');
  }
  return context;
}
