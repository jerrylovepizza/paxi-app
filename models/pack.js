const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const packSchema = new Schema({
  title: { type: String, required: true },
  from: { type: String, required: true },
  to: { type: String, required: true },
  size: { type: String, required: true },
  weight: { type: String, required: true },
  receiver: { type: String, required: true },
  fee: { type: String, required: true },
  image: { type: String },
  description: { type: String },
  userId: { type: String },
  carrierId: { type: String },

  isPicked: { type: Boolean, default: false },
  isDelivered: { type: Boolean, default: false },
  date: { type: Date, default: Date.now },
});

const Pack = mongoose.model("Pack", packSchema);

module.exports = Pack;
