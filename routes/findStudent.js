import express from "express";
import {getAllStudents, getStudent} from "../controllers/findStudent.js";


const router=express.Router();

router.post("/",getStudent);
router.post("/all",getAllStudents);

export default router;

