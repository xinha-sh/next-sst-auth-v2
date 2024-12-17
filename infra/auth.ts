import { rds } from "./database";
import { GoogleClientId } from "./secrets";
import { vpc } from "./vpc";

export const auth = new sst.aws.Auth("Auth", {
	authorizer: {
		link: [rds, GoogleClientId],
		permissions: [
			{
				actions: ["ses:SendEmail"],
				resources: ["*"],
			},
		],
		handler: "./packages/functions/src/auth.handler",
		environment: {
			IS_LOCAL: $dev.toString(),
		},
		vpc,
	},
	forceUpgrade: "v2",
});
