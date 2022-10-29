const { User } = require("../models");
const { populate } = require("../models/User");

const userController = {
  // get all the users
  getAllUsers(req, res) {
    User.find({})
      .populate({
        path: "thoughts",
        select: "-__v",
      })
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
      .populate({
        path: "thoughts",
        select: "-__v",
      })
      .select("-__v")
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
      .then((dbUserData) => res.json(dbUserdata))
      .catch((err) => res.status(400).json(err));
  },
  // update a user by id by parameter and the body
  updateUser({ params, body }, res) {
    User.findOneAndUpdate({ _id: params.id }.body, { new: true })
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
  deleteUser(req, res) {},
  // add a friend to a to a user
  addFriend(req, res) {},
  // remove a friend
  removeFriend(req, res) {},
};

module.exports = userController;
