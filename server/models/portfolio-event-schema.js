import mongoose from "mongoose";

const portfolioSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    date: {
      type: String, // Example: "June 2025"
      required: true,
    },

    eventType: {
      type: String,
      required: true,
      enum: [
        "Birthday",
        "Beach & Pool",
        "Brand Launch",
        "Music Night",
        "Custom",
        "Wedding",
        "Corporate",
        "Festival",
        "Other",
      ],
    },

    location: {
      type: String,
      required: true,
      trim: true,
    },

    shortSummary: {
      type: String,
      required: true,
    },

    fullDescription: {
      type: String,
      required: true,
    },

    coverImageUrl: {
      type: String,
      required: true,
    },

    galleryImages: [
      {
        type: String,
      },
    ],

    reviewText: {
      type: String,
      default: "",
    },

    isFeatured: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Portfolio", portfolioSchema);
