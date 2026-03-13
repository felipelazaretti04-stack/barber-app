import { barbers } from '../data/mock';
import { Barber } from '../types/app';

export function getAllBarbers(): Barber[] {
  return barbers;
}

export function getBarberById(id: string): Barber | undefined {
  return barbers.find(barber => barber.id === id);
}

export function formatRating(rating: number): string {
  return rating.toFixed(1);
}
