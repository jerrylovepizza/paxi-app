const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  phone: { type: String },
  address: { type: String },
  dl: { type: String },
  portrait: { type: String },
  date: { type: Date, default: Date.now },
  pack: [{ type: Schema.Types.ObjectId, ref: "Pack" }],
  carrier: [{ type: Schema.Types.ObjectId, ref: "Pack" }],
  message: [{ type: Schema.Types.ObjectId, ref: "Message" }],
});

const User = mongoose.model("User", userSchema);

module.exports = User;

/////////////////////////////////////////////////////////////
