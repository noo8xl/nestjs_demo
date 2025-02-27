import * as cors from 'cors'

export const CORS_OPTIONS: cors.CorsOptions = {
  allowedHeaders: [
    'Origin',
    'X-Requested-With',
    'Content-Type',
    'Accept',
    'X-Access-Token',
    'Access-Control-Allow-Origin',
    'Access-Control-Allow-Credentials',
    'Authorization',
    'AccessKey'
  ],
  credentials: true,
  methods: 'GET,PUT,PATCH,POST,DELETE,OPTIONS',
  origin: '*',
  preflightContinue: true,
}