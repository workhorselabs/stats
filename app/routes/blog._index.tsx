import { json, LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { BlogList } from "~/components/blog-list";
import { LandingLayout } from "~/components/landing-layout";
import { prisma } from "~/utils/prisma.server";

export const loader: LoaderFunction = async () => {
  const posts = await prisma.post.findMany({
    where: { published: true },
    orderBy: { createdAt: "desc" },
  });

  return json({ posts });
};

export default function Page() {
  const { posts } = useLoaderData<typeof loader>();

  return (
    <LandingLayout>
      <BlogList
        posts={posts}
        tagline="Latest Updates"
        heading="Blog Posts"
        description="Discover the latest trends, tips, and best practices in modern web development. From UI components to design systems, stay updated with our expert insights."
        buttonText="View all articles"
        buttonUrl="https://shadcnblocks.com"
      />
    </LandingLayout>
  );
}
