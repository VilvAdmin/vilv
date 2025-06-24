import { type Config } from 'drizzle-kit';

import { env } from '~/env';

export default {
  schema: './src/server/db/schema.ts',
  out: './drizzle/migrations',
  dialect: 'postgresql',
  dbCredentials: {
    url: env.DATABASE_URL,
  },
  tablesFilter: ['vilv_*'],
} satisfies Config;
