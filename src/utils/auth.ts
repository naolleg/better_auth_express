import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { PrismaClient } from "@prisma/client";
import { github } from "better-auth/social-providers"

const prisma = new PrismaClient();

const githubClientId = process.env.GITHUB_CLIENT_ID;
const githubClientSecret = process.env.GITHUB_CLIENT_SECRET;

if (!githubClientId || !githubClientSecret) {
  throw new Error("GITHUB_CLIENT_ID or GITHUB_CLIENT_SECRET environment variable is not set");
}

export const auth = betterAuth({
  advanced: {
    crossSubDomainCookies: {
        enabled: true,
        domain: "http://localhost:7777/api/auth'" // Optional. Defaults to the base url domain
    }
},
  database: prismaAdapter(prisma, {
    provider: "mysql", // or "mysql", "postgresql", ...etc
  }),
  emailAndPassword: {
    enabled: true,
    async sendVerificationEmail(email, url) {
      // Send a verification email to the user
      console.log(`Sending verification email to ${email}`);
    },
    async sendResetPassword(url, user) {
      // Send a password reset email to the user
      console.log(`Sending password reset email to ${user.email}`);
    },
  },

  
});