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
exports.postsRouter = void 0;
const input_value_posts_middleware_copy_1 = require("./../middleware/input-value-posts-middleware copy");
const validatorMiddleware_1 = require("./../middleware/validatorMiddleware");
const authorizatin_1 = require("./../middleware/authorizatin");
const express_1 = require("express");
const posts_query_repositories_1 = require("../repositories/posts-query-repositories");
const utils_1 = require("../utils");
const postsService_1 = require("../domain/postsService");
exports.postsRouter = (0, express_1.Router)({});
/********************************** get **********************************/
exports.postsRouter.get("/", function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { pageNumber = "1", pageSize = "10", sortBy = "createAt", sortDirection = "desc", } = req.query;
        const getAllPosts = yield posts_query_repositories_1.postsQueryRepositories.findAllPosts(pageNumber, pageSize, sortBy, sortDirection);
        return res.status(utils_1.HTTP_STATUS.OK_200).send(getAllPosts);
    });
});
/********************************** post **********************************/
exports.postsRouter.post("/", authorizatin_1.authorization, validatorMiddleware_1.valueMiddleware, input_value_posts_middleware_copy_1.inputPostTitleValidator, input_value_posts_middleware_copy_1.inputPostShortDescriptionValidator, input_value_posts_middleware_copy_1.inputPostContentValidator, input_value_posts_middleware_copy_1.inputPostBlogValidator, function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { title, shortDescription, content, blogId } = req.body;
        const createNewPost = yield postsService_1.postsService.createPost(title, shortDescription, content, blogId);
        return res.status(utils_1.HTTP_STATUS.CREATED_201).send(createNewPost);
    });
});
/********************************** get{id} **********************************/
exports.postsRouter.get("/:id", function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const getPostById = yield posts_query_repositories_1.postsQueryRepositories.findPostById(req.params.id);
        if (!getPostById) {
            return res.sendStatus(utils_1.HTTP_STATUS.NOT_FOUND_404);
        }
        return res.status(utils_1.HTTP_STATUS.OK_200).send(getPostById);
    });
});
/********************************** put{id} **********************************/
exports.postsRouter.put("/:id", authorizatin_1.authorization, validatorMiddleware_1.valueMiddleware, input_value_posts_middleware_copy_1.inputPostTitleValidator, input_value_posts_middleware_copy_1.inputPostShortDescriptionValidator, input_value_posts_middleware_copy_1.inputPostContentValidator, input_value_posts_middleware_copy_1.inputPostBlogValidator, function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.params;
        const { title, shortDescription, content, blogId } = req.body;
        const updatePost = yield postsService_1.postsService.updateOldPost(id, title, shortDescription, content, blogId);
        if (!updatePost) {
            return res.sendStatus(utils_1.HTTP_STATUS.NOT_FOUND_404);
        }
        else {
            return res.sendStatus(utils_1.HTTP_STATUS.NO_CONTENT_204);
        }
    });
});
/********************************** delete{id} **********************************/
exports.postsRouter.delete("/:id", authorizatin_1.authorization, function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const deletPost = yield postsService_1.postsService.deletePostId(req.params.id);
        if (!deletPost) {
            return res.sendStatus(utils_1.HTTP_STATUS.NOT_FOUND_404);
        }
        else {
            return res.sendStatus(utils_1.HTTP_STATUS.NO_CONTENT_204);
        }
    });
});
