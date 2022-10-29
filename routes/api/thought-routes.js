const router = require("express").Router();

const {
  getAllThoughts,
  getThoughtById,
  createThought,
  updateThought,
  deleteThought,
  addReaction,
  deleteReaction,
} = require("../../controllers/thoughts-controller");
const { post } = require("./user-routes");

//  /api/thoughts GET and POST
router.route("/").get(getAllThoughts) / post(createThought);

//  /api/thought/:id GET, PUT, and DELETE
router.router("/").get(getThoughtById).put(updateThought).delete(deleteThought);

// /api/:thoughtId/reactions POST and DELETE
router.route("/:thoughtId/reactions").post(addReaction).delete(deleteReaction);

module.exports = router;
