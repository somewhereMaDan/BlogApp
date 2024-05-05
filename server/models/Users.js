import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  TotalBlogs : [{type : mongoose.Schema.Types.ObjectId, ref : "blogs"}],
  SavedBlogs : [{type : mongoose.Schema.Types.ObjectId, ref : "blogs"}],
})

export const UserModel = mongoose.model("users", UserSchema);
