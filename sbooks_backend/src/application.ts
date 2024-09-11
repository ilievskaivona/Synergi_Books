import fastify from "fastify";
import apiRouter from "./routers/api.router";
import { env } from "./env";
import { loggerOpt } from "./helpers/app.helper";
import { checkAuthHeader, defaultHandler, addResponsePayload } from "./handlers";
import cors from '@fastify/cors'
export default class Application {
  async init() {
    try {
      const application = fastify({ logger: loggerOpt() });

      for (const [prefix, routes] of Object.entries(apiRouter)) {
        application.register(routes, { prefix });
      }

      application.addHook("preValidation", checkAuthHeader);
      application.addHook("onRoute", defaultHandler);
      application.addHook("onSend", addResponsePayload);
      application.register(cors, {
        origin: "http://localhost:3000", // Change this to a specific origin or list of origins
      });
      await application.listen({
        host: env.host,
        port: env.port,
      });
    } catch {
      process.exit(1);
    }
  }
}
