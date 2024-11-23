import express from "express";

import { createTeacher, deleteTeacher, getTeacher, getTeachers, updateTeacher } from "../controllers/teacher.controller.js";
const router = express.Router();


router.post("/", createTeacher);
router.get("/", getTeachers);
router.put("/:id", updateTeacher);
router.delete("/:id", deleteTeacher);
router.get("/:id",getTeacher);
export default router;
