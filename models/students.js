import mongoose from "mongoose";

const schema = new mongoose.Schema({
    name: {
        type: String,
        requied: true,
    },
    branch: {
        type: String,
        requied: true,
    },
    enrollmentNo: {
        type: String,
        unique:true,
    },
    currentYear: {
        type: String,
    },
    state: {
        type: String,
    },
    hostelName: {
        type: String,
        required: true,
    },
    block: {
        type: Number,
        required: true,
    },
    roomNo: {
        type: Number,
        required: true,
    },
    year:{
        type:Number,
    },

},{ strict: 'throw' });

export const Students=mongoose.model("Students",schema);

