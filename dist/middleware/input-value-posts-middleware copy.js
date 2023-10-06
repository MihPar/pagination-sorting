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
exports.inputPostBlogValidator = exports.inputPostContentValidator = exports.inputPostShortDescriptionValidator = exports.inputPostTitleValidator = void 0;
const blogs_query_repositories_1 = require("./../repositories/blogs-query-repositories");
const express_validator_1 = require("express-validator");
exports.inputPostTitleValidator = (0, express_validator_1.body)('title')
    .isString()
    .notEmpty()
    .trim()
    .isLength({ min: 1, max: 30 })
    .withMessage('Name should be length from 1 to 30 symbols');
exports.inputPostShortDescriptionValidator = (0, express_validator_1.body)('shortDescription')
    .isString()
    .notEmpty()
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage('Descriptionme should be length from 1 to 100 symbols');
exports.inputPostContentValidator = (0, express_validator_1.body)('content')
    .isString()
    .notEmpty()
    .trim()
    .isLength({ min: 1, max: 1000 })
    .withMessage('Descriptionme should be length from 1 to 1000 symbols');
exports.inputPostBlogValidator = (0, express_validator_1.body)('content')
    .isString()
    .trim()
    .notEmpty()
    .custom((id) => __awaiter(void 0, void 0, void 0, function* () {
    const blogExist = yield blogs_query_repositories_1.blogsQueryRepositories.findBlogById(id);
    if (!blogExist) {
        throw new Error("Blog is not exists");
    }
    return true;
})).withMessage('Descriptionme should be length from 1 to 100 symbols');
