import db from "./index";
import { eq } from "drizzle-orm";
import roles, { USER_ROLES } from "@/db/roles";
import document_types, { DOCUMENT_TYPES } from "@/db/document_types";

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
