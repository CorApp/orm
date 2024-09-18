import db from "@/index";

const posts = await db.query.products.findMany({
  with: {
    category: true,
  },
});
console.log({ posts });

const categories = await db.query.categories.findMany({
  with: {
    products: true,
  },
});
console.log({ categories });

const allPosts = await db.query.posts.findMany({
  limit: 10,
  where: (post, { eq, and }) =>
    and(eq(post.published, "1"), eq(post.updated, "1")),
  with: {
    product: true,
    stand: true,
  },
});
console.log({ allPosts });
