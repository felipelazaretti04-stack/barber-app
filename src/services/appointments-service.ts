import { appointments, customers } from '../data/mock';
import { Appointment, DashboardMetrics, Customer, Booking } from '../types/app';

let localAppointments = [...appointments];
let localCustomers = [...customers];

export function getAllAppointments(): Appointment[] {
  return localAppointments;
}

export function getAppointmentsByDate(date: string): Appointment[] {
  return localAppointments.filter(apt => apt.date === date);
}

export function getTodayAppointments(): Appointment[] {
  const today = new Date().toISOString().split('T')[0];
  return getAppointmentsByDate(today);
}

export function getAllCustomers(): Customer[] {
  return localCustomers;
}

export function createAppointment(booking: Booking): Appointment {
  const customer: Customer = {
    id: String(localCustomers.length + 1),
    name: booking.customerName,
    phone: booking.customerPhone,
    createdAt: new Date(),
  };

  // Verifica se o cliente já existe
  const existingCustomer = localCustomers.find(c => c.phone === booking.customerPhone);
  if (!existingCustomer) {
    localCustomers.push(customer);
  }

  const appointment: Appointment = {
    id: String(localAppointments.length + 1),
    service: booking.service!,
    barber: booking.barber!,
    customer: existingCustomer || customer,
    date: booking.date!,
    time: booking.time!,
    status: 'confirmado',
    createdAt: new Date(),
  };

  localAppointments.push(appointment);
  return appointment;
}

export function getDashboardMetrics(): DashboardMetrics {
  const today = new Date().toISOString().split('T')[0];
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();

  const todayAppointments = localAppointments.filter(apt => apt.date === today);
  
  const monthAppointments = localAppointments.filter(apt => {
    const aptDate = new Date(apt.date);
    return aptDate.getMonth() === currentMonth && 
           aptDate.getFullYear() === currentYear &&
           apt.status !== 'cancelado';
  });

  const completedAppointments = localAppointments.filter(apt => apt.status === 'concluido');
  
  const monthlyRevenue = monthAppointments.reduce((sum, apt) => sum + apt.service.price, 0);
  
  const averageTicket = completedAppointments.length > 0 
    ? completedAppointments.reduce((sum, apt) => sum + apt.service.price, 0) / completedAppointments.length
    : 0;

  // Serviços mais vendidos
  const serviceCount: Record<string, number> = {};
  completedAppointments.forEach(apt => {
    serviceCount[apt.service.name] = (serviceCount[apt.service.name] || 0) + 1;
  });

  const topServices = Object.entries(serviceCount)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  return {
    appointmentsToday: todayAppointments.length,
    monthlyRevenue,
    totalClients: localCustomers.length,
    totalAppointments: localAppointments.filter(a => a.status !== 'cancelado').length,
    averageTicket,
    topServices,
  };
}

export function getAppointmentHistory(): Appointment[] {
  return localAppointments
    .filter(apt => apt.status === 'concluido' || apt.status === 'cancelado')
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getMonthlyFinance(): {
  revenue: number;
  count: number;
  averageTicket: number;
  byService: { name: string; revenue: number; count: number }[];
} {
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();

  const monthAppointments = localAppointments.filter(apt => {
    const aptDate = new Date(apt.date);
    return aptDate.getMonth() === currentMonth && 
           aptDate.getFullYear() === currentYear &&
           (apt.status === 'concluido' || apt.status === 'confirmado');
  });

  const revenue = monthAppointments.reduce((sum, apt) => sum + apt.service.price, 0);
  const count = monthAppointments.length;
  const averageTicket = count > 0 ? revenue / count : 0;

  const byServiceMap: Record<string, { revenue: number; count: number }> = {};
  monthAppointments.forEach(apt => {
    if (!byServiceMap[apt.service.name]) {
      byServiceMap[apt.service.name] = { revenue: 0, count: 0 };
    }
    byServiceMap[apt.service.name].revenue += apt.service.price;
    byServiceMap[apt.service.name].count += 1;
  });

  const byService = Object.entries(byServiceMap)
    .map(([name, data]) => ({ name, ...data }))
    .sort((a, b) => b.revenue - a.revenue);

  return { revenue, count, averageTicket, byService };
}
