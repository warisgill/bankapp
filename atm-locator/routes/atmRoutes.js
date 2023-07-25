import express from "express";
import {
  getATMs,
  addATM,
  getSpecificATM,
} from "../controllers/atmController.js";

const router = express.Router();

router.post("/", getATMs);
router.post("/add", addATM);
router.get("/:id", getSpecificATM);

export default router;
