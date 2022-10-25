const { User } = require("../models");
const { populate } = require("../models/User");

const userController = {
  // get all the users
  getAllUsers(req, res) {},
  // get a single user by id
  getUserById(req, res) {},
  // create a user
  createUser(req, res) {},
  // update a user by id
  updateUser(req, res) {},
  //  delete a user by id
  deleteUser(req, res) {},
  // add a friend to a to a user
  addFriend(req, res) {},
  // remove a friend
  removeFriend(req, res) {},
};

module.exports = userController;
