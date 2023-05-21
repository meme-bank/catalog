import { z } from 'zod';
import { procedure, router } from '../trpc';

export const appRouter = router({
    findPosts: procedure
        .input(z.object({
            republic: z.string().toLowerCase().nullable(),
            content: z.string().toLowerCase().nullable()
        }))
        .query(({ ctx, input }) => {
            return ctx.prisma.post.findMany({
                where: input.republic ?
                    { republic: input.republic }
                    : input.content ?
                    { content: input.content }
                    : {}
            })
        }),
    addPost: procedure
        .input(z.object({
            republic: z.string().toLowerCase().nullable(),
            content: z.string().toLowerCase(),
            url: z.string().url()
        }))
        .mutation(({ ctx, input }) => {
            return ctx.prisma.post.create({
                data: {
                    content: input.content,
                    link: input.url,
                    republic: input.republic || "union"
                }
            })
        })
});

export type AppRouter = typeof appRouter;