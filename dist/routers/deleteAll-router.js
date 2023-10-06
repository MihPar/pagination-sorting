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
exports.deleteAllRouter = void 0;
const blogsService_1 = require("./../domain/blogsService");
const postsService_1 = require("./../domain/postsService");
const express_1 = require("express");
const utils_1 = require("../utils");
exports.deleteAllRouter = (0, express_1.Router)({});
exports.deleteAllRouter.delete("/", function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        yield postsService_1.postsService.deleteAllPosts();
        yield blogsService_1.blogsService.deleteAllBlogs();
        return res.sendStatus(utils_1.HTTP_STATUS.NO_CONTENT_204);
    });
});
