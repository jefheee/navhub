'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

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
    image: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?q=80&w=400&auto=format&fit=crop',
    rating: '4.9',
  },
  {
    id: 'unit-2',
    name: 'Nav Jardim Eldorado',
    address: 'R. Eldorado, 45 - Palhoça',
    image: 'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?q=80&w=400&auto=format&fit=crop',
    rating: '4.8',
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
    name: 'Jefhe Santos',
    role: 'Barbeiro Sênior / Specialist',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300&auto=format&fit=crop',
    rating: '5.0',
  },
  {
    id: 'barber-2',
    name: 'Maicon',
    role: 'Especialista em Degradê',
    image: 'https://images.unsplash.com/photo-1620122303020-43ec4b6cf7f8?q=80&w=300&auto=format&fit=crop',
    rating: '4.9',
  },
  {
    id: 'barber-3',
    name: 'Felipe Melo',
    role: 'Visagista / Beard Designer',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=300&auto=format&fit=crop',
    rating: '4.9',
  },
];

const SchedulingContext = createContext<SchedulingContextType | undefined>(undefined);

export function SchedulingProvider({ children }: { children: React.ReactNode }) {
  const [selectedUnit, setSelectedUnit] = useState<Unit | null>(null);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedBarber, setSelectedBarber] = useState<Barber | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  // Load appointments from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('navhub_appointments');
    if (saved) {
      try {
        setAppointments(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to load appointments', e);
      }
    }
  }, []);

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
    const updated = appointments.map((appt) =>
      appt.id === id ? { ...appt, status: 'cancelled' as const } : appt
    );
    // Alternatively, remove it from list or keep it as cancelled
    // Keeping it as cancelled allows us to show cancelled state or clear it. Let's filter out for simplicity
    const filtered = appointments.filter(appt => appt.id !== id);
    setAppointments(filtered);
    localStorage.setItem('navhub_appointments', JSON.stringify(filtered));
  };

  return (
    <SchedulingContext.Provider
      value={{
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
