import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
const githubClientId = process.env.GITHUB_CLIENT_ID;
const githubClientSecret = process.env.GITHUB_CLIENT_SECRET;
if (!githubClientId || !githubClientSecret) {
    throw new Error("GITHUB_CLIENT_ID or GITHUB_CLIENT_SECRET environment variable is not set");
}
export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "mysql", // or "mysql", "postgresql", ...etc
    }),
    emailAndPassword: {
        enabled: true
    },
    socialProviders: {
        github: {
            clientId: githubClientId,
            clientSecret: githubClientSecret,
        }
    },
});
