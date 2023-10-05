import ErrorHandler from "../middlewares/error.js";
import { Students } from "../models/students.js";


export const newStudent = async (req, resp, next) => {

    function hasAbusiveWords(text, profanityList) {
        const regex = new RegExp(`(${profanityList.join('|')})`, 'i');
        return regex.test(text);
    }



    try {
        const { name, hostelName, block, roomNo, branch, enrollmentNo, state, year } = req.body;

        let adjustedEnrollmentNo;
        if (typeof enrollmentNo !== 'string' || enrollmentNo.trim() === '' || enrollmentNo == undefined || enrollmentNo.length == 0 || enrollmentNo == ' ' || enrollmentNo == null) {
            adjustedEnrollmentNo = "enrollmentNo_nhi_diya";
        } else {
            adjustedEnrollmentNo = enrollmentNo;
        }

        const profanityList = ["fuck", "lund", "madarchod", "bencho", "chutiya", "choot", "motherfucker", "sex", "sexy", "sexyy", "maa ki", "randi", "gaan", "gaandu", "lwda"];
        // console.log(profanityList);

        if (hasAbusiveWords(name, profanityList)) {
            return next(new ErrorHandler("Abusive word detected in name", 400));
        }
        if (hasAbusiveWords(state, profanityList)) {
            return next(new ErrorHandler("Abusive word detected in state", 400));
        }
        if (hasAbusiveWords(adjustedEnrollmentNo, profanityList)) {
            return next(new ErrorHandler("Abusive word in Enr no ", 400));
        }


        // i am removing this condition because multiple students can have same room
        const student = await Students.findOne({
            $or: [
                {
                    $and: [
                        { name: { $regex: name, $options: "i", } }, { branch},
                        { state: { $regex: state, $options: "i", } }, { year }
                    ]
                },
                { enrollmentNo: {$regex: adjustedEnrollmentNo ,$options:"i" }},

            ]
        });


        // const student = await Students.findOne({
        //     $or: [

        //         { enrollmentNo: adjustedEnrollmentNo },
        //     ]
        // })
        if (student) {
            // console.log(student);
            return next(new ErrorHandler(" Student with this details already exist ", 400));
        }

        const studentData = { name, hostelName, block, roomNo };

        if (state && state !== ' ') studentData.state = state;
        if (year && year !== ' ') studentData.year = year;
        if (branch && branch !== ' ') studentData.branch = branch;
        if (enrollmentNo !== null && enrollmentNo !== ' ' && enrollmentNo !== undefined) studentData.enrollmentNo = enrollmentNo;

        await Students.create(
            studentData
        );

        // console.log(studentData);
        resp.status(201).json({
            success: true,
            message: " Student added Successfully ",
        });

    } catch (error) {
        next(error);
    }
};
