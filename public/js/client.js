console.log("Client-side code running");

const button = document.getElementById("like");
button.addEventListener("click", function (e) {
  console.log("button was clicked");

  fetch("/favTweet", { method: "POST" })
    .then(function (response) {
      if (response.ok) {
        console.log("click was recorded");
        return;
      }
      throw new Error("Request failed.");
    })
    .catch(function (error) {
      console.log(error);
    });
});
