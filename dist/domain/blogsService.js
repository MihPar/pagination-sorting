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
exports.blogsService = void 0;
const blogs_db_repositories_1 = require("./../repositories/blogs-db-repositories");
exports.blogsService = {
    createNewBlog(name, description, websiteUrl) {
        return __awaiter(this, void 0, void 0, function* () {
            const newBlog = {
                id: new Date().toISOString(),
                name,
                description,
                websiteUrl,
                createdAt: new Date().toISOString(),
                isMembership: false
            };
            const createBlog = yield blogs_db_repositories_1.blogsRepositories.createNewBlogs(newBlog);
            return createBlog;
        });
    },
    updateBlog(id, name, description, websiteUrl) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield blogs_db_repositories_1.blogsRepositories.updateBlogById(id, name, description, websiteUrl);
        });
    },
    deletedBlog(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield blogs_db_repositories_1.blogsRepositories.deletedBlog(id);
        });
    }
};
