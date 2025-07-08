import { Router } from "express";
import {
  deleteUser,
  fetchUsers,
  registerUser,
  showUser,
  updateUser,
} from "../controllers/user.controller.js";

const router = Router();
router.route("/register").post(registerUser);
router.route("/:id").get(showUser);
router.route("/").get(fetchUsers);
router.route("/:id").put(updateUser);
router.route("/:id").delete(deleteUser);

export default router;
