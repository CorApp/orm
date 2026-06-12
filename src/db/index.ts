import { document_types, roles, users, usersRelations } from "@/db/users";
import { qualities, udms } from "@/db/udms";
import {
  cities,
  citiesRelations,
  countries,
  squares,
  squaresRelations,
  stands,
  standsRelations,
  warehouses,
  warehousesRelations,
} from "@/db/stands";
import { posts, postsRelations } from "@/db/posts";
import {
  categories,
  categoriesRelations,
  products,
  productsRelations,
} from "@/db/products";
import {
  order_items,
  orderItemsRelations,
  orders,
  ordersRelations,
} from "@/db/orders";
import { vehicles, vehiclesRelations } from "@/db/vehicles";
import { shorts } from "@/db/shorts";
import { placesBanned } from "@/db/places-banned";
import { messages, messagesRelations } from "@/db/messages";
import { templates } from "@/db/templates";
import { settings } from "@/db/settings";
import {
  plans,
  tenants,
  tenantsRelations,
  whatsapp_numbers,
  whatsappNumbersRelations,
  tenant_locations,
  billing,
  billingRelations,
  onboarding,
  onboardingRelations,
} from "@/db/tenants";

export {
  // User
  users,
  usersRelations,
  document_types,
  roles,
  // UDM
  udms,
  qualities,
  // Stand
  stands,
  standsRelations,
  cities,
  citiesRelations,
  countries,
  squares,
  squaresRelations,
  warehouses,
  warehousesRelations,
  // Product
  products,
  productsRelations,
  categories,
  categoriesRelations,
  // Post
  posts,
  postsRelations,
  // Order
  orders,
  ordersRelations,
  order_items,
  orderItemsRelations,
  // Vehicle
  vehicles,
  vehiclesRelations,
  // Url Short
  shorts,
  // Places Banned
  placesBanned,
  // Messages
  messages,
  messagesRelations,
  templates,
  settings,
  // SaaS
  plans,
  tenants,
  tenantsRelations,
  whatsapp_numbers,
  whatsappNumbersRelations,
  tenant_locations,
  billing,
  billingRelations,
  onboarding,
  onboardingRelations,
};