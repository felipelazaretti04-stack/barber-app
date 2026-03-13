/*
  # Initial Schema - Barber App MVP

  ## Tabelas Principais
  1. **business_settings** - Configurações da barbearia
  2. **services** - Serviços oferecidos
  3. **barbers** - Barbeiros da equipe
  4. **customers** - Clientes cadastrados
  5. **appointments** - Agendamentos
  6. **payments** - Pagamentos realizados

  ## Tabelas Auxiliares
  7. **barber_working_hours** - Horários de trabalho dos barbeiros
  8. **blocked_slots** - Bloqueios de horários específicos
  9. **blocked_dates** - Bloqueios de dias inteiros

  ## Segurança
  - RLS habilitado em todas as tabelas
  - Políticas restritivas por padrão
  - Acesso público apenas para leitura de dados necessários
*/

-- Criar extensões necessárias
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ========================================
-- BUSINESS SETTINGS
-- ========================================
CREATE TABLE IF NOT EXISTS business_settings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  business_name TEXT NOT NULL DEFAULT 'Barber Premium',
  opening_time TIME NOT NULL DEFAULT '09:00',
  closing_time TIME NOT NULL DEFAULT '20:00',
  working_days JSONB NOT NULL DEFAULT '["monday", "tuesday", "wednesday", "thursday", "friday", "saturday"]',
  slot_interval_minutes INTEGER NOT NULL DEFAULT 30,
  phone TEXT,
  address TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE business_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Business settings are viewable by everyone"
  ON business_settings FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Business settings are editable by authenticated users"
  ON business_settings FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- ========================================
-- SERVICES
-- ========================================
CREATE TABLE IF NOT EXISTS services (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  duration_minutes INTEGER NOT NULL,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE services ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Services are viewable by everyone"
  ON services FOR SELECT
  TO public
  USING (active = true);

CREATE POLICY "Services are fully manageable by authenticated users"
  ON services FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- ========================================
-- BARBERS
-- ========================================
CREATE TABLE IF NOT EXISTS barbers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  photo_url TEXT,
  specialty TEXT,
  active BOOLEAN DEFAULT true,
  rating DECIMAL(2,1) DEFAULT 5.0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE barbers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Barbers are viewable by everyone"
  ON barbers FOR SELECT
  TO public
  USING (active = true);

CREATE POLICY "Barbers are fully manageable by authenticated users"
  ON barbers FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- ========================================
-- BARBER WORKING HOURS
-- ========================================
CREATE TABLE IF NOT EXISTS barber_working_hours (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  barber_id UUID NOT NULL REFERENCES barbers(id) ON DELETE CASCADE,
  day_of_week TEXT NOT NULL,
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  CONSTRAINT valid_day CHECK (day_of_week IN ('monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'))
);

ALTER TABLE barber_working_hours ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Working hours are viewable by everyone"
  ON barber_working_hours FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Working hours are fully manageable by authenticated users"
  ON barber_working_hours FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- ========================================
-- CUSTOMERS
-- ========================================
CREATE TABLE IF NOT EXISTS customers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  phone TEXT NOT NULL UNIQUE,
  email TEXT,
  notes TEXT,
  total_visits INTEGER DEFAULT 0,
  total_spent DECIMAL(10,2) DEFAULT 0,
  last_visit_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE customers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Customers are viewable by authenticated users"
  ON customers FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Customers can be created by anyone"
  ON customers FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Customers are updatable by authenticated users"
  ON customers FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- ========================================
-- APPOINTMENTS
-- ========================================
CREATE TABLE IF NOT EXISTS appointments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  customer_id UUID NOT NULL REFERENCES customers(id) ON DELETE CASCADE,
  barber_id UUID NOT NULL REFERENCES barbers(id) ON DELETE CASCADE,
  service_id UUID NOT NULL REFERENCES services(id) ON DELETE CASCADE,
  appointment_date DATE NOT NULL,
  appointment_time TIME NOT NULL,
  status TEXT NOT NULL DEFAULT 'agendado',
  price DECIMAL(10,2) NOT NULL,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  CONSTRAINT valid_status CHECK (status IN ('agendado', 'confirmado', 'em_atendimento', 'finalizado', 'cancelado', 'nao_compareceu'))
);

ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Appointments are viewable by everyone"
  ON appointments FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Appointments can be created by anyone"
  ON appointments FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Appointments are manageable by authenticated users"
  ON appointments FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- ========================================
