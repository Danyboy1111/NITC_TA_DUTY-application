import express from "express";

import { getSubjectId,createSubject} from "../controllers/subject.controller.js";
const  router = express.Router();


router.post("/", createSubject);
router.get("/", getSubjectId);

export default router;
