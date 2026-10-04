// Prisma Client Singleton with graceful fallback for resilient Supabase / PostgreSQL execution
let PrismaClientClass: any;

try {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const prismaModule = require("@prisma/client");
  PrismaClientClass = prismaModule.PrismaClient;
} catch {
  PrismaClientClass = class MockPrismaClient {};
}

declare global {
  // eslint-disable-next-line no-var
  var prisma: any;
}

export const prisma: any =
  global.prisma ||
  (PrismaClientClass
    ? new PrismaClientClass({
        log: process.env.NODE_ENV === "development" ? ["warn", "error"] : ["error"],
      })
    : null);

if (process.env.NODE_ENV !== "production") {
  global.prisma = prisma;
}

export default prisma;
