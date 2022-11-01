const { Thought, User } = require("../models");

const thoughtController = {
  // get all thoughts
  getAllThoughts(req, res) {
    Thought.find({})
      .select('-__v')
      .then(dbthoughtData => res.json(dbthoughtData))
      .catch(err => {
          console.log(err);
          res.status(400).json(err);
      });
  },
  // get a single thought by id
  getThoughtById({ params }, res) {
    Thought.findOne({ _id: params.thoughtId })
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
  createThought({ params, body }, res) {
    Thought.create(body)
    .then(dbThoughtData => {
        User.findOneAndUpdate(
            { _id: body.userId },
            { $push: { thoughts: dbThoughtData._id } },
            { new: true }
        )
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No user with this ID is found.' });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.json(err));
    })
    .catch(err => res.status(400).json(err));
  },
  // update a thought by it's id
  updateThought({ params, body }, res) {
    Thought.findOneAndUpdate({ _id: params.thoughtId }, body, { new: true })
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
