import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Booking, Service, Barber } from '../types/app';

interface BookingContextType {
  booking: Booking;
  setService: (service: Service) => void;
  setBarber: (barber: Barber) => void;
  setDate: (date: string) => void;
  setTime: (time: string) => void;
  setCustomer: (name: string, phone: string) => void;
  resetBooking: () => void;
}

const initialBooking: Booking = {
  service: null,
  barber: null,
  date: null,
  time: null,
  customerName: '',
  customerPhone: '',
};

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export function BookingProvider({ children }: { children: ReactNode }) {
  const [booking, setBooking] = useState<Booking>(initialBooking);

  const setService = (service: Service) => {
    setBooking(prev => ({ ...prev, service }));
  };

  const setBarber = (barber: Barber) => {
    setBooking(prev => ({ ...prev, barber }));
  };

  const setDate = (date: string) => {
    setBooking(prev => ({ ...prev, date }));
  };

  const setTime = (time: string) => {
    setBooking(prev => ({ ...prev, time }));
  };

  const setCustomer = (name: string, phone: string) => {
    setBooking(prev => ({ ...prev, customerName: name, customerPhone: phone }));
  };

  const resetBooking = () => {
    setBooking(initialBooking);
  };

  return (
    <BookingContext.Provider
      value={{
        booking,
        setService,
        setBarber,
        setDate,
        setTime,
        setCustomer,
        resetBooking,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
}

export function useBooking() {
  const context = useContext(BookingContext);
  if (context === undefined) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
}
