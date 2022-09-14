// import fastify from "fastify";
// import mongodb from "@fastify/mongodb";
// import fastifyView from "@fastify/view";
// import handlebars from "handlebars";
// import mongoose from "mongoose";
// import noteRoutes from "./routes/noteRoutes.js";
// import contentRangeHook from "./hooks/contentRangeHook.js";
// import serverless from "serverless-http";
// import esMain from "es-main";
// let server = fastify({ logger: true });

// server.register(fastifyView, {
//   engine: {
//     handlebars,
//   },
// });

// try {
//   mongoose.connect(
//     "mongodb+srv://visitcaAdmin:0404098z@cluster0.1fxab.mongodb.net"
//   );
// } catch (e) {
//   console.error(e);
// }

// server.addHook("preHandler", contentRangeHook);

// noteRoutes(server);

// server.get("/users", function (req, reply) {
//   reply.view("/views/layouts/main.hbs", { text: "text" });
// });

// server.listen({ port: 3000 }, (err) => {
//   if (err) throw err;
// });

import fastify from "fastify";
import awsLambdaFastify from "aws-lambda-fastify";

const app = fastify();
app.route({
  method: "GET",
  url: "/api/",
  handler: async (request, reply) => reply.send({ data: "dummy GET" }),
});

app.route({
  method: "POST",
  url: "/api/",
  handler: async (request, reply) => reply.send({ data: "dummy POST" }),
});

const proxy = awsLambdaFastify(app);

// exports.handler = async function (event, context) {
// https://www.netlify.com/blog/2021/04/02/modern-faster-netlify-functions/
export async function handler(event, context) {
  let a = await proxy(event, context);
  console.log(a);
  return a;
}
