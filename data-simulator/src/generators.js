const faker = require('faker');

const {
  startOfToday,
  endOfToday,
  differenceInMinutes,
  addMinutes,
  isAfter,
  addHours
} = require('date-fns');

const { last, range, reduce, scan } = require('ramda');

const sensorIds = {
  temp: ['t1', 't2', 't3', 't4', 't5'],
  soil: ['s1', 's2', 's3', 's4', 's5']
};

/**
  Event schema:

  {
    sensorId: Uuid,
    sensorType: 'temp' | 'soil',
    value: number,
    timestamp: Date
  }

*/
const event = sensorType => (value, timestamp) => ({
  sensorId: faker.random.arrayElement(sensorIds[sensorType]),
  sensorType,
  value,
  timestamp
});

// Generate a 'name' event (for testing)
const generateName = () => faker.name.findName();

// Generate a temperature based on the current temp and time
const generateTempFrom = (temp, time) => {
  const midnight = startOfToday();
  const isAfterHour = hour => isAfter(time, addHours(midnight, hour));

  let minVariance, maxVariance;
  if (isAfterHour(20)) {
    // Get much colder after sundown
    minVariance = 0.3;
    maxVariance = 0.05;
  } else if (isAfterHour(15)) {
    // Generally get colder after mid-afternoon
    minVariance = 0.2;
    maxVariance = 0.1;
  } else if (isAfterHour(12)) {
    // Generally get warmer after midday
    minVariance = 0.05;
    maxVariance = 0.2;
  } else if (isAfterHour(8)) {
    // Get much warmer after sunrise
    minVariance = 0.05;
    maxVariance = 0.3;
  } else {
    // Stay pretty much the same between midnight and sunrise
    minVariance = 0.05;
    maxVariance = 0.05;
  }

  const newTemp = faker.random.number({
    min: temp - minVariance,
    max: temp + maxVariance,
    precision: 0.01
  });

  return {
    temp: newTemp,
    time: addMinutes(time, 5)
  };
};

// Generate a temperature event every five minutes for 24 hours
const generateTempRange = () => {
  const start = startOfToday();
  const end = endOfToday();
  const initialTemp = 5; // °C
  const interval = 5; // minutes

  const numEvents = Math.round(differenceInMinutes(end, start) / interval);

  const makeEvent = event('temp');

  return scan(
    event => {
      const data = generateTempFrom(event.value, event.timestamp);
      return makeEvent(data.temp, data.time);
    },
    makeEvent(initialTemp, start),
    range(0, numEvents)
  );
};

// Generate an event of the given category
const generate = category => {
  const makeEvent = event(category);

  switch (category) {
    // case 'name':
    //   return makeEvent(generateName());
    // case 'temp':
    //   return makeEvent(generateTemp());
    case 'tempRange':
      return generateTempRange();
    default:
      console.error('Bad category', category);
  }
};

module.exports = generate;
