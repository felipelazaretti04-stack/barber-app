export type AppointmentStatus = 'confirmado' | 'concluido' | 'cancelado';

export interface Service {
  id: string;
  name: string;
  description: string;
  duration: number; // em minutos
  price: number;
}

export interface Barber {
  id: string;
  name: string;
  specialty: string;
  avatar: string;
  rating: number;
}

export interface Customer {
  id: string;
  name: string;
  phone: string;
  createdAt: Date;
}

export interface TimeSlot {
  time: string;
  available: boolean;
}

export interface Appointment {
  id: string;
  service: Service;
  barber: Barber;
  customer: Customer;
  date: string;
  time: string;
  status: AppointmentStatus;
  createdAt: Date;
}

export interface Booking {
  service: Service | null;
  barber: Barber | null;
  date: string | null;
  time: string | null;
  customerName: string;
  customerPhone: string;
}

export interface DashboardMetrics {
  appointmentsToday: number;
  monthlyRevenue: number;
  totalClients: number;
  totalAppointments: number;
  averageTicket: number;
  topServices: { name: string; count: number }[];
}
