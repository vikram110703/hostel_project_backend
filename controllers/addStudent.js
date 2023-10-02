import ErrorHandler from "../middlewares/error.js";
import { Students } from "../models/students.js";


export const newStudent = async (req, resp, next) => {
    try {
        const { name, hostelName, block, roomNo, branch, enrollmentNo, state, year } = req.body;

        let adjustedEnrollmentNo = enrollmentNo;
        if (enrollmentNo === undefined || enrollmentNo == ' ') {
            adjustedEnrollmentNo = "nhi mila";
        }

        const student = await Students.findOne({
            $or: [{
                $and: [
                    { name }, { hostelName }, { block }, { roomNo }
                ]
            },
            { enrollmentNo: adjustedEnrollmentNo },

            ]
        });
        if (student) {
            // console.log("Search criteria:", { name, hostelName, block, roomNo, enrollmentNo });
            // resp.json(student);
            return next(new ErrorHandler(" Student is already exst ", 400));
        }

        const studentData = { name, hostelName, block, roomNo };

        if (state && state !== ' ') studentData.state = state;
        if (year && year !== ' ') studentData.year = year;
        if (branch && branch !== ' ') studentData.branch = branch;
        if (enrollmentNo && enrollmentNo !== ' ') studentData.enrollmentNo = enrollmentNo;

        await Students.create(
            studentData
        );

        resp.status(201).json({
            success: true,
            message: " Student added Successfully ",
        });

    } catch (error) {
        next(error);
    }
};