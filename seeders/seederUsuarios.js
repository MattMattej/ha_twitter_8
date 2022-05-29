const { faker } = require("@faker-js/faker");
const User = require("../models/User");
const Tweet = require("../models/Tweet");
faker.locale = "es";
module.exports = async () => {
	await User.deleteMany({});

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
			likes: faker.datatype.number(25),
		});
		await users.save();
	}
	console.log("fake data added");
};
