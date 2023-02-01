import { Router } from "express";
import { postsController } from "./posts.controller";
import { use } from "../_middlewares/error.middleware";
import { isAuthed } from "../_middlewares/session.middleware";

export const postsRouter = Router();

postsRouter.use(isAuthed(true));

postsRouter.get("/", use(postsController.api_getPosts));
postsRouter.post("/", use(postsController.api_createPost));
postsRouter.get("/:postId", use(postsController.api_getPost));
postsRouter.post("/:postId/like", use(postsController.api_likePost));
postsRouter.post("/:postId/reply", use(postsController.api_replyToPost));
