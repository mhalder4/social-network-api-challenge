const { Schema, model } = require('mongoose');
const reactionSchema = require("./Reaction");

// Schema to create user model
const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minLength: 1,
      maxLength: 280
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (date) => {
        return date.toLocaleString();
      }
    },
    username: {
      type: String,
      required: true
    },
    reactions: [reactionSchema]

  },
  {
    toJSON: {
      getters: true,
      virtuals: true
    },
  }
);

thoughtSchema.virtual('reactionCount').get(function () {
  return this.reactions.length;
});


const Thought = model('thought', thoughtSchema);

module.exports = Thought;