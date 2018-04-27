const Kafka = require("node-rdkafka");
const MongoClient = require("mongodb").MongoClient;

module.exports = async () => {
  const client = await MongoClient.connect(
    "mongodb+srv://chris:chris@fullstackhackiot-qwiku.mongodb.net"
  );
  const db = client.db("iot");
  const rawCollection = db.collection("raw");
  const analysisCollection = db.collection("analysis");

  const consumer = new Kafka.KafkaConsumer(
    {
      "group.id": "kafka",
      "bootstrap.servers":
        "r0.cp63.us-east-1.aws.confluent.cloud:9092,r0.cp63.us-east-1.aws.confluent.cloud:9093,r0.cp63.us-east-1.aws.confluent.cloud:9094",
      "api.version.request": "true",
      "broker.version.fallback": "0.10.0.0",
      "api.version.fallback.ms": "0",
      "sasl.mechanisms": "PLAIN",
      "security.protocol": "SASL_SSL",
      "ssl.ca.location": "/usr/local/etc/openssl/cert.pem",
      "sasl.username": "A74DOVR4EICY2UNM",
      "sasl.password":
        "9s80729uT/IkIuhflMl6m7V4vfVlf6CF+LLT55oqR9xqyS7VzyKjVOkaYdmcCUCL"
    },
    {}
  );

  consumer.connect();

  consumer
    .on("ready", () => {
      console.log("Ready to consume!");
      consumer.subscribe(["iotDataTest", "AVERAGES"]);
      consumer.consume();
    })
    .on("data", data => {
      console.log(data.topic);
      // Output the actual message contents
      const result = JSON.parse(data.value.toString());

      switch (data.topic) {
        case "iotDataTest":
          rawCollection.insertOne({
            ...result,
            timestamp: new Date(result.timestamp)
          });
          break;
        case "AVERAGES":
          analysisCollection.insertOne({
            ...result,
            timestamp: new Date(data.timestamp)
          });
          break;
      }
    });
};
