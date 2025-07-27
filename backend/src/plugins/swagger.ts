import { FastifyInstance, FastifyPluginOptions } from "fastify";
import fp from "fastify-plugin";
import swaggerPlugin from "@fastify/swagger";
import swaggerUI from "@fastify/swagger-ui";

async function swagger(
  fastify: FastifyInstance,
  _opts: FastifyPluginOptions
): Promise<void> {
  await fastify.register(swaggerPlugin, {
    openapi: {
      info: {
        title: "Parcial 1 Juana",
        description: ":)",
        version: "1.0.0",
      },
      //   servers: [
      //     {
      //       url: "/backend",
      //       description: "Proxy Nginx con prefijo /backend",
      //     },
      //   ],
      components: {
        securitySchemes: {
          bearerAuth: {
            type: "http",
            scheme: "bearer",
            bearerFormat: "JWT",
          },
        },
      },
      security: [{ bearerAuth: [] }],
      tags: [
        {
          name: "Usuarios",
          description: "Rutas relacionadas a usuarios",
        },
        {
          name: "Localidades",
          description: "Rutas relacionadas a localidades",
        },
      ],
    },
  });

  await fastify.register(swaggerUI, {
    routePrefix: "/docs",
    uiConfig: { docExpansion: "list" },
    theme: {
      title: "Parcial 1 Juana",
    },
  });
}

export default fp(swagger);
