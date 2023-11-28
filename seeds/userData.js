const { User } = require('../models');

const userData = [
  {
    username: 'Xandromus',
    password: 'password'
  },
  {
    username: 'Lernantino',
    password: 'password'
  }
];

const seedUser = () => User.bulkCreate(userData);

module.exports = seedUser;