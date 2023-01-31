import { Router } from "express";
import { postsController } from "../controllers/posts.controller";
import { use } from "../middleware/error.middleware";
import { isAuthed } from "../middleware/session.middleware";

export const postsRouter = Router();

postsRouter.use(isAuthed(true));

postsRouter.get("/", use(postsController.getPosts));
postsRouter.post("/", use(postsController.createPost));
postsRouter.get("/:postId", use(postsController.getPost));
postsRouter.post("/:postId/like", use(postsController.likePost));
postsRouter.post("/:postId/reply", use(postsController.replyToPost));
