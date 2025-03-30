import type { User } from "@prisma/client";
import { redirect } from "@remix-run/node";
import { compare, hash } from "bcryptjs";
import { Authenticator } from "remix-auth";
import { FormStrategy } from "remix-auth-form";
import invariant from "tiny-invariant";
import { prisma } from "~/utils/prisma.server";
import { getSession } from "~/utils/session.server";

async function hashPassword(password: string) {
  const hashedPassword = await hash(password, 10);
  console.log("Hashed password:", hashedPassword);
}

export const FORM_STRATEGY = "user-pass";

const findUser = async (email: string, password: string) => {
  const user = await prisma.user.findUnique({
    where: { email: email },
  });

  if (!user) throw new Error("Invalid email");

  const isValid = await compare(password, user.password);

  if (!isValid) throw new Error("Invalid password");

  return user;
};

export let authenticator = new Authenticator<User>();

// Tell the Authenticator to use the form strategy
authenticator.use(
  new FormStrategy(async ({ form }) => {
    const email = form.get("email");
    const password = form.get("password");

    invariant(typeof email === "string", "email must be a string");
    invariant(email.length > 0, "email must not be empty");
    invariant(typeof password === "string", "password must be a string");
    invariant(password.length > 0, "password must not be empty");

    const user = await findUser(email, password);

    return user;
  }),
  FORM_STRATEGY
);

// authenticated routes
export async function requireUserSession(request: Request) {
  const session = await getSession(request.headers.get("Cookie"));
  const user = session.get("user");

  if (!user) {
    throw redirect("/login"); // or wherever your login route is
  }

  return user;
}
