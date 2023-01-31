import { Router } from "express";
import prisma from "../db";
import { ApiError, use } from "../middleware/error.middleware";
import { extractSession, isAuthed } from "../middleware/session.middleware";
import { assertNumber } from "../utils/assertions";

export const postsRouter = Router();

postsRouter.use(isAuthed(true));

postsRouter.get(
  "/",
  use(async (req, res) => {
    const page = parseInt(req.query.page as string) || 1;
    assertNumber(page);
    if (page < 1) {
      throw new ApiError(400, "Page must be greater than 0");
    }
    const limit = 10;
    const offset = (page - 1) * limit;
    const count = await prisma.post.count();
    const posts = await prisma.post.findMany({
      skip: offset,
      take: limit,
      orderBy: {
        createdAt: "desc",
      },
      include: {
        user: true,
        postComments: {
          include: { user: true },
        },
        postLikes: { include: { user: true } },
        postAttachments: true,
      },
    });
    return res.json({
      posts,
      page,
      pages: Math.ceil(count / limit),
    });
  })
);

postsRouter.post(
  "/",
  use(async (req, res) => {
    const session = await extractSession(res);
    const { content } = req.body;
    if (typeof content !== "string") {
      throw new ApiError(400, "Content must be a string");
    }
    const post = await prisma.post.create({
      data: {
        htmlContent: content,
        user: { connect: { email: session.email } },
      },
    });
    return res.json(post);
  })
);

postsRouter.get(
  "/:postId",
  use(async (req, res) => {
    const postId = parseInt(req.params.postId, 10);
    assertNumber(postId);
    const post = await prisma.post.findUnique({
      where: { id: postId },
      include: {
        user: true,
        postComments: {
          include: { user: true },
        },
        postLikes: { include: { user: true } },
        postAttachments: true,
      },
    });
    if (!post) {
      return res.status(404).send("Post not found");
    }
    return res.json(post);
  })
);

postsRouter.post(
  "/:postId/like",
  use(async (req, res) => {
    const postId = parseInt(req.params.postId, 10);
    assertNumber(postId);
    const session = await extractSession(res);
    const post = await prisma.post.findUnique({
      where: { id: postId },
    });
    if (!post) {
      throw new ApiError(404, "Post not found");
    }
    const postLike = await prisma.postLike.findFirst({
      where: {
        user: {
          email: session.email,
        },
        postId,
      },
    });
    if (postLike) {
      await prisma.postLike.delete({
        where: { id: postLike.id },
      });
    } else {
      await prisma.postLike.create({
        data: {
          user: { connect: { email: session.email } },
          post: { connect: { id: postId } },
        },
      });
    }
    return res.json({ success: true });
  })
);

postsRouter.post(
  "/:postId/reply",
  use(async (req, res) => {
    const session = await extractSession(res);
    const postId = parseInt(req.params.postId);
    assertNumber(postId);
    const { content } = req.body;
    if (typeof content !== "string") {
      throw new ApiError(400, "Content must be a string");
    }
    const post = await prisma.post.findUnique({
      where: { id: postId },
    });
    if (!post) {
      throw new ApiError(404, "Post not found");
    }
    const postComment = await prisma.postComment.create({
      data: {
        post: { connect: { id: postId } },
        text: content,
        user: { connect: { email: session.email } },
      },
    });
    return res.json(postComment);
  })
);
