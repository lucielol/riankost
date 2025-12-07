import { initTRPC } from "@trpc/server";
import type { Context } from "./context";
import SuperJSON from "superjson";
import { ZodError } from "zod";

const t = initTRPC.context<Context>().create({
  transformer: SuperJSON,
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError:
          error.cause instanceof ZodError ? error.cause.flatten() : null,
      },
    };
  },
});

export const router = t.router;
export const publicProcedure = t.procedure;
export const protectedProcedure = t.procedure.use(({ ctx, next }) => {
  if (!ctx.session || !ctx.session.user) {
    throw new Error("UNAUTHORIZED");
  }
  return next({
    ctx: {
      ...ctx,
      // infers the `session` as non-nullable
      session: {
        ...ctx.session,
        user: ctx.session.user,
      },
    },
  });
});
