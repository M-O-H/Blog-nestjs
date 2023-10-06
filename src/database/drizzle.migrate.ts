import { drizzle } from 'drizzle-orm/node-postgres';
import { migrate } from 'drizzle-orm/node-postgres/migrator';
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});
const db = drizzle(pool);

const migration = async () => {
  console.log('Migrating...');
  await migrate(db, { migrationsFolder: 'drizzle' });
  console.log('Migrate complete!');
  process.exit(0);
};

migration().catch((err) => {
  console.log(err);
  process.exit(0);
});
