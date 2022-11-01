const router = require("express").Router();

const {
  getAllThoughts,
  getThoughtById,
  createThought,
  updateThought,
  deleteThought,
  addReaction,
  deleteReaction,
} = require("../../controllers/thought-controller");


//  /api/thoughts GET and POST
router
.route("/")
.get(getAllThoughts);

router
.route("/:userId")
.post(createThought);

//  /api/thought/:id GET, PUT, and DELETE
router
.route("/:thoughtId")
.get(getThoughtById)
.put(updateThought)
.delete(deleteThought);

// /api/:thoughtId/reactions POST and DELETE
router
.route("/:thoughtId/reactions")
.post(addReaction);

router
.route("/:thoughtId/reactions/:reactionId")
.delete(deleteReaction);

module.exports = router;
