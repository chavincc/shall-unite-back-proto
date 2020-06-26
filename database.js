const Mongoose = require("mongoose");

const { UserSchema, MessageSchema } = require("./models");

const DATABASE_URL = process.env.DATABASE_URL;

Mongoose.connect(DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
Mongoose.set("useCreateIndex", true);
Mongoose.set("useNewUrlParser", true);
Mongoose.set("useFindAndModify", false);
Mongoose.set("useUnifiedTopology", true);

module.exports = {
  User: Mongoose.model("User", UserSchema),
  Message: Mongoose.model("Message", MessageSchema),
};
