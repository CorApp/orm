import { createClient } from "@libsql/client";
import * as dotenv from "dotenv";
dotenv.config();

const turso = createClient({
  url: process.env.TURSO_SAAS_URL!,
  authToken: process.env.TURSO_SAAS_TOKEN!,
});

async function migrate() {
  // Planes
  await turso.execute(`
    CREATE TABLE IF NOT EXISTS plans (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      price_cop INTEGER NOT NULL,
      max_orders INTEGER NOT NULL,
      features TEXT NOT NULL DEFAULT '[]',
      active INTEGER NOT NULL DEFAULT 1,
      created_at INTEGER NOT NULL
    )
  `);

  // Tenants
  await turso.execute(`
    CREATE TABLE IF NOT EXISTS tenants (
      id TEXT PRIMARY KEY,
      business_name TEXT NOT NULL,
      owner_name TEXT NOT NULL,
      owner_email TEXT NOT NULL,
      owner_phone TEXT NOT NULL,
      business_type TEXT NOT NULL,
      business_type_custom TEXT,
      delivery_type TEXT NOT NULL,
      bot_name TEXT NOT NULL DEFAULT 'Vecinito',
      bot_greeting TEXT,
      status TEXT NOT NULL DEFAULT 'trial',
      plan_id TEXT REFERENCES plans(id),
      plan_expires INTEGER,
      trial_ends INTEGER,
      catalog_id_meta TEXT,
      whatsapp_number TEXT,
      whatsapp_phone_id TEXT,
      whatsapp_token TEXT,
      db_url TEXT,
      db_token TEXT,
      db_name TEXT,
      billing_day INTEGER DEFAULT 1,
      total_orders INTEGER NOT NULL DEFAULT 0,
      created_at INTEGER NOT NULL,
      updated_at INTEGER NOT NULL
    )
  `);

  await turso.execute(`
    CREATE UNIQUE INDEX IF NOT EXISTS tenants_email_unique ON tenants(owner_email)
  `);

  await turso.execute(`
    CREATE UNIQUE INDEX IF NOT EXISTS tenants_phone_unique ON tenants(owner_phone)
  `);

  // Pool de números WhatsApp
  await turso.execute(`
    CREATE TABLE IF NOT EXISTS whatsapp_numbers (
      id TEXT PRIMARY KEY,
      phone_number TEXT NOT NULL,
      phone_number_id TEXT NOT NULL,
      display_name TEXT NOT NULL,
      status TEXT NOT NULL DEFAULT 'available',
      tenant_id TEXT REFERENCES tenants(id),
      assigned_at INTEGER,
      created_at INTEGER NOT NULL
    )
  `);

  await turso.execute(`
    CREATE UNIQUE INDEX IF NOT EXISTS whatsapp_number_unique ON whatsapp_numbers(phone_number)
  `);

  // Zonas de entrega por tenant
  await turso.execute(`
    CREATE TABLE IF NOT EXISTS tenant_locations (
      id TEXT PRIMARY KEY,
      tenant_id TEXT NOT NULL REFERENCES tenants(id),
      location_name TEXT NOT NULL,
      available_days TEXT NOT NULL DEFAULT '[]',
      active INTEGER NOT NULL DEFAULT 1
    )
  `);

  await turso.execute(`
    CREATE INDEX IF NOT EXISTS tenant_locations_index ON tenant_locations(tenant_id)
  `);

  // Facturación
  await turso.execute(`
    CREATE TABLE IF NOT EXISTS billing (
      id TEXT PRIMARY KEY,
      tenant_id TEXT NOT NULL REFERENCES tenants(id),
      plan_id TEXT NOT NULL REFERENCES plans(id),
      amount_cop INTEGER NOT NULL,
      status TEXT NOT NULL DEFAULT 'pending',
      period_start INTEGER NOT NULL,
      period_end INTEGER NOT NULL,
      paid_at INTEGER,
      created_at INTEGER NOT NULL
    )
  `);

  await turso.execute(`
    CREATE INDEX IF NOT EXISTS billing_tenant_index ON billing(tenant_id)
  `);

  // Onboarding
  await turso.execute(`
    CREATE TABLE IF NOT EXISTS onboarding (
      id TEXT PRIMARY KEY,
      tenant_id TEXT NOT NULL REFERENCES tenants(id),
      step INTEGER NOT NULL DEFAULT 1,
      step_business INTEGER NOT NULL DEFAULT 0,
      step_delivery INTEGER NOT NULL DEFAULT 0,
      step_catalog INTEGER NOT NULL DEFAULT 0,
      step_bot INTEGER NOT NULL DEFAULT 0,
      step_number INTEGER NOT NULL DEFAULT 0,
      step_test INTEGER NOT NULL DEFAULT 0,
      completed INTEGER NOT NULL DEFAULT 0,
      completed_at INTEGER,
      created_at INTEGER NOT NULL
    )
  `);

  await turso.execute(`
    CREATE INDEX IF NOT EXISTS onboarding_tenant_index ON onboarding(tenant_id)
  `);

  // Datos iniciales — planes
  const now = Math.floor(Date.now() / 1000);

  await turso.execute(`
    INSERT OR IGNORE INTO plans (id, name, price_cop, max_orders, features, active, created_at)
    VALUES (
      'plan-starter',
      'Starter',
      150000,
      200,
      '["1 número WhatsApp","Hasta 200 órdenes/mes","Catálogo básico","Soporte por chat"]',
      1,
      ${now}
    )
  `);

  await turso.execute(`
    INSERT OR IGNORE INTO plans (id, name, price_cop, max_orders, features, active, created_at)
    VALUES (
      'plan-pro',
      'Pro',
      350000,
      800,
      '["1 número WhatsApp","Hasta 800 órdenes/mes","ML personalizado","Soporte prioritario"]',
      1,
      ${now}
    )
  `);

  await turso.execute(`
    INSERT OR IGNORE INTO plans (id, name, price_cop, max_orders, features, active, created_at)
    VALUES (
      'plan-business',
      'Business',
      700000,
      -1,
      '["1 número WhatsApp","Órdenes ilimitadas","ML personalizado","Soporte 24/7","Panel analytics"]',
      1,
      ${now}
    )
  `);

  console.log("✅ Migración SaaS exitosa");
  console.log("   Tablas: plans, tenants, whatsapp_numbers, tenant_locations, billing, onboarding");
  console.log("   Planes: Starter $150.000 | Pro $350.000 | Business $700.000");
  process.exit(0);
}

migrate().catch((e) => {
  console.error("❌ Error en migración SaaS:", e);
  process.exit(1);
});