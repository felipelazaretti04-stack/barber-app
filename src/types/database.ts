export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      business_settings: {
        Row: {
          id: string
          business_name: string
          opening_time: string
          closing_time: string
          working_days: Json
          slot_interval_minutes: number
          phone: string | null
          address: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          business_name?: string
          opening_time?: string
          closing_time?: string
          working_days?: Json
          slot_interval_minutes?: number
          phone?: string | null
          address?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          business_name?: string
          opening_time?: string
          closing_time?: string
          working_days?: Json
          slot_interval_minutes?: number
          phone?: string | null
          address?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      services: {
        Row: {
          id: string
          name: string
          description: string | null
          price: number
          duration_minutes: number
          active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          description?: string | null
          price: number
          duration_minutes: number
          active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string | null
          price?: number
          duration_minutes?: number
          active?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      barbers: {
        Row: {
          id: string
          name: string
          photo_url: string | null
          specialty: string | null
          active: boolean
          rating: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          photo_url?: string | null
          specialty?: string | null
          active?: boolean
          rating?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          photo_url?: string | null
          specialty?: string | null
          active?: boolean
          rating?: number
          created_at?: string
          updated_at?: string
        }
      }
      barber_working_hours: {
        Row: {
          id: string
          barber_id: string
          day_of_week: string
          start_time: string
          end_time: string
          active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          barber_id: string
          day_of_week: string
          start_time: string
          end_time: string
          active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          barber_id?: string
          day_of_week?: string
          start_time?: string
          end_time?: string
          active?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      customers: {
        Row: {
          id: string
          name: string
          phone: string
          email: string | null
          notes: string | null
          total_visits: number
          total_spent: number
          last_visit_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          phone: string
          email?: string | null
          notes?: string | null
          total_visits?: number
          total_spent?: number
          last_visit_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          phone?: string
          email?: string | null
          notes?: string | null
          total_visits?: number
          total_spent?: number
          last_visit_at?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      appointments: {
        Row: {
          id: string
          customer_id: string
          barber_id: string
          service_id: string
          appointment_date: string
          appointment_time: string
          status: string
          price: number
          notes: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          customer_id: string
          barber_id: string
          service_id: string
          appointment_date: string
          appointment_time: string
          status?: string
          price: number
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          customer_id?: string
          barber_id?: string
          service_id?: string
          appointment_date?: string
          appointment_time?: string
          status?: string
          price?: number
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      payments: {
        Row: {
          id: string
          appointment_id: string
          customer_id: string
          barber_id: string
          service_id: string
          payment_method: string
          amount: number
          paid_at: string
          created_at: string
        }
        Insert: {
          id?: string
          appointment_id: string
          customer_id: string
          barber_id: string
          service_id: string
          payment_method: string
          amount: number
          paid_at?: string
          created_at?: string
        }
        Update: {
          id?: string
          appointment_id?: string
          customer_id?: string
          barber_id?: string
          service_id?: string
          payment_method?: string
          amount?: number
          paid_at?: string
          created_at?: string
        }
      }
      blocked_dates: {
        Row: {
          id: string
          barber_id: string | null
          blocked_date: string
          reason: string | null
          created_at: string
        }
        Insert: {
          id?: string
          barber_id?: string | null
          blocked_date: string
          reason?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          barber_id?: string | null
          blocked_date?: string
          reason?: string | null
          created_at?: string
        }
      }
      blocked_slots: {
        Row: {
          id: string
          barber_id: string
          blocked_date: string
          blocked_time: string
          reason: string | null
          created_at: string
        }
        Insert: {
          id?: string
          barber_id: string
          blocked_date: string
          blocked_time: string
          reason?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          barber_id?: string
          blocked_date?: string
          blocked_time?: string
          reason?: string | null
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
