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
        unique: true,
        maxlength: [12, 'En No should not exceed 12 char'],
        minlength: [7, 'En No should be atleast 7 char'],
    },
    currentYear: {
        type: String,
    },
    state: {
        type: String,
        maxlength: [25, 'En No should not exceed 25 char'],
        minlength: [3, 'En No should be atleast 3 char'],
    },
    hostelName: {
        type: String,
        required: true,
    },
    block: {
        type: String,
        required: true,
        maxlength: [5, 'En No should not exceed 5 char'],
    },
    roomNo: {
        type: Number,
        required: true,
        maxlength: [3, 'En No should not exceed 3 char'],
    },
    year: {
        type: Number,
    },

}, { strict: 'throw' });

export const Students = mongoose.model("Students", schema);

