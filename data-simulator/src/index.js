const generate = require('./generators');
const emit = require('./emit');

const run = () => {
  const nameEvent = generate('name');
  emit(nameEvent);
};

run();
