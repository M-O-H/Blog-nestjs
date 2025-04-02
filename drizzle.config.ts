import { ConfigService } from "@nestjs/config";
import { defineConfig } from "drizzle-kit";

const configService = new ConfigService();

export default defineConfig({
	dialect: "postgresql",
	dbCredentials: {
		url: `${configService.get<string>('DATABASE_URL')}`,
	}, schema: "./src/database/schema.ts",
});
