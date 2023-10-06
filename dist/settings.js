"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createApp = void 0;
const express_1 = __importDefault(require("express"));
const blogs_router_1 = require("./routers/blogs-router");
const posts_router_1 = require("./routers/posts-router");
const deleteAll_router_1 = require("./routers/deleteAll-router");
const createApp = () => {
    const app = (0, express_1.default)();
    app.use((0, express_1.default)());
    app.use('/posts', posts_router_1.postsRouter);
    app.use('/blogs', blogs_router_1.blogsRouter);
    app.use('/testing/all-data', deleteAll_router_1.deleteAllRouter);
    return app;
};
exports.createApp = createApp;
