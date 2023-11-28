const { User } = require('../models');

const userData = [
  {
    username: 'Xandromus',
    email: 'xandromous@email.com',
    password: 'password'
  },
  {
    username: 'Lernantino',
    email: 'lernantino@email.com',
    password: 'password'
  }
];

const seedUser = () => User.bulkCreate(userData);

module.exports = seedUser;