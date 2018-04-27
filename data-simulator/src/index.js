const generate = require('./generators');
const emit = require('./emit');

const run = () => {
  emit(generate('name'));
  console.log('----');
  emit(generate('temp'));
};

run();
