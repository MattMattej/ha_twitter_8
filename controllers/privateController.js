const Tweet = require("../models/Tweet");
const User = require("../models/User");
const mongoose = require("mongoose");

module.exports = {
  renderNewTweet: async (req, res) => {
    res.render("newTweet");
  },
  newTweet: async (req, res) => {
    if (req.user) {
      const unTweet = await new Tweet({
        content: req.body.content,
        author: mongoose.Types.ObjectId(req.user._id),
        email: req.user.email,
        likes: 0,
      });
      await unTweet.save();
      res.json(unTweet);
    } else {
      res.redirect("/login");
    }
  },
  deleteTweet: async (req, res) => {
    await Tweet.findOneAndDelete({ _id: req.params.id });
    res.redirect("/");
  },
  logout: (req, res) => {
    req.logout((err) => {
      if (err) return next(err);
    });
    res.redirect("/");
  },
  favTweet: async (req, res) => {
    //Me traigo el tuit que quiero chequear si el usuario likeo o no.
    let tweetCheck = await Tweet.findOne({ _id: req.body.id }).populate(
      "author"
    );

    //Me sirve para saber si el usuario está o no en la lista de likers. 0 no likea, otro si.
    let hasUser = tweetCheck.favoritedBy.indexOf(req.user._id);

    //Si likeo, entonces lo voy a sacar del listado de array (pide dislike).
    if (hasUser >= 0) {
      return await Tweet.findByIdAndUpdate(
        { id: req.params.id },
        {
          $pull: {
            favoritedBy: mongoose.Types.ObjectId(req.user._id),
          },
          $inc: {
            favoriteCount: -1,
          },
        },
        { new: true }
      );
    } else {
      return await Tweet.findByIdAndUpdate(
        { id: req.params.id },
        {
          $push: {
            favoritedBy: mongoose.Types.ObjectId(req.user._id),
          },
          $inc: {
            favoriteCount: 1,
          },
        },
        { new: true }
      );
    }
  },
  favUser: async (req, res) => {
    //Importante para lo que sigue: usuario A viene de req.user._id, usuario B viene de req.params.id

    //Me traigo el user que quiero chequear si el usuario A followeó o no a B. Comparo con usuario A y B (ambos tienen followedBy y follows)
    let userCheck = await User.findOne({ _id: req.params.id });

    //Me sirve para saber si el usuario está o no en la lista de follows. 0 si A no sigue a B, otro número si A sigue a B
    let hasUser = userCheck.followedBy.indexOf(req.user._id);

    //Si A le hizo follow a B y aprieto, entonces lo voy a sacar del listado de array de seguidores de B (pide unfollow).
    if (hasUser >= 0) {
      //Acá sacamos de la lista de followdBy de B al usuario A
      await User.findByIdAndUpdate(
        { id: req.params.id },
        {
          $pull: {
            followedBy: mongoose.Types.ObjectId(req.user._id),
          },
          $inc: {
            followedCount: -1,
          },
        },
        { new: true }
      );
      //Acá sacamos de la lista de follows de A al usuario B
      await User.findByIdAndUpdate(
        { id: req.user._id },
        {
          $pull: {
            follows: mongoose.Types.ObjectId(req.params.id),
          },
          $inc: {
            followedCount: -1,
          },
        },
        { new: true }
      );
    } else {
      //Acá sumamos en la lista de followdBy de B al usuario A
      await Tweet.findByIdAndUpdate(
        { id: req.params.id },
        {
          $push: {
            followedBy: mongoose.Types.ObjectId(req.user._id),
          },
          $inc: {
            followedCount: 1,
          },
        },
        { new: true }
      );
      //Acá agregamos en la lista de follows de A al usuario B
      await Tweet.findByIdAndUpdate(
        { id: req.user._id },
        {
          $push: {
            follows: mongoose.Types.ObjectId(req.params.id),
          },
          $inc: {
            followedCount: 1,
          },
        },
        { new: true }
      );
    }
  },
};
