const { Thought, User } = require('../models');

const thoughtController = {
// get all thoughts
getAllThoughts(req, res) {
    Thought.find({})
    .populate({
        path:"reactions",
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
        res.status(400),json(err);
    });
},
// get a single thought
getThoughtById({ params }, res) {
    Thought.findOne({ _id: params._id })
},
// create a thought for a user
createThought({ body }, res) {
   
},
// update a thought by it's id
updateThought() {
   
},
// delete a thought by it's id
deleteThought() {
   
},
// add a reaction to a thought
addReaction() {
   
},
// delete a reaction from a thought
deleteReaction() {
   
},
};

module.exports = thoughtController;