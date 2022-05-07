import { INestApplication, Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

function enableOpenApiSupport(app: INestApplication, apiPrefix: string) {
	const openApiConfig = new DocumentBuilder()
    .setTitle('API')
    .setDescription('OpenAPI documentation for NestJS boilerplate')
    .setVersion('1.0')
    .addTag('Boilerplate')
    .addBearerAuth()
    .build();

	const openApiDocument = SwaggerModule.createDocument(app, openApiConfig);

	SwaggerModule.setup(`${apiPrefix}/api-docs`, app, openApiDocument);
  }

async function bootstrap() {
	const logger = new Logger('Main');
  const apiPrefix = 'v1';
	const app = await NestFactory.create(AppModule);

	app.setGlobalPrefix(apiPrefix);
	app.enableCors();

	const configService = app.get(ConfigService);

	const env = configService.get('NODE_ENV');

	if (env && env === 'PRODUCTION') {
		logger.log('OpenAPI support disabled for PRODUCTION environment');
	} else {
		// Enable OpenAPI
		enableOpenApiSupport(app, apiPrefix);
		logger.log(`Enabled OpenAPI support. SwaggerUI available at ${apiPrefix}/api-docs`);
	}

	// Enable Validation
	app.useGlobalPipes(new ValidationPipe());

  const httpPort = configService.get('PORT');

	await app.listen(httpPort);
}
bootstrap();
