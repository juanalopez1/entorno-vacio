import fp from 'fastify-plugin';
import cors, { FastifyCorsOptions } from '@fastify/cors';

export default fp<FastifyCorsOptions>(async (fastify) => {
  await fastify.register(cors, {
    origin: true, // permite todos los orígenes (equivale a '*', pero compatible con credenciales)
    credentials: true, // si necesitás enviar cookies, tokens, etc.
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    exposedHeaders: ['Content-Length', 'X-Kuma-Revision'],
  });

  console.log('Registré CORS');
});
