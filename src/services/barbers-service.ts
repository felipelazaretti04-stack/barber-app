import { barbers } from '../data/mock';
import { Barber } from '../types/app';
import { fetchAllBarbers } from './supabase-services';

export async function getAllBarbers(): Promise<Barber[]> {
  try {
    const supabaseBarbers = await fetchAllBarbers();
    return supabaseBarbers.length > 0 ? supabaseBarbers : barbers;
  } catch (error) {
    console.error('Error loading barbers, using mock data:', error);
    return barbers;
  }
}

export function getAllBarbersSync(): Barber[] {
  return barbers;
}

export function getBarberById(id: string): Barber | undefined {
  return barbers.find(barber => barber.id === id);
}

export function formatRating(rating: number): string {
  return rating.toFixed(1);
}
