import type { MetaFunction } from "@remix-run/node";
import { LandingLayout } from "~/components/landing-layout";
export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return <LandingLayout>test</LandingLayout>;
}
