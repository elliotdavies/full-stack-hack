// Emit an event to Kafka, or wherever
const emit = event => {
  console.log(event);
};

// Emit an array of events
const batchEmit = events => events.forEach(emit);

module.exports = { emit, batchEmit };
