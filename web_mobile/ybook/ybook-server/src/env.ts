import { config } from "dotenv";
import { z } from "zod";
config();

export const formatErrors = (
  errors: z.ZodFormattedError<Map<string, string>, string>
) =>
  Object.entries(errors)
    .map(([name, value]) => {
      if (value && "_errors" in value)
        return `${name}: ${value._errors.join(", ")}\n`;
    })
    .filter(Boolean);

const schema = z.object({
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
  PORT: z.string().regex(/^\d+$/).transform(Number).default("3001"),
  COGNITO_CLIENT_ID: z.string().min(1),
  COGNITO_USERPOOL_ID: z.string().min(1),
  DATABASE_URL: z.string().url(),
});

const _env = schema.safeParse(process.env);

if (!_env.success) {
  console.error(
    "❌ Invalid environment variables:\n",
    ...formatErrors(_env.error.format())
  );
  throw new Error("Invalid environment variables");
}

export const env = _env.data;
