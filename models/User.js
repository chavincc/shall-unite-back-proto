const Mongoose = require("mongoose");

const UserSchema = new Mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      lowercase: true,
      trim: true,
    },
    isOnline: {
      type: Boolean,
      default: false,
      required: true,
    },
  },
  { collection: "user" }
);

module.exports = {
  UserSchema,
};
