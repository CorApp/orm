import db from "./index";
import { users } from "@/schema";

// Insert
await db.insert(users).values({
  id: Date.now().toString(),
  name: "John Doe",
  email: Date.now().toString() + "test2@uwu.com",
  password: "password",
});

const result = await db.select().from(users).all();
console.log(result);
