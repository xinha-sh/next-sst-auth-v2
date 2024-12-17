import { vpc } from "./vpc";

export const rds = new sst.aws.Postgres("DB", {
	vpc,
	dev: {
		username: "postgres",
		password: "",
		database: "sst_auth_v2_local",
		host: "localhost",
		port: 5432,
	},
	version: "17.2",
});
