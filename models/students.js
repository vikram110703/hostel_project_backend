import mongoose from "mongoose";

const schema = new mongoose.Schema({
    name: {
        type: String,
        requied: true,
        maxlength: [50, 'Name should not exceed 50 char'],
    },
    branch: {
        type: String,
        requied: true,
    },
    enrollmentNo: {
        type: String,
        maxlength: [10, 'En No should not exceed 10 char'],
    },
    currentYear: {
        type: String,
    },
    state: {
        type: String,
        maxlength: [25, 'state  should not exceed 25 char'],
    },
    hostelName: {
        type: String,
        required: true,
    },
    block: {
        type: String,
        required: true,
        maxlength: [3, 'Block  should not exceed 3 char'],
    },
    roomNo: {
        type: Number,
        required: true,
        min:[1,"Min roomNo is 1"],
        max:[740,"Enter a valid Room no "],
    },
    year: {
        type: Number,
    },

}, { strict: 'throw' });

export const Students = mongoose.model("Students", schema);

