import { FastifyInstance } from "fastify";

const localityRoutes = async (fastify: FastifyInstance, _opts: any) => {
  fastify.get(
    "/:nombre",
    {
      schema: {
        params: {
          type: "object",
          properties: {
            nombre: { type: "string" },
          },
          required: ["nombre"],
        },
        response: {
          200: {
            type: "array",
            items: {
              type: "object",
              properties: {
                name: { type: "string" },
              },
              required: ["name"],
            },
          },
        },
        summary: "Obtener todos los localidades.",
        description: "Ruta para obtener localidades de un departamento dado.",
        tags: ["Localidades"],
      },
    },
    async (request, reply) => {
      const { nombre } = request.params as { nombre: string };
      const localities = await fetch(
        `https://direcciones.ide.uy/api/v0/geocode/localidades?departamento=${nombre}`
      );

      let data = (await localities.json()) as {
        id: number;
        nombre: string;
        codigoPostal: number;
        alias: string;
      }[];

      const newArray = data.map((loc) => {
        return { name: loc.nombre };
      });

      return reply.status(200).send(newArray);
    }
  );
};

export default localityRoutes;
