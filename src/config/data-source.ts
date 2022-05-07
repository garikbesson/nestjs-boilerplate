import { DataSource } from 'typeorm';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import * as dotenv from 'dotenv';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');

dotenv.config({
	path: path.join(__dirname, '../../.env'),
});
console.log('process.env.DB_HOST', process.env.DB_HOST);
export const ormConfig: PostgresConnectionOptions = {
	type: 'postgres',
	name: 'default',
	schema: 'public',
	host: process.env.DB_HOST,
	port: +(process.env.DB_PORT as string),
	database: process.env.DB_NAME,
	username: process.env.DB_USERNAME,
	password: process.env.DB_PASS,
	synchronize: false,
	migrationsRun: false,
	logging: true,
	logger: 'file',
	entities: [],
	migrations: [`${__dirname}/../migrations/**/*{.ts,.js}`],
	migrationsTransactionMode: 'each',
	// Use typeorm migration:generate -d <path_to_data_source>/datasource.ts <path_to_migrations_folder>/MigrationName.ts for migrations
	// ssl: false,
	// extra: {
	//   ssl: {
	//     rejectUnauthorized: false,
	//   },
	// },
};
const AppDataSource = new DataSource(ormConfig);

export default AppDataSource;
