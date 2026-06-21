import { router } from "../../trpc";
import { sessionRouter } from "./session";

export const authRouter = router({
  session: sessionRouter,
});
