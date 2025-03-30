import {
  ActionFunction,
  json,
  LoaderFunction,
  redirect,
} from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { cn } from "~/lib/utils";
import { authenticator, FORM_STRATEGY } from "~/services/auth.server";
import { sessionStorage } from "~/utils/session.server";

export const loader: LoaderFunction = async ({ request }) => {
  // Already logged in? Redirect to dashboard
  let session = await sessionStorage.getSession(request.headers.get("cookie"));
  if (session.has("user")) return redirect("/app");

  return null;
};

export const action: ActionFunction = async ({ request }) => {
  try {
    const user = await authenticator.authenticate(FORM_STRATEGY, request);

    const session = await sessionStorage.getSession(
      request.headers.get("cookie")
    );
    session.set("user", user);

    return redirect("/app", {
      headers: {
        "Set-Cookie": await sessionStorage.commitSession(session),
      },
    });
  } catch (error) {
    console.log(" constaction:ActionFunction= ~ error ===========>", error);
    return json(
      { error: error instanceof Error ? error.message : String(error) },
      { status: 401 }
    );
  }
};

export default function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const actionData = useActionData<typeof action>();

  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-background p-6 md:p-10">
      <div className="w-full max-w-sm">
        <div className={cn("flex flex-col gap-6", className)} {...props}>
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-xl">Login</CardTitle>
              {/* <CardDescription></CardDescription> */}
            </CardHeader>
            <CardContent>
              <Form method="post">
                <div className="flex flex-col gap-6">
                  <div className="flex flex-col gap-6">
                    <div className="grid gap-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="email@example.com"
                        required
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="password">Password</Label>
                      <Input
                        id="password"
                        name="password"
                        type="password"
                        required
                      />
                    </div>
                    <Button type="submit" className="w-full">
                      Login
                    </Button>
                  </div>
                </div>
              </Form>
              {actionData?.error && (
                <p className="text-red-500 mt-2">{actionData.error}</p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
