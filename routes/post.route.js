import { Router } from "express";
import {
  createPost,
  deletePost,
  fetchPosts,
  getPost,
  searchPost,
  updatePost,
} from "../controllers/post.controller.js";

const router = Router();

router.route("/").get(fetchPosts);
router.route("/create").post(createPost);
router.route("/search").get(searchPost);
router.route("/:id").get(getPost);
router.route("/:id").put(updatePost);
router.route("/:id").delete(deletePost);

export default router;
