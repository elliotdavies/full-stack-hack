const generate = require('./generators');
const { emit, batchEmit } = require('./emit');

const emitExamples = () => {
  console.log('Examples:');
  console.log('----');
  emit(generate('name'));
  console.log('\n');
  emit(generate('temp'));
};

const generateTemps = n =>
  Array(n)
    .fill(null)
    .map(() => generate('temp'));

const run = () => {
  emitExamples();

  console.log('\n');
  console.log('Temperature range:');
  console.log('----');

  const tempEvents = generateTemps(5);
  batchEmit(tempEvents);
};

run();
