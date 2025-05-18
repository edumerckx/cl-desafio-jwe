import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';

console.log("loading drizzle config...", process.env.DATABASE_URL!);

export default defineConfig({
  out: './drizzle',
  schema: './src/db/schemas/index.ts',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
