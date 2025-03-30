import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash("password123", 10);

  await prisma.user.create({
    data: {
      email: "test@example.com",
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
