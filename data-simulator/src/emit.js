const Kafka = require('node-rdkafka');
const { getTime } = require('date-fns');

const producer = new Kafka.Producer({
  'bootstrap.servers':
    'r0.cp63.us-east-1.aws.confluent.cloud:9092,r0.cp63.us-east-1.aws.confluent.cloud:9093,r0.cp63.us-east-1.aws.confluent.cloud:9094',
  'api.version.request': 'true',
  'broker.version.fallback': '0.10.0.0',
  'api.version.fallback.ms': '0',
  'sasl.mechanisms': 'PLAIN',
  'security.protocol': 'SASL_SSL',
  'ssl.ca.location': '/usr/local/etc/openssl/cert.pem',
  'sasl.username': 'A74DOVR4EICY2UNM',
  'sasl.password':
    '9s80729uT/IkIuhflMl6m7V4vfVlf6CF+LLT55oqR9xqyS7VzyKjVOkaYdmcCUCL'
});

producer.connect();

const getTopic = category => {
  switch (category) {
    case 'temp':
    default:
      return 'iotDataTest';
  }
};

// Emit an event to Kafka
const emit = event => {
  console.log(event);

  producer.on('ready', () => {
    try {
      producer.produce(
        getTopic(event.category), // Topic to send message to
        null, // Partition (optional)
        new Buffer(JSON.stringify(event)), // Message to send. Must be a buffer
        null // Key for keyed messages (optional)
        // getTime(event.payload.time) // Message timestamp (optional)
      );
    } catch (err) {
      console.error('Error sending message', err);
    }
  });

  // Any errors we encounter, including connection errors
  producer.on('event.error', err => {
    console.error('Error from producer:', err);
  });
};

// Emit an array of events
const batchEmit = events => events.forEach(emit);

module.exports = { emit, batchEmit };
