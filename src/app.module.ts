import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config/dist'; 
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { entities } from './utils/typeorm';

@Module({
	imports: [
		ConfigModule.forRoot({ envFilePath: '.env.development' }),
		TypeOrmModule.forRoot({
			type: 'mysql',
			host: process.env.MYSQL_DB_HOST,
			port: parseInt(process.env.MY_SQL_DB_PORT),
			username: process.env.MY_SQL_USERNAME,
			password: process.env.MY_SQL_PASSWORD,
			database: process.env.MY_SQL_NAME,
			synchronize: true,
			entities,
		}),
		AuthModule,
		UserModule,
	],
	controllers: [],
	providers: [],
})

export class AppModule {}
