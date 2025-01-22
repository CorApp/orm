import users, { document_types, roles, usersRelations } from "@/db/users";
import udms, { qualities } from "@/db/udms";
import stands, {
  cities,
  citiesRelations,
  countries,
  squares,
  squaresRelations,
  standsRelations,
  warehouses,
  warehousesRelations,
} from "@/db/stands";
import posts, { postsRelations } from "@/db/posts";
import products, {
  categories,
  categoriesRelations,
  productsRelations,
} from "@/db/products";
import orders, {
  order_items,
  orderItemsRelations,
  ordersRelations,
} from "@/db/orders";
import vehicles, { vehiclesRelations } from "@/db/vehicles";
import shorts from "@/db/shorts";

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
};
