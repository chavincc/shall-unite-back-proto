const Mongoose = require("mongoose");

const DATABASE_URL = process.env.DATABASE_URL;

Mongoose.connect(DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
Mongoose.set("useCreateIndex", true);

const UserSchema = new Mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      lowercase: true,
      trim: true,
    },
  },
  { collection: "user" }
);

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
  User: Mongoose.model("User", UserSchema),
  Message: Mongoose.model("Message", MessageSchema),
};
