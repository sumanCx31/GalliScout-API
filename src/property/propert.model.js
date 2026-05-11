const mongoose = require("mongoose");

const propertySchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    location: { type: String, required: true },
    images: [{ type: String }],
    nearby_amenities: [{ type: String }],
    status: { type: String, enum: ["vacant", "occupied"], default: "vacant" },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
}, { timestamps: true });

module.exports = mongoose.model("Property", propertySchema);