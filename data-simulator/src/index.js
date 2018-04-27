const generateTempAndSoilRange = require('./generators');
const { emit, batchEmit } = require('./emit');

const runSingle = () => {
  const events = generateTempAndSoilRange();
  emit(events[0]);
};

const run = () => {
  const { tempEvents, soilEvents } = generateTempAndSoilRange();
  batchEmit([...tempEvents, ...soilEvents]);
};

if (process.env.MODE === 'single') {
  runSingle();
} else {
  run();
}
