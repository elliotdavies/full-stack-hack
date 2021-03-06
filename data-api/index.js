const fastify = require("fastify")();
const cors = require("cors");
const launchConsumer = require("./consumer");

fastify.use(cors());
fastify.register(require("./db"), {
  url: "mongodb+srv://chris:chris@fullstackhackiot-qwiku.mongodb.net"
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
