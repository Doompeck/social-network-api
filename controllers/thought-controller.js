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
    .then(({ _id }) => {
        return User.findOneAndUpdate(
            { _id: params.userId },
            { $push: { thoughts: _id } },
            { new: true }
        );
    })
    .then(dbThoughtData => {
        if (!dbThoughtData) {
            res.status(404).json({ message: 'Incorrect thought data.' });
            return;
        }
        res.json(dbThoughtData);
    })
    .catch(err => res.json(err));
  },
  // update a thought by it's id
  updateThought({ params, body }, res) {
    Thought.findByIdAndUpdate({ _id: params.thoughtId }, body, { new: true })
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'No user with this ID is found.' });
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => res.json(err));
  },
  // delete a thought by it's id
  deleteThought() {},
  // add a reaction to a thought
  addReaction() {},
  // delete a reaction from a thought
  deleteReaction() {},
};

module.exports = thoughtController;
