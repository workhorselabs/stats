import type { LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";
import { AppSidebar } from "~/components/app-sidebar";
import { SiteHeader } from "~/components/site-header";
import { SidebarInset, SidebarProvider } from "~/components/ui/sidebar";
import { requireUserSession } from "~/services/auth.server";

export async function loader({ request }: LoaderFunctionArgs) {
  // const session = await getSession(request.headers.get("cookie"));
  // console.log(" loader ~ session ===========>", session);
  // const user = session.get("user");

  // if (!user) return redirect("/login");

  const user = await requireUserSession(request);

  return json({ user });
}

export default function Layout() {
  const { user } = useLoaderData<typeof loader>();

  return (
    <SidebarProvider>
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <Outlet />
      </SidebarInset>
    </SidebarProvider>
  );
}
