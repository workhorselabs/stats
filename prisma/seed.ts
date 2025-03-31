import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const hashedPassword =
    "$2b$10$7yJZg/9YJZuB6KQbl3t8xut12IlA6hUQ5swXuQ/kTlxaJ0X2dV2OO";

  await prisma.user.create({
    data: {
      email: "w@g.com",
      password: hashedPassword,
    },
  });

  console.log("Seeded user!");

  const user = await prisma.user.findFirst();

  if (!user) throw new Error("No user found");

  await prisma.post.create({
    data: {
      title: "Hello World",
      slug: "hello-world",
      content: "This is a test post",
      authorId: user.id,
    },
  });
  console.log("Seeded blog post!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
