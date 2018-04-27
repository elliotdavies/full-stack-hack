const fastify = require("fastify")();
const launchConsumer = require("./consumer");

fastify.register(require("./db"), {
  url: ""
});
fastify.register(require("./routes"));

fastify.listen(3000, err => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }

  console.log("Listening on port 3000");

  launchConsumer();
});
