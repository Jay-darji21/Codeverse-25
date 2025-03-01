import mongoose from "mongoose";
import { User } from "./user.model.js";



// Project schema
const projectSchema = new mongoose.Schema({
  projectName: {
    type: String,
    required: true,
  },
  projectRole: {
    type: String,
    required: true,
  },
  projectUrl: {
    type: String,
    required: true,
  },
  githubUrl: {
    type: String,
    required: true,
  },
  projectPicture: {
    type: String, 
  },
  projectVideo: {
    type: String,
  },
  user: 
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
  ,
  projectDesc: {
    type: String,
    required: true
  },
  reviews: [
    {
        type: String,
    }
  ],
  bids : [
    {
      type : mongoose.Schema.Types.ObjectId,
      ref : 'Bid'
    }
  ]
},{timestamps:true});


export const Project = mongoose.model('Project',projectSchema);