import fp from "fastify-plugin";
import jwt, { FastifyJWTOptions } from "@fastify/jwt";
import { FastifyReply, FastifyRequest } from "fastify";

const jwtOptions: FastifyJWTOptions = {
  // secret: process.env.FASTIFY_SECRET || "", //El or es porque no puede ser undefined
  secret: 'loqueespaunaespauna',
};

export default fp<FastifyJWTOptions>(async (fastify) => {
  //Recordar que string '' es falsy.
  if (!jwtOptions.secret)
    throw new Error("Falta asignar la clave secreta.");
  fastify.register(jwt, jwtOptions);

  fastify.decorate(
    "authenticate",
    async function (request: FastifyRequest, _reply: FastifyReply) {
      await request.jwtVerify();
    }
  );

//   fastify.decorate(
//     "authenticateSelf",
//     async function (
//       request: FastifyRequest & {
//         params: { id: User["user_id"] };
//       },
//       _reply: FastifyReply
//     ) {
//       const payload = (await request.jwtVerify()) as {
//         user_id: number;
//         is_admin: boolean;
//         name: string;
//       };

//       if (request.params.id != payload.user_id) {
//         throw new Error("No eres tú.");
//       }
//     }
//   );

  fastify.decorate(
    "authenticateAdmin",
    async function (request: FastifyRequest, _reply: FastifyReply) {
      const payload = (await request.jwtVerify()) as {
        user_id: number;
        is_admin: boolean;
        name: string;
      };

      if (!payload.is_admin) {
        throw new Error(
          "No eres administrador, no tienes dichos privilegios."
        );
      }
    }
  );
});

declare module "fastify" {
  export interface FastifyInstance {
    authenticate(request: FastifyRequest, reply: FastifyReply): Promise<void>;
    authenticateSelf(request: FastifyRequest, reply: FastifyReply): Promise<void>;
    authenticateAdmin(request: FastifyRequest, reply: FastifyReply): Promise<void>;
  }
}
