const connection = require('../config/connection');
const { User, Thought } = require('../models');
const { users, thoughts } = require('./data');

connection.on('error', (err) => err);

connection.once('open', async () => {
  console.log('connected');
  // Delete the collections if they exist
  let userCheck = await connection.db.listCollections({ name: 'users' }).toArray();

  if (userCheck.length) {
    await connection.dropCollection('users');
  }

  let thoughtCheck = await connection.db.listCollections({ name: 'thoughts' }).toArray();

  if (thoughtCheck.length) {
    await connection.dropCollection('thoughts');
  }

  const newThoughts = await Thought.collection.insertMany(thoughts);

  // Adds the thought ID associated with the user using the username
  const usersArr = users;
  usersArr.forEach(user => {
    thoughts.forEach(thought => {
      if (user.username === thought.username) user.thoughts.push(thought._id);
    })
  })

  const newUsers = await User.collection.insertMany(usersArr);

  console.info('Seeding complete!');
  process.exit(0);
});