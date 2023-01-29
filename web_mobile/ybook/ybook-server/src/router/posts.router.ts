import { Router } from "express";
import prisma from "../db";
import { getSession, isAuthed } from "../middleware/session.middleware";

export const postsRouter = Router();

postsRouter.get("/", isAuthed(true), async (req, res) => {
  const page = parseInt(req.query.page as string) || 1;
  if (Number.isNaN(page)) {
    return res.status(400).send("Page must be a number");
  }
  if (page < 1) {
    return res.status(400).send("Page must be greater than 0");
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
});

postsRouter.get("/:postId", isAuthed(true), async (req, res) => {
  const postId = parseInt(req.params.postId);
  if (Number.isNaN(postId)) {
    return res.status(400).send("Post ID must be a number");
  }
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
});

postsRouter.post("/:postId/like", isAuthed(true), async (req, res) => {
  const postId = parseInt(req.params.postId);
  const session = getSession(res);
  if (Number.isNaN(postId)) {
    return res.status(400).send("Post ID must be a number");
  }
  const post = await prisma.post.findUnique({
    where: { id: postId },
  });
  if (!post) {
    return res.status(404).send("Post not found");
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
});

postsRouter.post("/:postId/reply", isAuthed(true), async (req, res) => {
  const session = getSession(res);
  const postId = parseInt(req.params.postId);
  const { content } = req.body;
  if (Number.isNaN(postId)) {
    return res.status(400).send("Post ID must be a number");
  }
  if (typeof content !== "string") {
    return res.status(400).send("Content must be a string");
  }
  const post = await prisma.post.findUnique({
    where: { id: postId },
  });
  if (!post) {
    return res.status(404).send("Post not found");
  }
  const postComment = await prisma.postComment.create({
    data: {
      post: { connect: { id: postId } },
      text: content,
      user: { connect: { email: session.email } },
    },
  });
  return res.json(postComment);
});
