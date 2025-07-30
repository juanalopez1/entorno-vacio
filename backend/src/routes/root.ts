import { FastifyPluginAsync } from "fastify";
import { WebSocket } from "@fastify/websocket";

const root: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.register(async function () {
    fastify.route({
      method: "GET",
      url: "/",
      handler: async (request, reply) => {
        return { root: true };
      },
      wsHandler: (socket: WebSocket, request) => {
        socket.send("bienvenido cliente al server de fastify");
        fastify.websocketServer.clients.forEach((c:any) => {
          c.send(
            "cantidad de clientes: " + fastify.websocketServer.clients.size
          );
        });
      },
    });
  });
};

export default root;