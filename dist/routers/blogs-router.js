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
exports.blogsRouter = void 0;
const postsService_1 = require("./../domain/postsService");
const posts_query_repositories_1 = require("./../repositories/posts-query-repositories");
const input_value_blogs_middleware_1 = require("./../middleware/input-value-blogs-middleware");
const authorizatin_1 = require("./../middleware/authorizatin");
const validatorMiddleware_1 = require("./../middleware/validatorMiddleware");
const blogsService_1 = require("./../domain/blogsService");
const express_1 = require("express");
const utils_1 = require("../utils");
const blogs_query_repositories_1 = require("../repositories/blogs-query-repositories");
const input_value_posts_middleware_copy_1 = require("../middleware/input-value-posts-middleware copy");
exports.blogsRouter = (0, express_1.Router)({});
/********************************** get **********************************/
exports.blogsRouter.get("/", function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { serchNameTerm, pageNumber = "1", pageSize = "2", sortBy = "createdAt", sortDirection = "desc", } = req.query;
        const getAllBlogs = yield blogs_query_repositories_1.blogsQueryRepositories.findAllBlogs(serchNameTerm, pageNumber, pageSize, sortBy, sortDirection);
        return res.status(utils_1.HTTP_STATUS.OK_200).send(getAllBlogs);
    });
});
/********************************** post **********************************/
exports.blogsRouter.post("/", authorizatin_1.authorization, validatorMiddleware_1.valueMiddleware, input_value_blogs_middleware_1.inputBlogNameValidator, input_value_blogs_middleware_1.inputBlogDescription, input_value_blogs_middleware_1.inputBlogWebsiteUrl, function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const createBlog = yield blogsService_1.blogsService.createNewBlog(req.body.name, req.body.description, req.body.websiteUrl);
        return res.status(utils_1.HTTP_STATUS.CREATED_201).send(createBlog);
    });
});
/********************************** get{blogId} **********************************/
exports.blogsRouter.get("/:blogId/posts", function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { pageNumber = "1", pageSize = "10", sortBy = "createAt", sortDirection = "desc", } = req.query;
        const { blogId } = req.params;
        const getPosts = yield posts_query_repositories_1.postsQueryRepositories.findPostsByBlogsId(pageNumber, pageSize, sortBy, sortDirection, blogId);
        return res.status(utils_1.HTTP_STATUS.OK_200).send(getPosts);
    });
});
/********************************** post{blogId/posts} ***************************/
exports.blogsRouter.post("/:blogId/posts", authorizatin_1.authorization, validatorMiddleware_1.valueMiddleware, input_value_posts_middleware_copy_1.inputPostContentValidator, input_value_posts_middleware_copy_1.inputPostTitleValidator, input_value_posts_middleware_copy_1.inputPostShortDescriptionValidator, function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { blogId } = req.params;
        const { title, shortDescription, content } = req.body;
        const isCreatePost = yield postsService_1.postsService.createPost(blogId, title, shortDescription, content);
        if (!isCreatePost) {
            return res.sendStatus(utils_1.HTTP_STATUS.NOT_FOUND_404);
        }
        else {
            return res.status(utils_1.HTTP_STATUS.CREATED_201).send(isCreatePost);
        }
    });
});
/********************************** get{id} *********************************/
exports.blogsRouter.get("/:id", function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const blogById = yield blogs_query_repositories_1.blogsQueryRepositories.findBlogById(req.params.id);
        if (!blogById) {
            return res.sendStatus(utils_1.HTTP_STATUS.NOT_FOUND_404);
        }
        else {
            return res.status(utils_1.HTTP_STATUS.OK_200).send(blogById);
        }
    });
});
/********************************** put{id} *********************************/
exports.blogsRouter.put("/:id", authorizatin_1.authorization, validatorMiddleware_1.valueMiddleware, input_value_blogs_middleware_1.inputBlogNameValidator, input_value_blogs_middleware_1.inputBlogDescription, input_value_blogs_middleware_1.inputBlogWebsiteUrl, function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.params;
        const { name, description, websiteUrl } = req.body;
        const isUpdateBlog = yield blogsService_1.blogsService.updateBlog(id, name, description, websiteUrl);
        if (!isUpdateBlog) {
            return res.sendStatus(utils_1.HTTP_STATUS.NOT_FOUND_404);
        }
        else {
            return res.sendStatus(utils_1.HTTP_STATUS.NO_CONTENT_204);
        }
    });
});
/********************************** delete{id} *********************************/
exports.blogsRouter.delete("/:id", authorizatin_1.authorization, function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const isDeleted = yield blogsService_1.blogsService.deletedBlog(req.params.id);
        if (!isDeleted) {
            return res.sendStatus(utils_1.HTTP_STATUS.NOT_FOUND_404);
        }
        else {
            return res.sendStatus(utils_1.HTTP_STATUS.NO_CONTENT_204);
        }
    });
});
