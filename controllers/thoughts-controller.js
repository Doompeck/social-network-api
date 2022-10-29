const { Thought, User } = require("../models");

const thoughtController = {
  // get all thoughts
  getAllThoughts(req, res) {
    Thought.find({})
      .populate({
        path: "reactions",
        select: "-__v",
      })
      .populate({
        path: "thoughts",
        select: "-__v",
      })
      .select("-__v")
      .then((dbThoughtData) => res.json(dbthoughtData))
      .catch((err) => {
        console.log(err);
        res.status(400), json(err);
      });
  },
  // get a single thought by id
  getThoughtById({ params }, res) {
    Thought.findOne({ _id: params._id })
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          res.status(404).json({ message: "No thought with this ID is found." });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },
  // create a thought for a user
  createThought({ body }, res) {
    Thought.create(body)
      .then((thoughtData) => {
        return User.findOneAndUpdate(
          { _id: body.userId },
          { $push: { thoughts: thoughtData._id } },
          { new: true },
        );
      })
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: "No user with this ID is found." });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) =>  res.status(400).json(err));
  },
  // update a thought by it's id
  updateThought({ params, body }, res) {
    Thought.findOneAndUpdate({ _id: params.id }, body, { new: true })
    .then((dbThoughtData) => {
      if (!dbThoughtData) {
        res.status(404).json({ message: "No thought with this ID is found." });
        return;
      }
      res.json(dbThoughtData);
    })
    .catch((err) =>  res.status(400).json(err));
  },
  // delete a thought by it's id
  deleteThought() {},
  // add a reaction to a thought
  addReaction() {},
  // delete a reaction from a thought
  deleteReaction() {},
};

module.exports = thoughtController;
