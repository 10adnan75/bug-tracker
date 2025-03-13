import express from "express";
import { updateBug, getBugs, openBug, closeBug } from "../controllers/bug.controller.js";

const router = express.Router();

router.get("/", getBugs);

router.post("/", openBug);

router.put("/:id", updateBug);

router.delete("/:id", closeBug);

export default router;