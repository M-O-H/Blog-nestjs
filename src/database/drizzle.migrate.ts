import { drizzle } from 'drizzle-orm/node-postgres';
import { migrate } from 'drizzle-orm/node-postgres/migrator';
import { Pool } from 'pg';

const pool = new Pool({
  connectionString:
    'postgres://postgres:postgres@localhost:5432/blogpost?sllmode=false',
});
const db = drizzle(pool);

const migration = async () => {
  console.log('Migrating...');
  try {
    await migrate(db, { migrationsFolder: 'drizzle' });
  } catch (error) {
    console.log(error);
  }
  console.log('Migrate complete!');
  process.exit(0);
};

migration().catch((err) => {
  console.log(err);
  process.exit(0);
});
