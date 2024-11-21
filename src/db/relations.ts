import { relations } from "drizzle-orm";
import products, { categories } from "@/db/products";
import users, { document_types, roles } from "@/db/users";
import udms, { qualities } from "@/db/udms";
import stands, { warehouses } from "@/db/stands";
import posts from "@/db/posts";

export const categoriesRelations = relations(categories, ({ many }) => ({
  products: many(products),
}));

export const productsRelations = relations(products, ({ one }) => ({
  category: one(categories, {
    fields: [products.category_id],
    references: [categories.id],
  }),
}));

export const postsRelations = relations(posts, ({ one }) => ({
  seller: one(users, {
    fields: [posts.seller_id],
    references: [users.id],
  }),
  udm: one(udms, {
    fields: [posts.udm_id],
    references: [udms.id],
  }),
  quality: one(qualities, {
    fields: [posts.quality_id],
    references: [qualities.id],
  }),
  product: one(products, {
    fields: [posts.product_id],
    references: [products.id],
  }),
  stand: one(stands, {
    fields: [posts.stand_id],
    references: [stands.id],
  }),
}));

export const standsRelations = relations(stands, ({ one }) => ({
  warehouse: one(warehouses, {
    fields: [stands.warehouse_id],
    references: [warehouses.id],
  }),
}));

export const warehousesRelations = relations(warehouses, ({ many }) => ({
  stands: many(stands),
}));

export const usersRelations = relations(users, ({ one }) => ({
  role: one(roles, {
    fields: [users.role_id],
    references: [roles.id],
  }),
  documentType: one(document_types, {
    fields: [users.document_type_id],
    references: [document_types.id],
  }),
}));
