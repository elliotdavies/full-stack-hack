const generate = require('./generators');
const { emit, batchEmit } = require('./emit');

const runSingle = () => {
  const tempEvents = generate('tempRange');
  emit(tempEvents[0]);
};

const run = () => {
  const tempEvents = generate('tempRange');
  emit(tempEvents);
};

if (process.env.MODE === 'single') {
  runSingle();
} else {
  run();
}
