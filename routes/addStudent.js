import express from "express";
import {newStudent} from "../controllers/addStudent.js";


const router=express.Router();

router.post("/",newStudent);

export default router;

