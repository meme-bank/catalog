import { PrismaClient } from "@prisma/client";
import { inferAsyncReturnType } from "@trpc/server";
import { CreateNextContextOptions } from "@trpc/server/adapters/next";

export async function createContext(opts?: CreateNextContextOptions) {
    const prisma = new PrismaClient();

    return { prisma };
}

export type Context = inferAsyncReturnType<typeof createContext>;