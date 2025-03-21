import { json, type MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { LandingLayout } from "~/components/landing-layout";
import { query } from "~/db.server";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export const loader = async () => {
  const result = await query("SELECT NOW()");

  return json({ now: result[0].now });
};

export default function Index() {
  const data = useLoaderData<{ now: string }>();

  return (
    <LandingLayout>
      <div>{data.now}</div>
    </LandingLayout>
  );
}
