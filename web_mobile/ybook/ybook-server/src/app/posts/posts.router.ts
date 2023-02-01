import { Router } from "express";
import { postsController } from "./posts.controller";
import { use } from "../_middlewares/error.middleware";
import { isAuthed } from "../_middlewares/session.middleware";

export const postsRouter = Router();

postsRouter.use(isAuthed(true));

postsRouter.get("/", use(postsController.getPosts));
postsRouter.post("/", use(postsController.createPost));
postsRouter.get("/:postId", use(postsController.getPost));
postsRouter.post("/:postId/like", use(postsController.likePost));
postsRouter.post("/:postId/reply", use(postsController.replyToPost));
