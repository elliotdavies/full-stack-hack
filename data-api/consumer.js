const Kafka = require("node-rdkafka");

module.exports = () => {
  const consumer = new Kafka.KafkaConsumer(
    {
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
      consumer.subscribe(["iotDataTest"]);
      consumer.consume((e, m) => {
        console.log({ e, m });
      });
    })
    .on("data", data => {
      // Output the actual message contents
      console.log({ data });
      console.log(data.value.toString());
    });
};
