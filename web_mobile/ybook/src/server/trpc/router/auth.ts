import { protecetedProcedure, router } from "../trpc";

export const authRouter = router({
  getSession: protecetedProcedure.query(async ({ ctx }) => {
    return ctx.session;
  }),
  createUser: protecetedProcedure.mutation(async ({ ctx }) => {
    return await ctx.prisma.user.upsert({
      where: {
        email: ctx.session.email,
      },
      create: {
        email: ctx.session.email,
        firstname: ctx.session.name,
        lastname: ctx.session.surname,
      },
      update: {
        email: ctx.session.email,
        firstname: ctx.session.name,
        lastname: ctx.session.surname,
      },
    });
  }),
});
