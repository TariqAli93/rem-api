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
});

const envVariables = {
    NODE_ENV: process.env.NODE_ENV || "development",
    TZ: process.env.TZ || "Asia/Kolkata",
    PORT: Number(process.env.PORT) || 3000,
    SERVER_DOMAIN: process.env.SERVER_DOMAIN,
    DATABASE_URL: process.env.DATABASE_URL || "mysql://root:toor@187.33.150.194:3306/alnakheel",
    JWT_SECRET: process.env.JWT_SECRET || "your_jwt_secret",
    JWT_ACCESS_TOKEN_EXPIRES_IN: process.env.JWT_ACCESS_TOKEN_EXPIRES_IN || "25000",
    JWT_REFRESH_TOKEN_EXPIRES_IN: process.env.JWT_REFRESH_TOKEN_EXPIRES_IN || "100000",
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
