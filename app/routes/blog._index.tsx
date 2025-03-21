import { BlogList } from "~/components/blog-list";
import { LandingLayout } from "~/components/landing-layout";
export default function Page() {
  return (
    <LandingLayout>
      <BlogList />
    </LandingLayout>
  );
}
