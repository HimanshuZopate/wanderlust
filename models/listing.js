const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listingSchema = new Schema({
  title: { type: String, required: true },
  description: String,
  image: {
    filename: { type: String, default: "listingimage" },
    url: {
      type: String,
      default: "https://cdn.pixabay.com/photo/2023/03/06/13/58/logo-7833524_1280.png"
    }
  },
  price: Number,
  location: String,
  country: String,
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;
