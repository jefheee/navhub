'use client';

import React, { useEffect, useState, useMemo, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useScheduling } from '@/context/SchedulingContext';
import { BarberSelect } from '@/components/BarberSelect';
import { Check, CalendarDays, Clock, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';
import gsap from 'gsap';

export default function ProfessionalDataPage() {
  const {
    selectedUnit,
    selectedService,
    selectedBarber,
    setSelectedBarber,
    selectedDate,
    setSelectedDate,
    selectedTime,
    setSelectedTime,
    mockBarbers,
    createAppointment,
    appointments,
  } = useScheduling();

  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const activeAppointments = useMemo(() => {
    return [...appointments]
      .filter(appt => appt.status === 'scheduled')
      .sort((a, b) => {
        const dateTimeA = new Date(`${a.date}T${a.time}`);
        const dateTimeB = new Date(`${b.date}T${b.time}`);
        return dateTimeA.getTime() - dateTimeB.getTime();
      });
  }, [appointments]);

  // Calendar dragging state for desktop mouse drag
  const calendarRef = useRef<HTMLDivElement>(null);
  const [isCalDragging, setIsCalDragging] = useState(false);
  const [calStartX, setCalStartX] = useState(0);
  const [calScrollLeft, setCalScrollLeft] = useState(0);
  const calDragDistance = useRef(0);

  const handleCalMouseDown = (e: React.MouseEvent) => {
    if (!calendarRef.current) return;
    setIsCalDragging(true);
    setCalStartX(e.pageX - calendarRef.current.offsetLeft);
    setCalScrollLeft(calendarRef.current.scrollLeft);
    calDragDistance.current = 0;
  };

  const handleCalMouseLeave = () => {
    setIsCalDragging(false);
  };

  const handleCalMouseUp = () => {
    setIsCalDragging(false);
  };

  const handleCalMouseMove = (e: React.MouseEvent) => {
    if (!isCalDragging || !calendarRef.current) return;
    e.preventDefault();
    const x = e.pageX - calendarRef.current.offsetLeft;
    const walk = (x - calStartX) * 1.5;
    calendarRef.current.scrollLeft = calScrollLeft - walk;
    calDragDistance.current += Math.abs(e.movementX);
  };

  const handleDayClick = (dateString: string) => {
    if (calDragDistance.current > 10) return;
    setSelectedDate(dateString);
  };

  const scrollCalendar = (direction: 'left' | 'right') => {
    if (!calendarRef.current) return;
    const scrollAmount = 240;
    calendarRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

  // Redirect if previous steps are missing
  useEffect(() => {
    if (!selectedUnit) {
      router.replace('/agendamento/unidade');
    } else if (!selectedService) {
      router.replace('/agendamento/servico');
    }
  }, [selectedUnit, selectedService, router]);

  // Generate available days (excluding Sundays) starting from May 21, 2026
  const availableDays = useMemo(() => {
    const days = [];
    const weekdays = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
    
    // Current date in system metadata is 2026-05-20
    const start = new Date(2026, 4, 21); // May 21, 2026
    
    for (let i = 0; i < 14; i++) {
      const current = new Date(start);
      current.setDate(start.getDate() + i);
      
      // Skip Sundays (0)
      if (current.getDay() === 0) continue;
      
      const year = current.getFullYear();
      const month = String(current.getMonth() + 1).padStart(2, '0');
      const dayVal = String(current.getDate()).padStart(2, '0');
      const dateString = `${year}-${month}-${dayVal}`;
      
      days.push({
        dateString,
        dayName: weekdays[current.getDay()],
        dayNum: current.getDate(),
        monthName: current.toLocaleDateString('pt-BR', { month: 'short' }).replace('.', ''),
      });
    }
    return days;
  }, []);

  // Available slots for mock scheduling
  const timeSlots = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '13:00', '13:30', '14:00', '14:30', '15:00', '15:30',
    '16:00', '16:30', '17:00', '17:30', '18:00', '18:30',
    '19:00', '19:30'
  ];

  // GSAP reveal animations for content sections
  useEffect(() => {
    if (!selectedUnit || !selectedService) return;
    
    const ctx = gsap.context(() => {
      gsap.from('.section-reveal', {
        opacity: 0,
        y: 15,
        stagger: 0.15,
        duration: 0.45,
        ease: 'power2.out',
      });
    });
    return () => ctx.revert();
  }, [selectedUnit, selectedService]);

  const handleConfirm = () => {
    if (!selectedUnit || !selectedService || !selectedBarber || !selectedDate || !selectedTime) return;
    setIsSubmitting(true);
    
    // Simulate minor network delay for premium feel
    setTimeout(() => {
      const appt = createAppointment();
      setIsSubmitting(false);
      if (appt) {
        router.push(`/agendamento/confirmacao?id=${appt.id}`);
      }
    }, 800);
  };

  const isFormValid = selectedBarber && selectedDate && selectedTime;

  if (!selectedUnit || !selectedService) return null;

  return (
    <div className="py-2 pb-36 flex flex-col gap-6">
      
      {/* Active Appointments Banner */}
      {activeAppointments.length > 0 && (
        <div className="bg-nav-gold/10 border border-nav-gold/30 rounded-xl p-4 flex flex-col gap-3 section-reveal">
          <div className="flex items-center gap-2 text-nav-gold">
            <CalendarDays className="w-4.5 h-4.5" />
            <span className="text-xs font-bold uppercase tracking-wider font-display">
              Seus Agendamentos Ativos
            </span>
          </div>
          <div className="space-y-2">
            {activeAppointments.map((appt) => (
              <div key={appt.id} className="flex flex-col sm:flex-row justify-between sm:items-center text-xs text-nav-text-light border-b border-nav-border/30 pb-2 last:border-0 last:pb-0 gap-1">
                <div>
                  <span className="font-semibold text-nav-gold">{appt.service.name}</span> em <span className="font-medium text-white">{appt.unit.name}</span>
                </div>
                <div className="text-nav-text-muted">
                  <span className="capitalize">{appt.date.split('-')[2]}/{appt.date.split('-')[1]}</span> às <span className="text-nav-gold font-semibold">{appt.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Responsive Columns on Desktop */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        
        {/* Left Column: Barbers & Date */}
        <div className="flex flex-col gap-6">
          {/* Barber Carousel Section */}
          <section className="section-reveal">
            <h3 className="text-xs uppercase tracking-widest text-nav-text-muted font-bold font-display mb-3">
              1. Escolha o Profissional
            </h3>
            <BarberSelect
              barbers={mockBarbers}
              selectedBarber={selectedBarber}
              onSelect={setSelectedBarber}
            />
          </section>

          {/* Calendar Flat Section */}
          <section className="section-reveal">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-xs uppercase tracking-widest text-nav-text-muted font-bold font-display">
                2. Escolha o Dia
              </h3>
              {selectedDate && (
                <span className="text-[10px] text-nav-gold bg-nav-gold/10 px-2 py-0.5 rounded font-bold font-display border border-nav-gold/20">
                  {selectedDate.split('-')[2]}/{selectedDate.split('-')[1]}
                </span>
              )}
            </div>

            <div className="relative group/cal-carousel w-full">
              {/* Left Arrow for Desktop */}
              <button
                type="button"
                onClick={() => scrollCalendar('left')}
                className="absolute -left-2 top-1/2 -translate-y-1/2 z-10 hidden md:flex items-center justify-center w-8 h-8 rounded-full bg-[#161616]/90 border border-nav-border text-nav-gold hover:bg-neutral-800 hover:text-white transition-all cursor-pointer shadow-[0_0_8px_rgba(0,0,0,0.5)] active:scale-95"
                title="Anterior"
              >
                <ChevronLeft className="w-4 h-4 stroke-[2.5]" />
              </button>

              <div
                ref={calendarRef}
                onMouseDown={handleCalMouseDown}
                onMouseLeave={handleCalMouseLeave}
                onMouseUp={handleCalMouseUp}
                onMouseMove={handleCalMouseMove}
                className={`flex gap-2.5 overflow-x-auto pb-2 px-4 snap-x no-scrollbar ${
                  isCalDragging ? 'cursor-grabbing select-none' : 'cursor-grab'
                }`}
              >
                {availableDays.map((day) => {
                  const isSelected = selectedDate === day.dateString;
                  return (
                    <button
                      key={day.dateString}
                      onClick={() => handleDayClick(day.dateString)}
                      className={`flex-none w-14 snap-center border rounded-lg py-3 flex flex-col items-center justify-center transition-all duration-200 ${
                        isSelected
                          ? 'border-nav-gold bg-nav-gold/10 text-nav-gold font-bold shadow-[0_0_8px_rgba(229,176,92,0.1)]'
                          : 'border-nav-border bg-nav-card text-nav-text-light hover:border-neutral-700'
                      }`}
                    >
                      <span className="text-[9px] uppercase tracking-wide text-nav-text-muted font-medium mb-1 font-display">
                        {day.dayName}
                      </span>
                      <span className="text-md font-extrabold font-display leading-tight">
                        {day.dayNum}
                      </span>
                      <span className="text-[8px] uppercase tracking-wider text-nav-text-muted font-semibold mt-1 font-display">
                        {day.monthName}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Right Arrow for Desktop */}
              <button
                type="button"
                onClick={() => scrollCalendar('right')}
                className="absolute -right-2 top-1/2 -translate-y-1/2 z-10 hidden md:flex items-center justify-center w-8 h-8 rounded-full bg-[#161616]/90 border border-nav-border text-nav-gold hover:bg-neutral-800 hover:text-white transition-all cursor-pointer shadow-[0_0_8px_rgba(0,0,0,0.5)] active:scale-95"
                title="Próximo"
              >
                <ChevronRight className="w-4 h-4 stroke-[2.5]" />
              </button>
            </div>
          </section>
        </div>

        {/* Right Column: Time Selection */}
        <div className="flex flex-col gap-6">
          {/* Time Selection Grid */}
          <section className="section-reveal">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-xs uppercase tracking-widest text-nav-text-muted font-bold font-display">
                3. Escolha o Horário
              </h3>
              {selectedTime && (
                <span className="text-[10px] text-nav-gold bg-nav-gold/10 px-2 py-0.5 rounded font-bold font-display border border-nav-gold/20">
                  {selectedTime}
                </span>
              )}
            </div>

            <div className="grid grid-cols-4 gap-2">
              {timeSlots.map((time) => {
                const isSelected = selectedTime === time;
                const hasConflict = appointments.some(
                  appt => appt.status === 'scheduled' && appt.date === selectedDate && appt.time === time
                );

                return (
                  <button
                    key={time}
                    disabled={hasConflict}
                    onClick={() => !hasConflict && setSelectedTime(time)}
                    className={`py-2 text-xs font-semibold rounded font-display transition-all border ${
                      hasConflict
                        ? 'bg-[#151515] border-nav-border text-neutral-600 cursor-not-allowed opacity-30 line-through'
                        : isSelected
                          ? 'bg-nav-gold border-nav-gold text-black font-bold shadow-[0_0_8px_rgba(229,176,92,0.15)]'
                          : 'bg-nav-card border-nav-border text-nav-text-light hover:border-neutral-700 hover:bg-[#151515] cursor-pointer'
                    }`}
                  >
                    {time}
                  </button>
                );
              })}
            </div>
          </section>
        </div>

      </div>

      {/* Floating Call to Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 md:left-1/2 md:-translate-x-1/2 md:max-w-6xl w-full p-4 bg-[#0D0D0D]/95 backdrop-blur-md border-t border-[#1A1A1A] z-[99] pwa-bottom shadow-[0_-5px_15px_rgba(0,0,0,0.5)]">
        <button
          disabled={!isFormValid || isSubmitting}
          onClick={handleConfirm}
          className={`w-full py-3.5 flex items-center justify-center gap-2 font-bold font-display rounded-md transition-all cursor-pointer ${
            isFormValid && !isSubmitting
              ? 'bg-nav-gold text-black hover:bg-yellow-500 shadow-lg shadow-nav-gold/20 active:scale-[0.98]'
              : 'bg-neutral-800 text-neutral-500 border border-neutral-700 cursor-not-allowed'
          }`}
        >
          {isSubmitting ? (
            <div className="flex items-center gap-2">
              <span className="w-4 h-4 rounded-full border-2 border-black border-t-transparent animate-spin" />
              <span>Confirmando...</span>
            </div>
          ) : (
            <>
              <Check className="w-5 h-5 stroke-[3]" />
              <span>Confirmar Agendamento</span>
            </>
          )}
        </button>
      </div>

    </div>
  );
}
