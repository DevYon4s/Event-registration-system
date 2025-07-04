import { Router } from "express";
import {
  getAllEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,
} from "../controllers/eventController.js";
import { protect, admin } from "../middleware/auth.js";

const router = Router();

router.get("/", getAllEvents);
router.get("/:id", getEventById);
router.post("/", protect, admin, createEvent);
router.put("/:id", protect, admin, updateEvent);
router.delete("/:id", protect, admin, deleteEvent);

export default router;
