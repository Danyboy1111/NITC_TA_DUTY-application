import express from "express";
//crud rfers to create,read,update,delete.
import { c,r,u,d, getRequest } from "../controllers/request.controller.js";
const router = express.Router();


router.post("/", c);
router.get("/",r);
router.put("/:id",u);
router.delete("/:id",d);
router.get("/:id",getRequest);

export default router;
