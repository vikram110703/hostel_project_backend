import ErrorHandler from "../middlewares/error.js";
import { Students } from "../models/students.js";


export const newStudent = async (req, resp, next) => {

    function hasAbusiveWords(text, profanityList) {
        const regex = new RegExp(`(${profanityList.join('|')})`, 'i');
        return regex.test(text);
    }

    try {
        const { name, hostelName, block, roomNo, branch, enrollmentNo, state, year } = req.body;

        if(name.trim()===""||name.trim()===" ")return next(new ErrorHandler("Name can't be empty ", 400));
        let adjustedEnrollmentNo;
       
        if (enrollmentNo.trim()===""||enrollmentNo.trim()===" ") {
            adjustedEnrollmentNo = "enrollmentNo_nhi_diya";
        } else {
            adjustedEnrollmentNo = enrollmentNo.trim();
        }

        const profanityList=process.env.profanityList.split(",");
        //  console.log(profanityList);

        if (hasAbusiveWords(name.trim(), profanityList)) {
            return next(new ErrorHandler("Abusive word detected in name", 400));
        }
        if (hasAbusiveWords(state.trim(), profanityList)) {
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
                        { name: { $regex: name.trim(), $options: "i", } }, { branch},
                        { state: { $regex: state.trim(), $options: "i", } }, { year }
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

        const studentData = { name:name.trim(), hostelName, block, roomNo };

        if (state.length>=1 && state.trim() !== " ") studentData.state = state.trim();
        if (year && year !== "") studentData.year = year;
        if (branch && branch !== "") studentData.branch = branch;
        if (enrollmentNo.trim().length>=1&&enrollmentNo.trim()!=="") studentData.enrollmentNo = studentData.enrollmentNo = enrollmentNo.trim().toUpperCase();

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
