const { ObjectId, ISODate } = require("mongodb");

async function routes(fastify, options) {
  const database = fastify.mongo.db("iot");
  const collection = database.collection("analysis");

  fastify.get("/records/:start/:end", async (request, reply) => {
    const { start, end } = request.params;

    const result = await collection.find({
      timestamp: {
        $gte: new Date(start),
        $lt: new Date(end)
      }
    });

    const data = await result.toArray();

    return data;
  });
}

module.exports = routes;
