import mongoose, {Schema} from "mongoose"

const reactionSchema = new mongoose.Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const messageSchema = new mongoose.Schema(
  {
    chat: {
      type: Schema.Types.ObjectId,
      ref: "Chat",
    },
    sender: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    content: {
      type: String,
    },
    media: {
      type: String,
    },
    readBy: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    reactions: [reactionSchema],
  },
  { timestamps: true }
);

module.exports = {
  Message: mongoose.model("Message", messageSchema),
  Reaction: mongoose.model("Reaction", reactionSchema),
};
