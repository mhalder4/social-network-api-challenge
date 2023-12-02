const connection = require('../config/connection');
const { User, Thought } = require('../models');
const { users, thoughts } = require('./data');

connection.on('error', (err) => err);

connection.once('open', async () => {
  console.log('connected');
  // Delete the collections if they exist
  let userCheck = await connection.db.listCollections({ name: 'users' }).toArray();
  // console.log(userCheck);
  if (userCheck.length) {
    await connection.dropCollection('users');
  }

  let thoughtCheck = await connection.db.listCollections({ name: 'thoughts' }).toArray();
  // console.log(thoughtCheck);
  if (thoughtCheck.length) {
    await connection.dropCollection('thoughts');
  }

  const newThoughts = await Thought.collection.insertMany(thoughts);

  console.log(newThoughts);

  const usersArr = users;
  usersArr.forEach(user => {
    thoughts.forEach(thought => {
      if (user.username === thought.username) user.thoughts.push(thought._id);
    })
  })

  console.log(usersArr);


  const newUsers = await User.collection.insertMany(usersArr);







  // console.log(newUsers);

  // const newUsersIds = [];

  // for (var i = 0; i < Object.keys(newUsers.insertedIds).length; i++) {
  //   newUsersIds.push(newUsers.insertedIds[`${i}`])
  // }
  // // console.log(newUsersIds);

  // usersArr.forEach((item) => {
  //   // console.log(item._id);
  //   // let friends = [];
  //   newUsersIds.forEach((id) => {
  //     if (id !== item._id) {
  //       // friends.push(id);
  //       item.friends.push(id);
  //     }
  //   })
  //   // item.friends = friends;
  // })

  // console.log(usersArr);

  // usersArr.forEach(async (item) => {
  //   console.log("Updating");
  //   console.log(item._id);
  //   console.log(item.friends);

  //   const finalUsers = await User.collection.update({ _id: item._id }, { $push: { friends: item.friends[0] } }, { new: true });

  //   console.log(finalUsers);
  // })



  // const finalUsers = await User.collection.updateMany(usersArr);





  // const newDepts = await Department.collection.insertMany(departments);


  // await Course.collection.insertMany(courses);




  // // Log out the seed data to indicate what should appear in the database
  // console.table(students);
  // console.table(departments);
  // console.table(courses);

  console.info('Seeding complete!');
  process.exit(0);
});