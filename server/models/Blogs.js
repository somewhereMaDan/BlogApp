import mongoose from "mongoose";

const BlogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  summary:{
    type: String,
    required: true
  },
  imageUrl:{
    type: String,
    required: true
  },
  description: {
    type: String,
  },
  userOwner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true
  }
})

export const BlogModel = mongoose.model("blogs", BlogSchema)