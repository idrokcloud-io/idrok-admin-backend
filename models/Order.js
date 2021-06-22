const mongoose = require("mongoose");
const { Schema } = mongoose;

const orderSchema = new Schema({
  current_user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
  },
  fullname: {
    type: String,
  },
  phone: {
    type: String,
  },
  region: {
    type: String,
  },
  district: {
    type: String,
  },
  address: {
    type: String,
  },
  zip_code: {
    type: String,
  },
  products: {
    type: Array,
    default: [],
  },
  status: {
    type: Number,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Order", orderSchema);
