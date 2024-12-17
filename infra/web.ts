import { auth } from "./auth";
import { rds } from "./database";
import { vpc } from "./vpc";

export const peppyhopWeb = new sst.aws.Nextjs("Web", {
  link: [
    auth,
    rds
  ],
  path: "packages/web",
  environment: {
    NEXT_PUBLIC_AUTH_URL: auth.url,
  },
  vpc
});