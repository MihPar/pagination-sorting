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
exports.postsRepositories = void 0;
const db_1 = require("./../db/db");
exports.postsRepositories = {
    createNewBlogs(newPost) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield db_1.postsCollection.insertOne(Object.assign({}, newPost));
            return newPost;
        });
    },
    updatePost(id, title, shortDescription, content, blogId) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield db_1.postsCollection.updateOne({ id: id }, {
                $set: {
                    title: title,
                    shortDescription: shortDescription,
                    content: content,
                    blogId: blogId,
                },
            });
            return result.upsertedCount === 1;
        });
    },
    deletedPostById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield db_1.blogsCollection.deleteOne({ id: id });
            return result.deletedCount === 1;
        });
    },
    deleteRepoPosts() {
        return __awaiter(this, void 0, void 0, function* () {
            const deletedAll = yield db_1.postsCollection.deleteMany({});
            return deletedAll.deletedCount === 1;
        });
    },
};
