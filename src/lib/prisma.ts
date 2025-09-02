import { PrismaClient } from "../generated/prisma";

declare global {
  var prisma: PrismaClient | undefined;
}

export const client =
  globalThis.prisma ||
  new PrismaClient({
    // Optimize for Neon connection pooling
    datasources: {
      db: {
        url: process.env.DATABASE_URL,
      },
    },
    // Log connection issues for debugging
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") globalThis.prisma = client;
