const mongoose = require('mongoose');
const { Schema } = mongoose;

const productSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true, default: 0 },
    quantity: { type: Number, required: true, default: 0 },
    image: { type: String, required: true },
    id1: { type: mongoose.Schema.Types.ObjectId, default: function() { return this._id; } },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Product', productSchema);
