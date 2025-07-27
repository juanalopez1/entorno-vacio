import Fastify from 'fastify'
import app from './src/app.js'

//Opciones para el logger
const loggerOptions = {
  level: process.env.FASTIFY_LOG_LEVEL || 'trace',
  transport: {
      target: 'pino-pretty',
      options: {
        translateTime: 'SYS:standard',  //Usar el formato de fecha del sistema
        ignore: 'pid,hostname',
        colorize: true,
      },
    }
}

const server = Fastify({
  logger : loggerOptions,       // Las definidas arriba.
  ignoreTrailingSlash: true,    // No diferenciar entre /ruta y /ruta/
  bodyLimit: 1048576,           // Límite de tamaño del body en bytes (1MB)
  pluginTimeout: 10000,         // Timeout en ms para registro de plugins
  maxParamLength: 100,          // Longitud máxima (en caracteres) de parámetros en rutas
  disableRequestLogging: false, // Desactivar logs de requests
  caseSensitive: true,          // Las rutas son sensibles a mayúsculas/minúsculas
})

server.register(app)

const start = async () => {
  try {
    await server.listen({ port: 3000, host: '0.0.0.0' })
    
  } catch (err) {
    server.log.error(err)
    process.exit(1)
  }
}

start() 