import mongoose from "mongoose";
const productSchema = new mongoose.Schema({
    title: String,
    description: String,
    price: Number,
    category: String,
    stock: Number,
    status: Boolean,
    thumbnails: Array,
});
export default mongoose.model("Product", productSchema);