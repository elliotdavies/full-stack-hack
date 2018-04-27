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

// Generate a 'name' event
const generateName = () => faker.name.findName();

// Generate an event of the given category
const generate = category => {
  const makeEvent = event(category);

  switch (category) {
    case 'name':
      return makeEvent(generateName());
      break;
    default:
      console.error('Bad category', category);
  }
};

module.exports = generate;
