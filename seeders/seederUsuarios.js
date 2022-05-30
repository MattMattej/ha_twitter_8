const { faker } = require("@faker-js/faker");
const User = require("../models/User");
const Tweet = require("../models/Tweet");
faker.locale = "es";
module.exports = async () => {
  await User.deleteMany({});
  const random = faker.datatype.number(34);
  const random2 = faker.datatype.number(34);
  const followed = await User.aggregate([{ $sample: { size: random } }])
  const followss = await User.aggregate([{ $sample: { size: random2 } }])
  for (let i = 0; i < 20; i++) {
    const name = faker.name.firstName();
    const lastname = faker.name.lastName();
    const users = new User({
      firstname: name,
      lastname: lastname,
      username: faker.internet.userName(name),
      email: faker.internet.email(name),
      password: "1234",
      description: faker.lorem.sentence(3),
      followedCount: faker.datatype.number(random),
      followedBy: followed, //Quiero seleccionar #random de un random de todos los ids de usuarios que creamos. Ya importados
      followsCount: faker.datatype.number(random2),
      follows: followss,
    });
    await users.save();
  }
  console.log("fake data added");
};
