import { eq } from "drizzle-orm";
import { DOCUMENT_TYPES, USER_ROLES } from "@/db/users";
import dbInit, { schemas } from "@/index";

const db = dbInit(process.env);
for (const role of USER_ROLES) {
  const existRole = await db.query.roles.findFirst({
    where: eq(schemas.roles.name, role),
  });

  if (!existRole) {
    await db.insert(schemas.roles).values({ name: role });
  }
}

for (const document of DOCUMENT_TYPES) {
  const existDocument = await db.query.document_types.findFirst({
    where: eq(schemas.document_types.name, document),
  });

  if (!existDocument) {
    await db.insert(schemas.document_types).values({ name: document });
  }
}

const countryName = "Colombia";
let country = await db.query.countries.findFirst({
  where: eq(schemas.countries.name, countryName),
});

if (!country) {
  await db.insert(schemas.countries).values({ name: countryName });
  country = await db.query.countries.findFirst({
    where: eq(schemas.countries.name, countryName),
  });
}

const cityName = "Bogotá";
let city = await db.query.cities.findFirst({
  where: eq(schemas.cities.name, cityName),
});

if (!city) {
  await db.insert(schemas.cities).values({
    name: cityName,
    country_id: country!.id,
  });

  city = await db.query.cities.findFirst({
    where: eq(schemas.cities.name, cityName),
  });
}

const namePlaza = "Corabastos";
const square = await db.query.squares.findFirst({
  where: eq(schemas.squares.name, namePlaza),
});

if (!square) {
  await db.insert(schemas.squares).values({
    name: namePlaza,
    city_id: city!.id,
  });
}
