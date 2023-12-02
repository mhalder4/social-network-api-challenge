const router = require("express").Router();
const { User, Thought } = require("../../models");

const Model = User;


// Get all records
router.get("/", async (req, res) => {
  try {
    const payload = await Model.find()
      .populate({ path: "thoughts" })
      .populate({ path: "friends" });
    res.status(200).json({ status: "success", payload });
  } catch (err) {
    res.status(500).json({ status: "error", payload: err.message });
  }
})

// Get one record by pk
router.get("/:id", async (req, res) => {
  try {
    const payload = await Model.findOne({ _id: req.params.id })
      .populate({ path: "thoughts" })
      .populate({ path: "friends" });

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

// Add a friend
router.post("/:userId/friends/:friendId", async (req, res) => {
  try {
    const payload = await Model.findOneAndUpdate({ _id: req.params.userId }, { $push: { friends: req.params.friendId } }, {
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
    const thoughtPayload = await Thought.deleteMany({ username: payload.username });
    res.status(200).json({ status: "success" });
  } catch (err) {
    res.status(500).json({ status: "error", payload: err.message });
  }

})


module.exports = router;