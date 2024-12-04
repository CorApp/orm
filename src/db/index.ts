import users, { document_types, roles } from "@/db/users";
import udms, { qualities } from "@/db/udms";
import stands, { cities, countries, squares, warehouses } from "@/db/stands";
import posts, { post_prices } from "@/db/posts";
import products, { categories } from "@/db/products";
import orders, { order_items } from "@/db/orders";
import vehicles from "@/db/vehicles";
import shorts from "@/db/shorts";

export {
  // User
  users,
  document_types,
  roles,
  // UDM
  udms,
  qualities,
  // Stand
  stands,
  cities,
  countries,
  squares,
  warehouses,
  // Product
  products,
  categories,
  // Post
  posts,
  post_prices,
  // Order
  orders,
  order_items,
  // Vehicle
  vehicles,
  // Url Short
  shorts,
};

export * from "@/db/relations";
