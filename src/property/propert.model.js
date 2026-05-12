const { string } = require("joi");
const mongoose = require("mongoose");

const propertySchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    
    location: {
      type: {
        type: String, 
        enum: ['Point'], 
        default: 'Point'
      },
      coordinates: {
        type: [Number], 
        required: true
      },
      formattedAddress: { type: String, required: true } 
    },

    images: [{ 
        publicId: String, 
        secureUrl: String 
    }],
    nearby_amenities: [String],
    status: { type: String, enum: ["vacant", "occupied"], default: "vacant" },
  },
  { timestamps: true }
);

propertySchema.index({ "location": "2dsphere" });

module.exports = mongoose.model("Property", propertySchema);