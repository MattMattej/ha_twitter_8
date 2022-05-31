const button = document.getElementById("favTweet");
button.addEventListener("click", function (e) {
  e.preventDefault();
  console.log("button was clicked");

  const tweetId = e.dataset.tweetid;
  fetch(`/favTweet/${tweetId}$`, { method: "POST" })
    .then(function (response) {
      if (response.ok) {
        console.log("click was recorded");
        return tweetId;
      }
      throw new Error("Request failed.");
    })
    .catch(function (error) {
      console.log(error);
    });
});
