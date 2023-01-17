import { protecetedProcedure, router } from "../trpc";

export const authRouter = router({
  getSession: protecetedProcedure.query(async ({ ctx }) => {
    return ctx.session;
  }),
  createUser: protecetedProcedure.mutation(async ({ ctx }) => {
    return await ctx.prisma.user.create({
      data: {
        email: ctx.session.email,
        firstname: ctx.session.name,
        lastname: ctx.session.surname,
      },
    });
  }),
});
