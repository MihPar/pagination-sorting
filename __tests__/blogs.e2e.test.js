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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.testRouter = void 0;
const mongodb_1 = require("mongodb");
const blogs_router_1 = require("../src/routers/blogs-router");
const supertest_1 = __importDefault(require("supertest"));
const dotenv_1 = __importDefault(require("dotenv"));
const utils_1 = require("../src/utils");
const express_1 = require("express");
dotenv_1.default.config();
const mongoURL = process.env.MONGO_URL || "mongodb://0.0.0.0:27017";
exports.testRouter = (0, express_1.Router)({});
describe("/blogs", () => {
    const client = new mongodb_1.MongoClient(mongoURL);
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield client.connect();
        yield (0, supertest_1.default)(blogs_router_1.blogsRouter)
            .delete("/testing/all-data")
            .expect(utils_1.HTTP_STATUS.NO_CONTENT_204);
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield client.close();
    }));
    it("should return 200 and empy []", () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(blogs_router_1.blogsRouter).get("/").expect(200, []);
    }));
    it("should return 404 fro not existing blogs", () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(blogs_router_1.blogsRouter).get("/:1").expect(404);
    }));
    it("shouldn`t create with incorrect input data", () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(blogs_router_1.blogsRouter)
            .post("/:2023-10-13T09:42:46.296Z/posts")
            .send({ title: "beck-end" })
            .expect(utils_1.HTTP_STATUS.NOT_FOUND_404);
        yield (0, supertest_1.default)(blogs_router_1.blogsRouter).get("/");
        expect(utils_1.HTTP_STATUS.CREATED_201);
    }));
    it("should created blogs with correct data", () => __awaiter(void 0, void 0, void 0, function* () {
        const createResponse = yield (0, supertest_1.default)(blogs_router_1.blogsRouter)
            .post("/:2023-10-13T09:42:46.296Z/posts")
            .send({
            title: "beck-end",
            shortDescription: "lllllllllllll",
            content: "bbbbbbbbbbbbb",
            blogId: "2023-10-13T09:42:46.296Z",
        })
            .expect(utils_1.HTTP_STATUS.NOT_FOUND_404);
        const createdBlogs = createResponse.body;
        expect(createdBlogs).toEqual({
            id: expect.any(Number),
            title: "beck-end",
            shortDescription: "lllllllllllll",
            content: "bbbbbbbbbbbbb",
            blogId: "2023-10-13T09:42:46.296Z",
        });
        yield (0, supertest_1.default)(blogs_router_1.blogsRouter)
            .get('/')
            .expect(utils_1.HTTP_STATUS.CREATED_201, [createdBlogs]);
    }));
    it('shouldn`t update blogs with incorrect data', () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(blogs_router_1.blogsRouter)
            .put('/:1')
            .send({
            id: expect.any(Number),
            name: '',
            description: '',
            websiteUrl: ''
        })
            .expect(utils_1.HTTP_STATUS.NOT_FOUND_404);
    }));
});