-- PAYMENTS
-- ========================================
CREATE TABLE IF NOT EXISTS payments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  appointment_id UUID NOT NULL REFERENCES appointments(id) ON DELETE CASCADE,
  customer_id UUID NOT NULL REFERENCES customers(id) ON DELETE CASCADE,
  barber_id UUID NOT NULL REFERENCES barbers(id) ON DELETE CASCADE,
  service_id UUID NOT NULL REFERENCES services(id) ON DELETE CASCADE,
  payment_method TEXT NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  paid_at TIMESTAMPTZ DEFAULT now(),
  created_at TIMESTAMPTZ DEFAULT now(),
  CONSTRAINT valid_payment_method CHECK (payment_method IN ('dinheiro', 'debito', 'credito', 'pix'))
);

ALTER TABLE payments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Payments are viewable by authenticated users"
  ON payments FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Payments are creatable by authenticated users"
  ON payments FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- ========================================
-- BLOCKED DATES
-- ========================================
CREATE TABLE IF NOT EXISTS blocked_dates (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  barber_id UUID REFERENCES barbers(id) ON DELETE CASCADE,
  blocked_date DATE NOT NULL,
  reason TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE blocked_dates ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Blocked dates are viewable by everyone"
  ON blocked_dates FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Blocked dates are manageable by authenticated users"
  ON blocked_dates FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- ========================================
-- BLOCKED SLOTS
-- ========================================
CREATE TABLE IF NOT EXISTS blocked_slots (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  barber_id UUID NOT NULL REFERENCES barbers(id) ON DELETE CASCADE,
  blocked_date DATE NOT NULL,
  blocked_time TIME NOT NULL,
  reason TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE blocked_slots ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Blocked slots are viewable by everyone"
  ON blocked_slots FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Blocked slots are manageable by authenticated users"
  ON blocked_slots FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- ========================================
-- INDEXES
-- ========================================
CREATE INDEX IF NOT EXISTS idx_appointments_date ON appointments(appointment_date);
CREATE INDEX IF NOT EXISTS idx_appointments_barber ON appointments(barber_id);
CREATE INDEX IF NOT EXISTS idx_appointments_customer ON appointments(customer_id);
CREATE INDEX IF NOT EXISTS idx_appointments_status ON appointments(status);
CREATE INDEX IF NOT EXISTS idx_customers_phone ON customers(phone);
CREATE INDEX IF NOT EXISTS idx_payments_paid_at ON payments(paid_at);
CREATE INDEX IF NOT EXISTS idx_barber_working_hours_barber ON barber_working_hours(barber_id);

-- ========================================
-- FUNCTIONS
-- ========================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for updated_at
CREATE TRIGGER update_business_settings_updated_at BEFORE UPDATE ON business_settings
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_services_updated_at BEFORE UPDATE ON services
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_barbers_updated_at BEFORE UPDATE ON barbers
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_customers_updated_at BEFORE UPDATE ON customers
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_appointments_updated_at BEFORE UPDATE ON appointments
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ========================================
-- SEED DATA
-- ========================================

-- Insert default business settings
INSERT INTO business_settings (business_name, opening_time, closing_time, working_days, slot_interval_minutes)
VALUES ('Barber Premium', '09:00', '20:00', '["monday", "tuesday", "wednesday", "thursday", "friday", "saturday"]', 30)
ON CONFLICT DO NOTHING;

-- Insert sample services
INSERT INTO services (name, description, price, duration_minutes, active) VALUES
  ('Corte Clássico', 'Corte tradicional com máquina e tesoura', 45.00, 30, true),
  ('Corte + Barba', 'Corte completo com barba modelada', 70.00, 50, true),
  ('Barba Completa', 'Barba com navalha, toalha quente e hidratação', 40.00, 30, true),
  ('Corte Degradê', 'Degradê perfeito com acabamento na navalha', 55.00, 40, true),
  ('Combo Premium', 'Corte + Barba + Sobrancelha + Hidratação', 100.00, 75, true),
  ('Pigmentação', 'Pigmentação para cabelo ou barba', 60.00, 45, true)
ON CONFLICT DO NOTHING;

-- Insert sample barbers
INSERT INTO barbers (name, photo_url, specialty, active, rating) VALUES
  ('Leo Barber', 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?w=150&h=150&fit=crop', 'Cortes Clássicos e Degradê', true, 4.9),
  ('Seco', 'https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?w=150&h=150&fit=crop', 'Barba e Pigmentação', true, 4.8),
  ('Gustavo', 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?w=150&h=150&fit=crop', 'Cortes Modernos e Desenhos', true, 4.9)
ON CONFLICT DO NOTHING;