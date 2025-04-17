// import 'dotenv/config'; // Loads .env variables

export default {
  schema: './utils/db/schema.ts',
  out: './drizzle',
  dialect: 'postgresql',
  dbCredentials: {
    url : process.env.DATABASE_URL,
    connectionString: process.env.DATABASE_URL
  },
};
