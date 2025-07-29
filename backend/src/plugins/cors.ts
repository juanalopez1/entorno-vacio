import fp from 'fastify-plugin';
import cors, { FastifyCorsOptions } from '@fastify/cors';

export default fp<FastifyCorsOptions>(async (fastify) => {
  await fastify.register(cors, {
    origin: true, 
    credentials: true, 
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    exposedHeaders: ['Content-Length', 'X-Kuma-Revision'],
  });

  console.log('Registré CORS');
});