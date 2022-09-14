import fastify from "fastify";
import mongodb from "@fastify/mongodb";
import fastifyView from "@fastify/view";
import handlebars from "handlebars";
import mongoose from "mongoose";
import noteRoutes from "./routes/noteRoutes.js";
import contentRangeHook from "./hooks/contentRangeHook.js";
import serverless from "serverless-http";
import esMain from "es-main";
let server = fastify({ logger: true });

server.register(fastifyView, {
  engine: {
    handlebars,
  },
});

try {
  mongoose.connect(
    "mongodb+srv://visitcaAdmin:0404098z@cluster0.1fxab.mongodb.net"
  );
} catch (e) {
  console.error(e);
}

server.addHook("preHandler", contentRangeHook);

noteRoutes(server);

server.get("/users", function (req, reply) {
  reply.view("/views/layouts/main.hbs", { text: "text" });
});

server.listen({ port: 3000 }, (err) => {
  if (err) throw err;
});
