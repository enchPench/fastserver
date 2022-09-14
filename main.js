import fastify from "fastify";
import mongodb from "@fastify/mongodb";
import fastifyView from "@fastify/view";
import handlebars from "handlebars";
import mongoose from "mongoose";
import noteRoutes from "./routes/noteRoutes.js";

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

noteRoutes(server);

server.get("/users", function (req, reply) {
  // Or this.mongo.client.db('mydb').collection('users')
  //const users = this.mongo.db.collection("users1");
  // if the id is an ObjectId format, you need to create a new ObjectId
  //   const id = this.mongo.ObjectId(req.params.id);
  //   users.findOne({ id }, (err, user) => {
  //     if (err) {
  //       reply.send(err);
  //       return;
  //     }
  //reply.send(users);
  //});
  reply.view("/views/layouts/main.hbs", { text: "text" });
});

server.listen({ port: 3000 }, (err) => {
  if (err) throw err;
});
