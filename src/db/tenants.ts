import { index, integer, sqliteTable, text, unique } from "drizzle-orm/sqlite-core";
import { relations } from "drizzle-orm";
import { v4 } from "uuid";

// ============================================================
// PLANES DEL SAAS
// ============================================================
export const plans = sqliteTable(
  "plans",
  {
    id: text().primaryKey().$default(v4),
    name: text().notNull(),
    price_cop: integer().notNull(),
    max_orders: integer().notNull(),
    features: text().notNull().default(JSON.stringify([])),
    active: integer().notNull().default(1),
    created_at: integer().notNull().$default(() => Math.floor(Date.now() / 1000)),
  },
  (t) => [index("plans_index").on(t.id)],
);

// ============================================================
// TENANTS — cada negocio cliente
// ============================================================
export const tenants = sqliteTable(
  "tenants",
  {
    id: text().primaryKey().$default(v4),
    // Info del negocio
    business_name: text().notNull(),
    owner_name: text().notNull(),
    owner_email: text().notNull(),
    owner_phone: text().notNull(),
    // Tipo de negocio y modalidad
    business_type: text().notNull(),
    business_type_custom: text(),
    delivery_type: text().notNull(),
    // Bot
    bot_name: text().notNull().default("Vecinito"),
    bot_greeting: text(),
    // Estado y plan
    status: text().notNull().default("trial"),
    plan_id: text().references(() => plans.id),
    plan_expires: integer(),
    trial_ends: integer(),
    // Meta
    catalog_id_meta: text(),
    whatsapp_number: text(),
    whatsapp_phone_id: text(),
    whatsapp_token: text(),
    // Base de datos Turso del cliente
    db_url: text(),
    db_token: text(),
    db_name: text(),
    // Facturación
    billing_day: integer().default(1),
    total_orders: integer().notNull().default(0),
    // ✅ Auth — nuevas columnas
    owner_password: text(),
    verified: integer().default(0),
    verification_code: text(),
    verification_expires: integer(),
    // Timestamps
    created_at: integer().notNull().$default(() => Math.floor(Date.now() / 1000)),
    updated_at: integer().notNull().$default(() => Math.floor(Date.now() / 1000)),
  },
  (t) => [
    index("tenants_index").on(t.id),
    unique("tenants_email_unique").on(t.owner_email),
    unique("tenants_phone_unique").on(t.owner_phone),
  ],
);

// ============================================================
// POOL DE NÚMEROS WHATSAPP
// ============================================================
export const whatsapp_numbers = sqliteTable(
  "whatsapp_numbers",
  {
    id: text().primaryKey().$default(v4),
    phone_number: text().notNull(),
    phone_number_id: text().notNull(),
    display_name: text().notNull(),
    status: text().notNull().default("available"),
    tenant_id: text().references(() => tenants.id),
    assigned_at: integer(),
    created_at: integer().notNull().$default(() => Math.floor(Date.now() / 1000)),
  },
  (t) => [
    index("whatsapp_numbers_index").on(t.id),
    unique("whatsapp_number_unique").on(t.phone_number),
  ],
);

// ============================================================
// ZONAS DE ENTREGA POR TENANT
// ============================================================
export const tenant_locations = sqliteTable(
  "tenant_locations",
  {
    id: text().primaryKey().$default(v4),
    tenant_id: text().notNull().references(() => tenants.id),
    location_name: text().notNull(),
    available_days: text().notNull().default(JSON.stringify([])),
    active: integer().notNull().default(1),
  },
  (t) => [index("tenant_locations_index").on(t.tenant_id)],
);

// ============================================================
// FACTURACIÓN
// ============================================================
export const billing = sqliteTable(
  "billing",
  {
    id: text().primaryKey().$default(v4),
    tenant_id: text().notNull().references(() => tenants.id),
    plan_id: text().notNull().references(() => plans.id),
    amount_cop: integer().notNull(),
    status: text().notNull().default("pending"),
    period_start: integer().notNull(),
    period_end: integer().notNull(),
    paid_at: integer(),
    created_at: integer().notNull().$default(() => Math.floor(Date.now() / 1000)),
  },
  (t) => [index("billing_tenant_index").on(t.tenant_id)],
);

// ============================================================
// ONBOARDING — estado del proceso
// ============================================================
export const onboarding = sqliteTable(
  "onboarding",
  {
    id: text().primaryKey().$default(v4),
    tenant_id: text().notNull().references(() => tenants.id),
    step: integer().notNull().default(1),
    step_business: integer().notNull().default(0),
    step_delivery: integer().notNull().default(0),
    step_catalog: integer().notNull().default(0),
    step_bot: integer().notNull().default(0),
    step_number: integer().notNull().default(0),
    step_test: integer().notNull().default(0),
    completed: integer().notNull().default(0),
    completed_at: integer(),
    created_at: integer().notNull().$default(() => Math.floor(Date.now() / 1000)),
  },
  (t) => [index("onboarding_tenant_index").on(t.tenant_id)],
);

// ============================================================
// RELACIONES
// ============================================================
export const tenantsRelations = relations(tenants, ({ one, many }) => ({
  plan: one(plans, {
    fields: [tenants.plan_id],
    references: [plans.id],
  }),
  whatsapp_number: one(whatsapp_numbers, {
    fields: [tenants.whatsapp_number],
    references: [whatsapp_numbers.phone_number],
  }),
  locations: many(tenant_locations),
  billing: many(billing),
  onboarding: one(onboarding, {
    fields: [tenants.id],
    references: [onboarding.tenant_id],
  }),
}));

export const whatsappNumbersRelations = relations(whatsapp_numbers, ({ one }) => ({
  tenant: one(tenants, {
    fields: [whatsapp_numbers.tenant_id],
    references: [tenants.id],
  }),
}));

export const billingRelations = relations(billing, ({ one }) => ({
  tenant: one(tenants, {
    fields: [billing.tenant_id],
    references: [tenants.id],
  }),
  plan: one(plans, {
    fields: [billing.plan_id],
    references: [plans.id],
  }),
}));

export const onboardingRelations = relations(onboarding, ({ one }) => ({
  tenant: one(tenants, {
    fields: [onboarding.tenant_id],
    references: [tenants.id],
  }),
}));