const router = require("express").Router();
const { User, Thought } = require("../../models");

const Model = Thought;


// Get all records
router.get("/", async (req, res) => {
  try {
    const payload = await Model.find();
    res.status(200).json({ status: "success", payload });
  } catch (err) {
    res.status(500).json({ status: "error", payload: err.message });
  }
})

// Get one record by pk
router.get("/:id", async (req, res) => {
  try {
    const payload = await Model.findOne({ _id: req.params.id })

    // .select('-__v');
    res.status(200).json({ status: "success", payload });
  } catch (err) {
    res.status(500).json({ status: "error", payload: err.message });
  }
})

// Create a new record
router.post("/", async (req, res) => {
  try {
    const payload = await Model.create(req.body);
    res.status(200).json({ status: "success", payload });
  } catch (err) {
    res.status(500).json({ status: "error", payload: err.message });
  }
})

// Create a new reaction
router.post("/:thoughtId/reactions", async (req, res) => {
  try {
    const payload = await Model.findOneAndUpdate({ _id: req.params.thoughtId }, { $push: { reactions: req.body } }, {
      new: true,
      upsert: true
    });
    res.status(200).json({ status: "success", payload });
  } catch (err) {
    res.status(500).json({ status: "error", payload: err.message });
  }
})

// Update a new record
router.put("/:id", async (req, res) => {
  try {
    const payload = await Model.findOneAndUpdate({ _id: req.params.id }, req.body, {
      new: true,
      upsert: true
    });
    res.status(200).json({ status: "success", payload });
  } catch (err) {
    res.status(500).json({ status: "error", payload: err.message });
  }
})

// Delete a record
router.delete("/:id", async (req, res) => {
  try {
    const payload = await Model.findByIdAndDelete(req.params.id);
    res.status(200).json({ status: "success" });
  } catch (err) {
    res.status(500).json({ status: "error", payload: err.message });
  }

})

// Delete a reaction
router.delete("/:thoughtId/reactions/:reactionId", async (req, res) => {
  try {
    const payload = await Model.findOneAndUpdate(
      {
        _id: req.params.thoughtId
      }, {
      $pull: { reactions: { reactionId: req.params.reactionId } }
    }, {
      new: true
    });
    res.status(200).json({ status: "Delete success", payload });
  } catch (err) {
    res.status(500).json({ status: "error", payload: err.message });
  }
})


module.exports = router;