const faker = require('faker');
const uuid = require('uuid');

const {
  startOfToday,
  endOfToday,
  differenceInMinutes,
  addMinutes,
  isAfter,
  addHours
} = require('date-fns');

const { last, range, reduce } = require('ramda');

/**
  Event schema:

  {
    id: Uuid,
    category: 'name' | 'temp' | ...,
    payload: { ... }
  }

*/
const event = category => payload => ({
  uuid: uuid.v4(),
  category,
  payload
  // @TODO timestamp
});

// Generate a 'name' event (for testing)
const generateName = () => faker.name.findName();

// Generate a temperature based on the current temp and time
const generateTempFrom = ({ temp, time }) => {
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

  const initialEvent = makeEvent({ time: start, temp: initialTemp });

  return reduce(
    events => {
      const { payload } = last(events);
      return [...events, makeEvent(generateTempFrom(payload))];
    },
    [initialEvent],
    range(0, numEvents)
  );
};

// Generate an event of the given category
const generate = category => {
  const makeEvent = event(category);

  switch (category) {
    case 'name':
      return makeEvent(generateName());
    // case 'temp':
    //   return makeEvent(generateTemp());
    case 'tempRange':
      return generateTempRange();
    default:
      console.error('Bad category', category);
  }
};

module.exports = generate;
