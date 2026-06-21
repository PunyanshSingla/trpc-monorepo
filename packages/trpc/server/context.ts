import { auth } from "@repo/auth";
import { fromNodeHeaders } from "better-auth/node";

export async function createContext({ req }: { req: { headers: Record<string, string | string[] | undefined> } }) {
  const session = await auth.api.getSession({
    headers: fromNodeHeaders(req.headers),
  });
  return {
    user: session?.user ?? null,
    session: session?.session ?? null,
  };
}

export type Context = Awaited<ReturnType<typeof createContext>>;
