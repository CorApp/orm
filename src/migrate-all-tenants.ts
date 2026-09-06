// migrate-all-tenants.ts
import { createClient } from "@libsql/client";
import * as dotenv from "dotenv";
dotenv.config();

// Cliente a la base SaaS (donde vive la lista de tenants)
const saas = createClient({
  url: process.env.TURSO_SAAS_URL!,
  authToken: process.env.TURSO_SAAS_TOKEN!,
});

// Columnas nuevas a agregar en cada base de tenant
const TENANT_PRODUCTS_COLUMNS = [
  `ALTER TABLE tenant_products ADD COLUMN media_1_url TEXT`,
  `ALTER TABLE tenant_products ADD COLUMN media_1_type TEXT`,
  `ALTER TABLE tenant_products ADD COLUMN media_2_url TEXT`,
  `ALTER TABLE tenant_products ADD COLUMN media_2_type TEXT`,
  `ALTER TABLE tenant_products ADD COLUMN media_text TEXT`,
  // Nuevas de esta tarea:
  `ALTER TABLE tenant_products ADD COLUMN media_2_text TEXT`,
  `ALTER TABLE tenant_products ADD COLUMN media_3_url TEXT`,
  `ALTER TABLE tenant_products ADD COLUMN media_3_type TEXT`,
  `ALTER TABLE tenant_products ADD COLUMN media_3_text TEXT`,
  `ALTER TABLE tenant_products ADD COLUMN media_4_url TEXT`,
  `ALTER TABLE tenant_products ADD COLUMN media_4_type TEXT`,
  `ALTER TABLE tenant_products ADD COLUMN media_4_text TEXT`,
  `ALTER TABLE tenant_products ADD COLUMN media_5_url TEXT`,
  `ALTER TABLE tenant_products ADD COLUMN media_5_type TEXT`,
  `ALTER TABLE tenant_products ADD COLUMN media_5_text TEXT`,
  `ALTER TABLE tenant_products ADD COLUMN media_6_url TEXT`,
  `ALTER TABLE tenant_products ADD COLUMN media_6_type TEXT`,
  `ALTER TABLE tenant_products ADD COLUMN media_6_text TEXT`,
  // Consecutivo de órdenes
  `ALTER TABLE orders ADD COLUMN order_number TEXT`,
];

async function migrateAllTenants() {
  console.log("🔍 Buscando tenants en corapp-saas...");

  const result = await saas.execute(
    `SELECT id, business_name, db_url, db_token FROM tenants WHERE db_url IS NOT NULL AND db_token IS NOT NULL`
  );

  const tenants = result.rows as unknown as {
    id: string;
    business_name: string;
    db_url: string;
    db_token: string;
  }[];

  console.log(`📦 ${tenants.length} tenants encontrados con base propia.\n`);

  const summary: { tenant: string; status: "ok" | "error"; detail?: string }[] = [];

  for (const tenant of tenants) {
    console.log(`➡️  Migrando: ${tenant.business_name} (${tenant.id})`);

    try {
      const tenantDb = createClient({
        url: tenant.db_url,
        authToken: tenant.db_token,
      });

      for (const sql of TENANT_PRODUCTS_COLUMNS) {
        try {
          await tenantDb.execute(sql);
          console.log(`   ✅ ${sql.split("COLUMN ")[1]}`);
        } catch (e: any) {
          if (!String(e.message).includes("duplicate column")) {
            throw e;
          }
          console.log(`   ⏭️  ya existía: ${sql.split("COLUMN ")[1]}`);
        }
      }

      summary.push({ tenant: tenant.business_name, status: "ok" });
    } catch (e: any) {
      console.error(`   ❌ Error en ${tenant.business_name}:`, e.message);
      summary.push({ tenant: tenant.business_name, status: "error", detail: e.message });
    }

    console.log("");
  }

  console.log("📋 Resumen final:");
  for (const s of summary) {
    console.log(`   ${s.status === "ok" ? "✅" : "❌"} ${s.tenant}${s.detail ? " — " + s.detail : ""}`);
  }

  process.exit(0);
}

migrateAllTenants().catch((e) => {
  console.error("❌ Error general:", e);
  process.exit(1);
});