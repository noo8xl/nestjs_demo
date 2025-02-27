import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { INestApplication, UnauthorizedException, UseGuards } from '@nestjs/common'
import * as cors from 'cors'
import { CORS_OPTIONS } from './config/corsConfig'
// import {Request, Response, NextFunction} from 'express'

const PORT: number = Number(process.env.PORT) || 6108


async function bootstrap(): Promise<void> {
  const app: INestApplication = await NestFactory.create(AppModule)
  // app.setGlobalPrefix('api')
	app.enableCors({
		allowedHeaders: CORS_OPTIONS.allowedHeaders,
		origin: 'http://localhost:3000',
		methods: CORS_OPTIONS.methods,
		credentials: true,
		preflightContinue: false,
	})
	app.use(cors(CORS_OPTIONS))
  await app.listen(PORT)
}

bootstrap()
