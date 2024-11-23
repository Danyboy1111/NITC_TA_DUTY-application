import express from "express";
//crud refers to create,read,update,delete.
import { c,r,u,d, getWork } from "../controllers/work.controller.js";
const router = express.Router();


router.post("/", c);
router.get("/",r);
router.put("/:sid",u);
router.delete("/:id",d);
router.get("/:id",getWork);
export default router;
