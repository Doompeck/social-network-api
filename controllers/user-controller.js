const { User } = require("../models");

const userController = {
  // get all the users
  getAllUsers(req, res) {
    User.find({})
      .select("-__v")
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },
  // get a single user by id in the parameters
  getUserById({ params }, res) {
    User.findOne({ _id: params.id })
    .select("-__v")
      .populate("thoughts friends")
      .then((dbUserData) => {
        // If no user data found then return error...
        if (!dbUserData) {
          res.status(404).json({ message: "No user with this ID is found." });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },
  // create a user
  createUser({ body }, res) {
    User.create(body)
      .then(dbUserData => res.json(dbUserData))
      .catch((err) => res.status(400).json(err));
  },
  // update a user by id by parameter and the body
  updateUser({ params, body }, res) {
    User.findOneAndUpdate({ _id: params.id }, body, { new: true })
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: "No user with this ID is found." });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => res.status(400).json(err));
  },
  //  delete a user by id
  deleteUser(req, res) {
    User.findOneAndDelete({ _id: req.params.userId })
    .then((dbUserData) =>
      !dbUserData
        ? res.status(404).json({ message: "No user with this ID is found." })
        :
        Thought.deleteMany({ _id: { $in: dbUserData.thoughts } })
    )
    .then(() =>
      res.json({ message: "User and associated thoughts deleted!" })
    )
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
  },
  // add a friend to a to a user
  addFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $addToSet: { friends: req.params.friendId } },
      { runValidators: true, new: true }
    )
      .then((dbUserData) =>
        !dbUserData
          ? res.status(404).json({ message: "No user with this ID is found." })
          : res.json(dbUserData)
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  // remove a friend
  removeFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { friends: req.params.friendId } },
      { runValidators: true, new: true }
    )
      .then((dbUserData) =>
        !dbUserData
          ? res.status(404).json({ message: "No user with this ID is found." })
          : res.json(dbUserData)
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
};

module.exports = userController;
