const Mongoose = require("mongoose");

const MessageSchema = new Mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },
    timeStamp: {
      type: Date,
      required: true,
    },
    from: {
      type: Mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    to: {
      type: Mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { collection: "message" }
);

module.exports = {
  MessageSchema,
};
