import users, { document_types, roles } from "@/db/users";
import udms, { dimensions } from "@/db/udms";
import stands, { cities, countries, squares, warehouses } from "@/db/stands";
import posts, { qualities } from "@/db/posts";
import products, { categories } from "@/db/products";
import whatsapp from "@/db/whatsapp";

export {
  // User
  users,
  document_types,
  roles,
  // Whatsapp
  whatsapp,
  // UDM
  udms,
  dimensions,
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
  qualities,
};
