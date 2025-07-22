import { config } from "dotenv";
import path from "path";
import { object, string, number } from "zod";

const pathName = path.resolve(process.cwd(), `.env`);

// Load environment variables from the specified file
config({ path: pathName });

const ConfigSchema = object({
    NODE_ENV: string(),
    TZ: string(),
    PORT: number(),
    SERVER_DOMAIN: string(),
    DATABASE_URL: string().url(),
    JWT_SECRET: string(),
    JWT_ACCESS_TOKEN_EXPIRES_IN: string(),
    JWT_REFRESH_TOKEN_EXPIRES_IN: string(),
    OTP_EXPIRY: number(),
    AES_ENCRYPTION_KEY: string().length(64),
});

const envVariables = {
    NODE_ENV: process.env.NODE_ENV,
    TZ: process.env.TZ || "Asia/Kolkata",
    PORT: Number(process.env.PORT),
    SERVER_DOMAIN: process.env.SERVER_DOMAIN,
    DATABASE_URL: process.env.DATABASE_URL,
    JWT_SECRET: process.env.JWT_SECRET,
    JWT_ACCESS_TOKEN_EXPIRES_IN: process.env.JWT_ACCESS_TOKEN_EXPIRES_IN,
    JWT_REFRESH_TOKEN_EXPIRES_IN: process.env.JWT_REFRESH_TOKEN_EXPIRES_IN,
    OTP_EXPIRY: Number(process.env.OTP_EXPIRY),
    AES_ENCRYPTION_KEY: process.env.AES_ENCRYPTION_KEY,
};

let Config;

try {
    Config = ConfigSchema.parse(envVariables);

    console.log("Environment variables loaded successfully:", process.env.OTP_EXPIRY);
} catch (error) {
    // Log and exit if validation fails
    console.error("Invalid environment variables:", error.errors);
    process.exit(1);
}

export { Config };
