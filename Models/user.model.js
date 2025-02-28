import mongoose from "mongoose";


// User schema
const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,  // Required and uniue
  },
  phoneNumber: {
    type: Number,
  },
  password: {
    type: String,
    required: true, // must requires
  },
  role: {
    type: String,
    enum: ["Client", "Freelancer"],
    required : true  // required
  },
  profile: {
    picture: { type: String },
    bio: { type: String },
    skills: [{ type: String }],
  },
  projects: [
    {
      type: mongoose.Schema.Types.ObjectId,
    },
  ],
},{timestamps:true});


export const User = mongoose.model('User',userSchema);