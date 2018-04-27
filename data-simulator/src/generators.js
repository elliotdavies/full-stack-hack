const faker = require('faker');
const uuid = require('uuid');

const {
  startOfToday,
  endOfToday,
  differenceInMinutes,
  addMinutes
} = require('date-fns');

const { last } = require('ramda');

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

// Generate temperature data
// const generateTemp = () => {
//   const min = 5; // °C
//   const max = 25;
//
//   return faker.random.number({ min, max });
// };

// Generate a temperature event every five minutes for 24 hours
const generateTempRange = () => {
  const start = startOfToday();
  const end = endOfToday();
  const initialTemp = 5; // °C
  const interval = 5; // minutes

  const numEvents = Math.round(differenceInMinutes(end, start) / interval);
  const range = Array(numEvents).fill(null);

  const initialEvent = event('temp')({ time: start, temp: initialTemp });

  return range.reduce(
    events => {
      const { payload } = last(events);
      const { temp, time } = payload;

      const newEvent = event('temp')({
        temp: temp + 0.1,
        time: addMinutes(time, 5)
      });

      return [...events, newEvent];
    },
    [initialEvent]
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
