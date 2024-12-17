import { accountsTable } from "@next-sst-auth-v2/core/core/auth/accounts.schema";
import { db } from "@next-sst-auth-v2/core/core/db";
import { authorizer } from "@openauthjs/openauth";
import { CodeAdapter } from "@openauthjs/openauth/adapter/code";
import { GoogleOidcAdapter } from "@openauthjs/openauth/adapter/google";
import { handle } from "hono/aws-lambda";
import { Resource } from "sst";
import * as v from "valibot";
import { subjects } from "./utils/subjects";

export const googleValueSchema = v.object({
  iss: v.literal("https://accounts.google.com"),
  azp: v.string(),
  aud: v.string(),
  sub: v.string(),
  email: v.pipe(v.string(), v.email()),
  email_verified: v.boolean(),
  nonce: v.string(),
  nbf: v.number(),
  iat: v.number(),
  exp: v.number(),
  jti: v.string(),
  name: v.optional(v.string()),
  picture: v.optional(v.string()),
});

const app = authorizer({
  subjects,
  providers: {
    code: CodeAdapter({
      async request(req, state, form, error) {
        const headers = req.headers;
        const referrer = headers.get("Referer");
        const url = new URL(referrer || "");
        url.pathname = `/auth/${state.type}`;
        if (error) url.searchParams.set("error", error.type);
        const action = form?.get("action");
        if (action === "request") {
          const email = form?.get("email") as string | null;
          url.searchParams.append("email", email || "");
        }
        return new Response(null, {
          status: 302,
          headers: {
            Location: url.toString(),
          },
        });
      },
      async sendCode(claims, code) {
        if (process.env.IS_LOCAL === "true") {
          console.log("code", code);
        }
      },
      length: 6,
    }),
    google: GoogleOidcAdapter({
      clientID: Resource.GoogleClientId.value,
      scopes: ["email"],
    }),
  },
  allow: async (input) => {
    const hostname = new URL(input.redirectURI).hostname;
    if (hostname.startsWith("localhost")) return true;
    return false;
  },
  async success(ctx, value) {
    if (value.provider === "google") {
      const payload = v.parse(googleValueSchema, value.id);
      if (!payload.email) throw new Error("No email found");

      let account = await db.query.accountsTable.findFirst({
        where: (account, { eq }) => eq(account.email, payload.email),
      });

      if (!account?.id) {
        const result = await db
          .insert(accountsTable)
          .values({
            name: payload.name,
            email: payload.email,
            isVerified: payload.email_verified,
            image: payload.picture,
          })
          .returning();
        account = result[0];
      }
      if (account) {
        return ctx.subject("user", {
          accountId: account.id,
        });
      }
    }
    if (value.provider === "code") {
      const email = value.claims.email;
      let account = await db.query.accountsTable.findFirst({
        where: (account, { eq }) => eq(account.email, email),
      });

      if (!account?.id) {
        const result = await db
          .insert(accountsTable)
          .values({
            email,
            isVerified: true,
          })
          .returning();
        account = result[0];
      }
      if (account) {
        return ctx.subject("user", {
          accountId: account.id,
        });
      }
    }

    throw new Error("Invalid provider");
  },
});

export const handler = handle(app);
