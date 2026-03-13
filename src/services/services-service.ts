import { services } from '../data/mock';
import { Service } from '../types/app';
import { fetchAllServices } from './supabase-services';

export async function getAllServices(): Promise<Service[]> {
  try {
    const supabaseServices = await fetchAllServices();
    return supabaseServices.length > 0 ? supabaseServices : services;
  } catch (error) {
    console.error('Error loading services, using mock data:', error);
    return services;
  }
}

export function getAllServicesSync(): Service[] {
  return services;
}

export function getServiceById(id: string): Service | undefined {
  return services.find(service => service.id === id);
}

export function formatPrice(price: number): string {
  return `R$ ${price.toFixed(2).replace('.', ',')}`;
}

export function formatDuration(minutes: number): string {
  if (minutes < 60) {
    return `${minutes} min`;
  }
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return mins > 0 ? `${hours}h ${mins}min` : `${hours}h`;
}
