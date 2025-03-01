import mongoose from "mongoose";
import { User } from "./user.model.js";
import { Bid } from "./bids.model.js";


// Client Project schema
const clientProjectSchema = new mongoose.Schema({
  clientProjectName: {
    type: String,
    required: true,
  },
  clientProjectDes: {
    type: String,
    required: true
  },
  clientSkill: [{  // Required skills from the freelancers
    type : String
  }],

  clientTime: {
    type: String,
    required: true
  },
  clientAmount: {
    type: Number,
    required: true
  },
  bid: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Bid"
    }
  ],
  users: [
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
  ],
  companyName: [
    {
        type: String,
    }
  ]
},{timestamps:true});


export const clientProject = mongoose.model('clientProject',clientProjectSchema);

