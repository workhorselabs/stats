import { redirect } from "@remix-run/node";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { cn } from "~/lib/utils";

// docs
// https://remix.run/resources/remix-auth
// https://github.com/sergiodxa/remix-auth-form
export async function action({ request }: { request: Request }) {
  const formData = await request.formData();

  // "user-pass" might be another option, test later, use "form" for now
  // const user = await authenticator.authenticate("user-pass", request);
  // const user = await authenticator.authenticate("form", request);

  return redirect("/dashboard");
}

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-background p-6 md:p-10">
      <div className="w-full max-w-sm">{children}</div>
    </div>
  );
}

export default function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  return (
    <Layout>
      <div className={cn("flex flex-col gap-6", className)} {...props}>
        <form action="/login" method="post">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="email@example.com"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" required />
              </div>
              <Button type="submit" className="w-full">
                Login
              </Button>
            </div>
          </div>
        </form>
      </div>
    </Layout>
  );
}
