import { z, zodUndefinedModel } from "../../schema";
import { protectedProcedure, router } from "../../trpc";
import { generatePath } from "../../utils/path-generator";

const TAGS = ["Authentication"];
const getPath = generatePath("/authentication");

const userSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  emailVerified: z.boolean(),
  image: z.string().nullable(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

const sessionSchema = z.object({
  id: z.string(),
  expiresAt: z.date(),
  token: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  ipAddress: z.string().nullable(),
  userAgent: z.string().nullable(),
  userId: z.string(),
});

export const sessionRouter = router({
  getSession: protectedProcedure
    .meta({ openapi: { method: "GET", path: getPath("/session"), tags: TAGS } })
    .input(zodUndefinedModel)
    .output(z.object({ user: userSchema, session: sessionSchema }))
    .query(async ({ ctx }) => {
      return {
        user: ctx.user,
        session: ctx.session,
      };
    }),
});
