"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postsController = void 0;
const zod_1 = require("zod");
const db_1 = require("../../db");
const error_middleware_1 = require("../_middlewares/error.middleware");
const session_middleware_1 = require("../_middlewares/session.middleware");
const validateSchema_1 = require("../_utils/validateSchema");
exports.postsController = {
    api_getPosts: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const page = (0, validateSchema_1.validateSchema)(zod_1.z.coerce.number().min(1), req.query.page);
        const limit = 10;
        const offset = (page - 1) * limit;
        const count = yield db_1.default.post.count();
        const posts = yield db_1.default.post.findMany({
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
    }),
    api_getPost: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const postId = (0, validateSchema_1.validateSchema)(zod_1.z.coerce.number(), req.params.postId);
        const post = yield db_1.default.post.findUnique({
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
    }),
    api_createPost: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const content = (0, validateSchema_1.validateSchema)(zod_1.z.string(), req.body.content);
        const session = yield (0, session_middleware_1.extractSession)(res);
        const post = yield db_1.default.post.create({
            data: {
                htmlContent: content,
                user: { connect: { email: session.email } },
            },
        });
        return res.json(post);
    }),
    api_likePost: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const postId = (0, validateSchema_1.validateSchema)(zod_1.z.coerce.number(), req.params.postId);
        const session = yield (0, session_middleware_1.extractSession)(res);
        const post = yield db_1.default.post.findUnique({
            where: { id: postId },
        });
        if (!post) {
            throw new error_middleware_1.ApiError(404, "Post not found");
        }
        const postLike = yield db_1.default.postLike.findFirst({
            where: {
                user: {
                    email: session.email,
                },
                postId,
            },
        });
        if (postLike) {
            yield db_1.default.postLike.delete({
                where: { id: postLike.id },
            });
        }
        else {
            yield db_1.default.postLike.create({
                data: {
                    user: { connect: { email: session.email } },
                    post: { connect: { id: postId } },
                },
            });
        }
        return res.json({ success: true });
    }),
    api_replyToPost: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const postId = (0, validateSchema_1.validateSchema)(zod_1.z.coerce.number(), req.params.postId);
        const session = yield (0, session_middleware_1.extractSession)(res);
        const { content } = req.body;
        if (typeof content !== "string") {
            throw new error_middleware_1.ApiError(400, "Content must be a string");
        }
        const post = yield db_1.default.post.findUnique({
            where: { id: postId },
        });
        if (!post) {
            throw new error_middleware_1.ApiError(404, "Post not found");
        }
        const postComment = yield db_1.default.postComment.create({
            data: {
                post: { connect: { id: postId } },
                text: content,
                user: { connect: { email: session.email } },
            },
        });
        return res.json(postComment);
    }),
};
//# sourceMappingURL=posts.controller.js.map