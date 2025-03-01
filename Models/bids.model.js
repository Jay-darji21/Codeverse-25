import mongoose from "mongoose";


const bidSchema = new mongoose.Schema({
    proposal: {
        type: String,
        required: true
    },
    timeDuration: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    amount: {
        type: Number,
        required: true
    },
    projectId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project',
        required: true
    }
},{timestamps:true});

export const Bid = mongoose.model("Bid",bidSchema);