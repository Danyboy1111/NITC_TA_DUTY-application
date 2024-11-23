import express from "express";

import { createStudent, deleteStudent, getStudents, updateStudent,getStudent } from "../controllers/student.controller.js";
const router = express.Router();


router.post("/", createStudent);
router.get("/", getStudents);
router.put("/:id", updateStudent);
router.delete("/:id", deleteStudent);
router.get("/:id", getStudent);

export default router;
