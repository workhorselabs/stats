import { json, type MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { LandingLayout } from "~/components/landing-layout";

export const meta: MetaFunction = () => {
  return [
    { title: "Workhose Running" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export const loader = async () => {
  // const users = await query('SELECT id, email, "createdAt" FROM "User"');

  const users = [
    {
      id: 1,
      email: "test@test.com",
      createdAt: "2021-01-01",
    },
    {
      id: 1,
      email: "test@test.com",
      createdAt: "2021-01-01",
    },
    {
      id: 1,
      email: "test@test.com",
      createdAt: "2021-01-01",
    },
    {
      id: 1,
      email: "test@test.com",
      createdAt: "2021-01-01",
    },
  ];
  return json({ users });
};

export default function Index() {
  const data = useLoaderData<{
    users: {
      id: number;
      email: string;
      createdAt: string;
    }[];
  }>();

  return (
    <LandingLayout>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {data.users.map((user) => (
          <div
            key={user.id}
            className="rounded-lg border bg-card text-card-foreground shadow-sm"
          >
            <div className="p-6 space-y-2">
              <h3 className="text-2xl font-semibold leading-none tracking-tight">
                {user.email}
              </h3>
              <div className="text-sm text-muted-foreground">
                Joined {new Date(user.createdAt).toLocaleDateString()}
              </div>
            </div>
          </div>
        ))}
      </div>
    </LandingLayout>
  );
}
