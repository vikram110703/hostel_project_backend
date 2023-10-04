import ErrorHandler from "../middlewares/error.js";
import { Students } from "../models/students.js";


export const getStudent = async (req, resp, next) => {
    try {
        const { name, branch, state, enrollmentNo, year } = req.body;

        const avlData = {};
        if (name && name !== ' ') {
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
        if (Object.keys(avlData).length === 0) {
            return next(new ErrorHandler("Please fill at least one field"), 400);
        }
        // console.log("avl : ",avlData);

        const students = await Students.find(avlData);

        // console.log("students: ",students);

        if (!students || students.length == 0) {
            return next(new ErrorHandler("Sorry! Student not found "), 400);
        }

        // console.log("tyep: ",typeof(students));
        // resp.status(201).json(students);
        resp.status(201).json({
            sucess: true,
            message: `Yha hai ${name} 😋`,
            students,
        })


    } catch (error) {
        next(error);
    }
}

export const getAllStudents = async (req, resp, next) => {

    try {
        const avlData = {};

        // console.log("avl : ",avlData);
        const students = await Students.find(avlData);
        // console.log(students);
        resp.status(201).json({
            sucess: true,
            message: "Ye rahe tere DOST 🤡",
            students,
        })

    } catch (error) {
        next(error);
    }
};



