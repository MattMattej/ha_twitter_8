const likeForm = document.getElementById("favTweet");
const getTweetId = document.getElementById("getTweetId");
likeForm.addEventListener("submit", async function (e) {
	e.preventDefault();
	console.log("button was clicked");

	const response = await fetch(`/favTweet/${getTweetId.value}`, {
		method: "POST",
	});
});
