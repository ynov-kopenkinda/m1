import { protecetedProcedure, router } from "../trpc";

export const exampleRouter = router({
  hello: protecetedProcedure.query(({ ctx }) => {
    return {
      greeting: `Hello ${ctx.session.email}`,
    };
  }),
});
