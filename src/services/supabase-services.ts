import { supabase } from '../lib/supabase';
import { Service, Barber, Customer, Appointment, DashboardMetrics } from '../types/app';
import { Database } from '../types/database';

type DbService = Database['public']['Tables']['services']['Row'];
type DbBarber = Database['public']['Tables']['barbers']['Row'];
type DbCustomer = Database['public']['Tables']['customers']['Row'];
type DbAppointment = Database['public']['Tables']['appointments']['Row'];

const USE_SUPABASE = !!(process.env.EXPO_PUBLIC_SUPABASE_URL && process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY);

// Mappers
function mapDbServiceToService(dbService: DbService): Service {
  return {
    id: dbService.id,
    name: dbService.name,
    description: dbService.description || '',
    duration: dbService.duration_minutes,
    price: Number(dbService.price),
  };
}

function mapDbBarberToBarber(dbBarber: DbBarber): Barber {
  return {
    id: dbBarber.id,
    name: dbBarber.name,
    specialty: dbBarber.specialty || '',
    avatar: dbBarber.photo_url || '',
    rating: Number(dbBarber.rating),
  };
}

function mapDbCustomerToCustomer(dbCustomer: DbCustomer): Customer {
  return {
    id: dbCustomer.id,
    name: dbCustomer.name,
    phone: dbCustomer.phone,
    createdAt: new Date(dbCustomer.created_at),
  };
}

// Services
export async function fetchAllServices(): Promise<Service[]> {
  if (!USE_SUPABASE) return [];

  const { data, error } = await supabase
    .from('services')
    .select('*')
    .eq('active', true)
    .order('name');

  if (error) {
    console.error('Error fetching services:', error);
    return [];
  }

  return (data || []).map(mapDbServiceToService);
}

export async function fetchAllBarbers(): Promise<Barber[]> {
  if (!USE_SUPABASE) return [];

  const { data, error } = await supabase
    .from('barbers')
    .select('*')
    .eq('active', true)
    .order('name');

  if (error) {
    console.error('Error fetching barbers:', error);
    return [];
  }

  return (data || []).map(mapDbBarberToBarber);
}

export async function fetchAllCustomers(): Promise<Customer[]> {
  if (!USE_SUPABASE) return [];

  const { data, error } = await supabase
    .from('customers')
    .select('*')
    .order('name');

  if (error) {
    console.error('Error fetching customers:', error);
    return [];
  }

  return (data || []).map(mapDbCustomerToCustomer);
}

export async function fetchAppointmentsByDate(date: string): Promise<any[]> {
  if (!USE_SUPABASE) return [];

  const { data, error } = await supabase
    .from('appointments')
    .select(`
      *,
      customer:customers(*),
      barber:barbers(*),
      service:services(*)
    `)
    .eq('appointment_date', date)
    .order('appointment_time');

  if (error) {
    console.error('Error fetching appointments:', error);
    return [];
  }

  return data || [];
}

export async function createCustomer(name: string, phone: string): Promise<Customer | null> {
  if (!USE_SUPABASE) return null;

  const { data: existing } = await supabase
    .from('customers')
    .select('*')
    .eq('phone', phone)
    .maybeSingle();

  if (existing) {
    return mapDbCustomerToCustomer(existing);
  }

  const { data, error } = await supabase
    .from('customers')
    .insert({ name, phone })
    .select()
    .single();

  if (error) {
    console.error('Error creating customer:', error);
    return null;
  }

  return mapDbCustomerToCustomer(data);
}

export async function createAppointment(params: {
  customerId: string;
  barberId: string;
  serviceId: string;
  date: string;
  time: string;
  price: number;
}): Promise<any> {
  if (!USE_SUPABASE) return null;

  const { data, error } = await supabase
    .from('appointments')
    .insert({
      customer_id: params.customerId,
      barber_id: params.barberId,
      service_id: params.serviceId,
      appointment_date: params.date,
      appointment_time: params.time,
      price: params.price,
      status: 'agendado',
    })
    .select()
    .single();

  if (error) {
    console.error('Error creating appointment:', error);
    return null;
  }

  return data;
}

export async function fetchDashboardMetrics(): Promise<Partial<DashboardMetrics>> {
  if (!USE_SUPABASE) return {};

  try {
    const today = new Date().toISOString().split('T')[0];
    const currentMonth = new Date().getMonth() + 1;
    const currentYear = new Date().getFullYear();

    const { count: appointmentsToday } = await supabase
      .from('appointments')
      .select('*', { count: 'exact', head: true })
      .eq('appointment_date', today);

    const { data: monthlyAppointments } = await supabase
      .from('appointments')
      .select('price')
      .gte('appointment_date', `${currentYear}-${String(currentMonth).padStart(2, '0')}-01`)
      .neq('status', 'cancelado');

    const monthlyRevenue = monthlyAppointments?.reduce((sum, apt) => sum + Number(apt.price), 0) || 0;

    const { count: totalClients } = await supabase
      .from('customers')
      .select('*', { count: 'exact', head: true });

    const { count: totalAppointments } = await supabase
      .from('appointments')
      .select('*', { count: 'exact', head: true })
      .neq('status', 'cancelado');

    return {
      appointmentsToday: appointmentsToday || 0,
      monthlyRevenue,
      totalClients: totalClients || 0,
      totalAppointments: totalAppointments || 0,
    };
  } catch (error) {
    console.error('Error fetching dashboard metrics:', error);
    return {};
  }
}
