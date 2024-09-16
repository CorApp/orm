import db from "./index";
import { eq } from "drizzle-orm";
import { DOCUMENT_TYPES, document_types, roles, USER_ROLES } from "@/db/users";

USER_ROLES.forEach(async (role) => {
  const existRole = await db.query.roles.findFirst({
    where: eq(roles.name, role),
  });

  if (!existRole) {
    await db.insert(roles).values({ name: role });
  }
});

DOCUMENT_TYPES.forEach(async (document) => {
  const existDocument = await db.query.document_types.findFirst({
    where: eq(document_types.name, document),
  });

  if (!existDocument) {
    await db.insert(document_types).values({ name: document });
  }
});
