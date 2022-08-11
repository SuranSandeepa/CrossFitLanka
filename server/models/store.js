const { Schema, model } = require("mongoose");

const StoreSchema = new Schema({
  itemCode: {
    type: String,
    required: true,
  },
  itemName: {
    type: String,
    required: true,
  },
  itemPrice: {
    type: Number,
    required: true,
  },
  itemQuantity: {
    type: Number,
    required: true,
  },

  // ,
  // itemImage: {
  //     type: String,
  //     required: true
  // }
});

const StoreItem = model("Store", StoreSchema);

module.exports = StoreItem;
