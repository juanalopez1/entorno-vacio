import { FastifyInstance } from "fastify";
import { userRepo } from "../../storage/users.repository.js";

const userRoutes = async (fastify: FastifyInstance, _opts: any) => {
  fastify.post(
    "",
    {
      schema: {
        body: {
          type: "object",
          properties: {
            name: { type: "string", minLength: 1, maxLength: 20 },
            surname: { type: "string", minLength: 1, maxLength: 20 },
            city: { type: "string", minLength: 2, maxLength: 20 },
            locality: { type: "string", minLength: 2 },
          },
          required: ["name", "surname", "locality"],
        },
        response: {
          201: {
            type: "object",
            properties: {
              user: {
                type: "object",
                properties: {
                  name: { type: "string", minLength: 1, maxLength: 20 },
                  surname: { type: "string", minLength: 1, maxLength: 20 },
                  city: { type: "string", minLength: 2, maxLength: 20 },
                  locality: { type: "string", minLength: 2 },
                },
                required: ["name", "surname", "city", "locality"],
              },
              message: { type: "string" },
            },
            required: ["user", "message"],
          },
          400: {
            type: "object",
            properties: {
              message: { type: "string" },
            },
            required: ["message"],
          },
        },
        summary: "Registrar usuario.",
        description: "Ruta para registrar un nuevo usuario.",
        tags: ["Usuarios"],
      },
    },
    async (request, reply) => {
      const { name, surname, city, locality } = request.body as {
        name: string;
        surname: string;
        city: string;
        locality: string;
      };

      const occupied = userRepo.findByName(name);
      if (occupied) {
        return reply
          .status(400)
          .send({ message: "Ese nombre ya esta en uso. Ingresa otro." });
      }

      const user = userRepo.create({ name, surname, city, locality });
      return reply
        .status(201)
        .send({ user: user, message: "Usuario creado exitosamente." });
    }
  );

  fastify.get(
    "/",
    {
      schema: {
        response: {
          200: {
            type: "array",
            items: {
              type: "object",
              properties: {
                name: { type: "string", minLength: 1, maxLength: 20 },
                surname: { type: "string", minLength: 1, maxLength: 20 },
                city: { type: "string", minLength: 2, maxLength: 20 },
                locality: { type: "string", minLength: 2, },
              },
              required: ["name", "surname", "city", "locality"],
            },
          },
        },
        summary: "Obtener todos los usuarios.",
        description: "Ruta para obtener usuarios.",
        tags: ["Usuarios"],
      },
    },
    async (request, reply) => {
      const users = await userRepo.findAll();
      return reply.status(200).send(users);
    }
  );
};

export default userRoutes;
