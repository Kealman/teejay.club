import cors from "@fastify/cors";
import { fastifyTRPCPlugin } from "@trpc/server/adapters/fastify";
import fastify from "fastify";

import { config } from "./config";

import { createContext } from "@/context";
import { appRouter } from "@/router";

const server = fastify({
  maxParamLength: 5000,
  logger: true,
});

server.addHook("preHandler", function (req, reply, next) {
  if (req.body) {
    req.log.info({ body: req.body }, "parsed body");
  }
  next();
});

server.register(cors);

server.register(fastifyTRPCPlugin, {
  prefix: "/trpc",
  trpcOptions: { router: appRouter, createContext },
});

(async () => {
  try {
    await server.listen({ port: +config.PORT });
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
})();
