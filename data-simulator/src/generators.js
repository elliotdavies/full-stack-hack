const faker = require('faker');
const uuid = require('uuid');

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
});

// Generate a 'name' event (for testing)
const generateName = () => faker.name.findName();

// Generate temperature data
const generateTemp = () => {
  const min = 5; // °C
  const max = 25;

  return faker.random.number({ min, max });
};

// Generate an event of the given category
const generate = category => {
  const makeEvent = event(category);

  switch (category) {
    case 'name':
      return makeEvent(generateName());
    case 'temp':
      return makeEvent(generateTemp());
    default:
      console.error('Bad category', category);
  }
};

module.exports = generate;
