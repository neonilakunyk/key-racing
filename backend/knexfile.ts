import { Knex } from 'knex';
import { knexSnakeCaseMappers } from 'objection';

import { env } from './src/env';

type ConfigPropType = Record<string, unknown>;

const DEFAULT_ENV_CONFIG: Knex.Config<ConfigPropType> = {
  client: env.db.client,
  connection: env.db.url,
  pool: {
    min: env.db.poolMin,
    max: env.db.poolMax,
  },
  migrations: {
    directory: './src/data/migrations',
    tableName: 'migrations',
  },
  debug: false,
  ...knexSnakeCaseMappers(),
};

export { DEFAULT_ENV_CONFIG as knexConfig };
