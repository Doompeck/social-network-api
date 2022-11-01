const router = require("express").Router();

// bring in all required components
const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  removeFriend,
} = require("../../controllers/user-controller");

// /api/users GET and POST
router
  .route("/")
  .get(getAllUsers)
  .post(createUser);

// /api/users/:id GET, PUT, DELETE
router
  .route("/:id")
  .get(getUserById)
  .put(updateUser)
  .delete(deleteUser);

// /api/:id/friends/:friendsId ADD and DELETE
router
  .route("/:id/friends/:friendId")
  .post(addFriend)
  .delete(removeFriend);

module.exports = router;
