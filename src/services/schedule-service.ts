import { timeSlots, appointments } from '../data/mock';
import { TimeSlot } from '../types/app';

export function getAvailableTimeSlots(date: string, barberId: string): TimeSlot[] {
  const bookedTimes = appointments
    .filter(apt => apt.date === date && apt.barber.id === barberId && apt.status !== 'cancelado')
    .map(apt => apt.time);

  return timeSlots.map(time => ({
    time,
    available: !bookedTimes.includes(time),
  }));
}

export function getNextDays(count: number): { date: string; label: string; dayOfWeek: string }[] {
  const days = [];
  const today = new Date();
  
  const weekDays = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
  const months = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];

  for (let i = 0; i < count; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    
    const dayNum = date.getDate();
    const month = months[date.getMonth()];
    const dayOfWeek = weekDays[date.getDay()];
    
    days.push({
      date: date.toISOString().split('T')[0],
      label: `${dayNum} ${month}`,
      dayOfWeek,
    });
  }

  return days;
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString + 'T12:00:00');
  const options: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  };
  return date.toLocaleDateString('pt-BR', options);
}

export function formatShortDate(dateString: string): string {
  const date = new Date(dateString + 'T12:00:00');
  const options: Intl.DateTimeFormatOptions = {
    day: '2-digit',
    month: '2-digit',
  };
  return date.toLocaleDateString('pt-BR', options);
}
