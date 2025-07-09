import { Router } from "express";
import {
  createComment,
  deleteComment,
  fetchComments,
  getComment,
  updateComment,
} from "../controllers/comment.controller.js";

const router = Router();

router.route("/").get(fetchComments);
router.route("/create").post(createComment);
router.route("/:id").get(getComment);
router.route("/:id").put(updateComment);
router.route("/:id").delete(deleteComment);

export default router;
