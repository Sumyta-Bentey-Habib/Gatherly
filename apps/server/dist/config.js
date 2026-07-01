import dotenv from "dotenv";
import { z } from "zod";
// Load environment variables from the .env file in the current working directory
dotenv.config();
const envSchema = z.object({
    PORT: z.coerce.number().default(3001),
    FIREBASE_PROJECT_ID: z.string().min(1),
    FIRESTORE_EMULATOR_HOST: z.string().optional(),
    BETTER_AUTH_SECRET: z.string().min(1),
    BETTER_AUTH_URL: z.string().url(),
    NEXT_PUBLIC_FRONTEND_URL: z.string().url(),
    IMGBB_API_KEY: z.string().min(1),
    NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
});
const parsedEnv = envSchema.safeParse(process.env);
if (!parsedEnv.success) {
    console.error("❌ Invalid environment variables:", parsedEnv.error.format());
    throw new Error("Invalid environment variables configuration");
}
export const config = parsedEnv.data;
