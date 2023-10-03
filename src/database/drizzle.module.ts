import { Module } from '@nestjs/common';
import { drizzle } from 'drizzle-orm/node-postgres';
import { PG_CONNECTION } from '@/common/constants/pg.constants';
import { ConfigService } from '@nestjs/config';
import * as schema from './schema';
import { Pool } from 'pg';

@Module({
  providers: [
    {
      provide: PG_CONNECTION,
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const connectionString = configService.get<'string'>('DATABASE_URL');
        const pool = new Pool({
          connectionString,
          ssl: true,
        });
        return drizzle(pool, { schema });
      },
    },
  ],
  exports: [PG_CONNECTION],
})
export class DrizzleModule {}
