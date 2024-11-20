import { eq } from "drizzle-orm";
import users, { DOCUMENT_TYPES, USER_ROLES } from "@/db/users";
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

const seedEmail: string = "carmelo@etlgr.com";
let userExist = await db.query.users.findFirst({
  where: eq(users.email, seedEmail),
});

if (!userExist) {
  const roleAdmin = await db.query.roles.findFirst({
    where: eq(schemas.roles.name, "admin"),
  });

  const findPPId = await db.query.document_types.findFirst({
    where: eq(schemas.document_types.name, DOCUMENT_TYPES[3]),
  });

  await db.insert(users).values({
    name: "Carmelo Campos",
    phone: "573225956284",
    email: seedEmail,
    password: "123456",
    role_id: roleAdmin!.id!.toString(),
    document_type_id: findPPId!.id!.toString(),
    document: "147267474",
  });

  userExist = await db.query.users.findFirst({
    where: eq(users.email, seedEmail),
  });
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

const cityName = "Tunja";
let city = await db.query.cities.findFirst({
  where: eq(schemas.cities.name, cityName),
});

if (!city) {
  await db.insert(schemas.cities).values({
    name: cityName,
    country_id: country!.id!.toString(),
  });

  city = await db.query.cities.findFirst({
    where: eq(schemas.cities.name, cityName),
  });
}

const namePlaza = "Plaza mercado del sur";
let square = await db.query.squares.findFirst({
  where: eq(schemas.squares.name, namePlaza),
});

if (!square) {
  await db.insert(schemas.squares).values({
    name: namePlaza,
    city_id: city!.id!.toString(),
  });
  square = await db.query.squares.findFirst({
    where: eq(schemas.squares.name, namePlaza),
  });
}

const nameWarehouse = "Bodega 1";
let warehouse = await db.query.warehouses.findFirst({
  where: eq(schemas.warehouses.name, nameWarehouse),
});

if (!warehouse) {
  await db.insert(schemas.warehouses).values({
    name: nameWarehouse,
    code: Date.now().toString(),
    square_id: square!.id!.toString(),
  });
  warehouse = await db.query.warehouses.findFirst({
    where: eq(schemas.warehouses.name, nameWarehouse),
  });
}

const nameStand = "Puesto 1";
let stand = await db.query.stands.findFirst({
  where: eq(schemas.stands.name, nameStand),
});

if (!stand) {
  await db.insert(schemas.stands).values({
    name: nameStand,
    code: Date.now().toString(),
    seller_id: userExist!.id!.toString(),
    warehouse_id: warehouse!.id!.toString(),
  });

  stand = await db.query.stands.findFirst({
    where: eq(schemas.stands.name, nameStand),
  });
}

const nameCategory = "Frutas";
let category = await db.query.categories.findFirst({
  where: eq(schemas.categories.name, nameCategory),
});

if (!category) {
  await db.insert(schemas.categories).values({
    slug: "frutas",
    name: nameCategory,
    img: "https://via.placeholder.com/300",
  });
  category = await db.query.categories.findFirst({
    where: eq(schemas.categories.name, nameCategory),
  });
}

const nameProduct = "Banano";
let product = await db.query.products.findFirst({
  where: eq(schemas.products.name, nameProduct),
});

if (!product) {
  await db.insert(schemas.products).values({
    name: nameProduct,
    photo: "https://via.placeholder.com/400",
    code: Date.now().toString(),
    category_id: category!.id!.toString(),
  });
  product = await db.query.products.findFirst({
    where: eq(schemas.products.name, nameProduct),
  });
}

const nameUdm = "Caja de Kilo";
let udm = await db.query.udms.findFirst({
  where: eq(schemas.udms.name, nameUdm),
});

if (!udm) {
  await db.insert(schemas.udms).values({
    name: nameUdm,
    weight: "1",
    height: "10",
    width: "10",
    length: "10",
  });
  udm = await db.query.udms.findFirst({
    where: eq(schemas.udms.name, nameUdm),
  });
}

const nameQuality = "Buena";
let quality = await db.query.qualities.findFirst({
  where: eq(schemas.qualities.name, nameQuality),
});

if (!quality) {
  await db.insert(schemas.qualities).values({ name: nameQuality });
  quality = await db.query.qualities.findFirst({
    where: eq(schemas.qualities.name, nameQuality),
  });
}

const pricePost = "1000";
let post = await db.query.posts.findFirst({
  where: eq(schemas.posts.price, pricePost),
});

if (!post) {
  await db.insert(schemas.posts).values({
    price: "1000",
    min: "1",
    wholesale: "0",
    seller_id: userExist!.id!.toString(),
    udm_id: udm!.id!.toString(),
    quality_id: quality!.id!.toString(),
    product_id: product!.id!.toString(),
    stand_id: stand!.id!.toString(),
    published: "1",
    updated: "1",
  });
  post = await db.query.posts.findFirst({
    where: eq(schemas.posts.price, pricePost),
  });
}
