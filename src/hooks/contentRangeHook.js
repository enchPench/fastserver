import Note from "../models/Note.js";

export default (request, reply, done) => {
  Note.count({}, (err, count) => {
    if (err) {
      console.error(err);
      reply.code(500).send("Error!");
    }
    reply.header("Content-Range", `notes 0-10}/${count}`);
    done();
  });
};
