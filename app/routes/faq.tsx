import { Outlet } from "@remix-run/react";
import { LandingLayout } from "~/components/landing-layout";

export default function Layout() {
  return (
    <LandingLayout>
      <Outlet />
    </LandingLayout>
  );
}
