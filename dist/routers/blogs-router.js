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
const blogsService_1 = require("./../domain/blogsService");
const express_1 = require("express");
const utils_1 = require("../utils");
const blogs_query_repositories_1 = require("../repositories/blogs-query-repositories");
exports.blogsRouter = (0, express_1.Router)({});
exports.blogsRouter.get("/", function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { serchNameTerm, pageNumber = "1", pageSize = "2", sortBy = "createdAt", sortDirection = "desc", } = req.query;
        const getAllBlogs = yield blogs_query_repositories_1.blogsQueryRepositories.findBlogs(serchNameTerm, pageNumber, pageSize, sortBy, sortDirection);
        res.status(utils_1.HTTP_STATUS.OK_200).send(getAllBlogs);
    });
});
exports.blogsRouter.post("/", function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const createBlog = yield blogsService_1.blogsService.createNewBlog(req.body.name, req.body.description, req.body.websiteUrl);
        res.status(utils_1.HTTP_STATUS.CREATED_201).send(createBlog);
    });
});
