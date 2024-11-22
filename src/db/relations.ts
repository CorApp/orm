import { relations } from "drizzle-orm";
import products, { categories } from "@/db/products";
import users, { document_types, roles } from "@/db/users";
import udms, { qualities } from "@/db/udms";
import stands, { cities, countries, squares, warehouses } from "@/db/stands";
import posts from "@/db/posts";
import orders, { order_items } from "@/db/orders";
import whatsapp from "@/db/whatsapp";

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
  seller: one(users, {
    fields: [stands.seller_id],
    references: [users.id],
  }),
}));

export const warehousesRelations = relations(warehouses, ({ many, one }) => ({
  stands: many(stands),
  square: one(squares, {
    fields: [warehouses.square_id],
    references: [squares.id],
  }),
}));

export const squaresRelations = relations(squares, ({ one }) => ({
  city: one(cities, {
    fields: [squares.city_id],
    references: [cities.id],
  }),
}));

export const citiesRelations = relations(cities, ({ one }) => ({
  country: one(countries, {
    fields: [cities.country_id],
    references: [countries.id],
  }),
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
  whatsapp: one(whatsapp, {
    fields: [users.id],
    references: [whatsapp.user_id],
  }),
}));

export const ordersRelations = relations(orders, ({ one, many }) => ({
  buyer: one(users, {
    fields: [orders.buyer_id],
    references: [users.id],
  }),
  items: many(order_items),
}));

export const orderItemsRelations = relations(order_items, ({ one }) => ({
  order: one(orders, {
    fields: [order_items.order_id],
    references: [orders.id],
  }),
  post: one(posts, {
    fields: [order_items.post_id],
    references: [posts.id],
  }),
}));

export const whatsappRelations = relations(whatsapp, ({ one }) => ({
  user: one(users, {
    fields: [whatsapp.user_id],
    references: [users.id],
  }),
}));
