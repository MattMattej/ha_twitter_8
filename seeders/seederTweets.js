const { faker } = require("@faker-js/faker");
const Tweet = require("../models/Tweet");
const User = require("../models/User");
faker.locale = "es";

module.exports = async () => {
	await Tweet.deleteMany({});
	for (let i = 0; i < 20; i++) {
		const tweet = await new Tweet({
			content: faker.lorem.paragraph(1),
			date: faker.date.past(1),
			author: User._id,
			likes: faker.datatype.number(34),
		});
		await tweet.save();
	}
	const user = await User.findOne();
	const tweets = await Tweet.find();
	tweets.forEach((tweet) => {
		tweet.author = user._id;
		tweet.save();
	});
	console.log("tweets addeed");
};
