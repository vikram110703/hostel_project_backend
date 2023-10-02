import ErrorHandler from "../middlewares/error.js";
import { Students } from "../models/students.js";


export const getStudent = async (req, resp, next) => {
    try {
        const { name, branch, state, enrollmentNo, year } = req.body;

        const avlData = { name };
        if (name) {
            avlData.name = {
                $regex: name,
                $options: "i",
            }
        };
        if (branch && branch !== ' ') avlData.branch = branch;
        if (year && year !== ' ') avlData.year = year;
        if (state && state !== ' ') {
            avlData.state = {
                $regex: state,
                $options: "i",
            }
        }
        if (enrollmentNo && enrollmentNo !== ' ') {
            avlData.enrollmentNo = {
                $regex: enrollmentNo,
                $options: "i",
            }
        }
        // console.log("avl : ",avlData);

        const students = await Students.find(avlData);

        // console.log("students: ",students);

        if (!students || students.length == 0) {
            return next(new ErrorHandler("Sorry! Student not found "), 400);
        }

        // console.log("tyep: ",typeof(students));
        resp.status(201).json(students);

    } catch (error) {
        next(error);
    }
}

export const getAllStudents = async (req, resp, next) => {
    try {
        const { name, branch, state, enrollmentNo, year } = req.body;

        const avlData = {};
        if (name) avlData.name = name;
        if (branch) avlData.branch = branch;
        if (year) avlData.year = year;
        if (state) avlData.state = state;
        if (enrollmentNo) avlData.enrollmentNo = enrollmentNo;

        const students = await Students.find(avlData);
        if (!students || students.length == 0) {
            return next(new ErrorHandler("Sorry! Student not found "), 400);
        }

        // console.log(students);.

        const matchingStudents = students.map((student) => ({
            name: student.name,
            branch: student.branch,
            state: student.state,
            enrollmentNo: student.enrollmentNo,
            year: student.year,
            hostelName: student.hostelName,
            block: student.block,
            roomNo: student.roomNo,

        }));
        // console.log("matching students : ",matchingStudents);
        resp.status(201).json(matchingStudents);

    } catch (error) {
        next(error);
    }
}



