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
exports.postsService = void 0;
const posts_db_repositories_1 = require("../repositories/posts-db-repositories");
const db_1 = require("../db/db");
exports.postsService = {
    createPost(blogId, title, shortDescription, content) {
        return __awaiter(this, void 0, void 0, function* () {
            const blog = yield db_1.blogsCollection.findOne({ id: blogId });
            const newPost = {
                id: new Date().toISOString(),
                title,
                shortDescription,
                content,
                blogId,
                blogName: blog.name,
                createdAt: new Date().toISOString()
            };
            const post = yield posts_db_repositories_1.postsRepositories.createNewBlogs(newPost);
            return post;
        });
    },
    // async updateBlog(id: string, name: string, description: string, websiteUrl: string): Promise<boolean> {
    // 	return await blogsRepositories.updateBlogById(id, name, description, websiteUrl,)
    // },
    // async deletedBlog(id: string): Promise<boolean> {
    // 	return await blogsRepositories.deletedBlog(id)
    // }
};
