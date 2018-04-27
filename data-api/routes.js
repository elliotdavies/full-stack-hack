const { ObjectId } = require("mongodb");

async function routes(fastify, options) {
  const database = fastify.mongo.db("iot");
  const analysisCollection = database.collection("analysis");
  const rawCollection = database.collection("raw");

  fastify.get("/raw/:start/:end", async (request, reply) => {
    const { start, end } = request.params;

    const result = await rawCollection.find({
      timestamp: {
        $gte: new Date(start),
        $lt: new Date(end)
      }
    });

    const data = await result.toArray();

    return data;
  });

  fastify.get("/average", async (request, reply) => {
    const { start, end } = request.params;

    const result = await analysisCollection
      .find()
      .sort({ _id: 1 })
      .limit(1);

    const data = await result.toArray();

    return data;
  });
}

module.exports = routes;
