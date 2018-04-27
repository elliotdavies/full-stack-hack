const faker = require('faker');

// Generate a 'name' event
const generateName = () => faker.name.findName();

// Mapping of categories to generators
const generators = {
  name: generateName
};

module.exports = category => generators[category]();
