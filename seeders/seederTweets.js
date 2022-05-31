const { faker } = require("@faker-js/faker");
const Tweet = require("../models/Tweet");
const User = require("../models/User");
faker.locale = "es";

module.exports = async () => {
	await Tweet.deleteMany({});
	const random = faker.datatype.number(34);
	const favorited = await User.aggregate([{ $sample: { size: random } }]);
	for (let i = 0; i < 20; i++) {
		const tweet = await new Tweet({
			content: faker.lorem.paragraph(1),
			date: faker.date.past(1),
			author: User._id,
			favoriteCount: faker.datatype.number(random),
			favoritedBy: favorited, //Quiero seleccionar 1 de un random de todos los ids de usuarios que creamos. Ya importados
		});
		await tweet.save();
	}

	const tweets = await Tweet.find();
	tweets.forEach(async (tweet) => {
		const random = faker.datatype.number({ min: 4, max: 8 });
		const user = await User.findOne().skip(random);
		tweet.author = user._id;
		await tweet.save();
	});
	console.log("tweets addeed");
};
