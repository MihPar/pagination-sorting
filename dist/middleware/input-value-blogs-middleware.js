"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.inputBlogWebsiteUrl = exports.inputBlogDescription = exports.inputBlogNameValidator = void 0;
const express_validator_1 = require("express-validator");
exports.inputBlogNameValidator = (0, express_validator_1.body)('name')
    .isString()
    .notEmpty()
    .trim()
    .isLength({ min: 1, max: 15 })
    .withMessage('Name should be length from 1 to 15 symbols');
exports.inputBlogDescription = (0, express_validator_1.body)('description')
    .isString()
    .notEmpty()
    .trim()
    .isLength({ min: 1, max: 500 })
    .withMessage('Descriptionme should be length from 1 to 500 symbols');
exports.inputBlogWebsiteUrl = (0, express_validator_1.body)('websiteUrl')
    .isString()
    .trim()
    .notEmpty()
    .isLength({ min: 1, max: 100 })
    .withMessage('Descriptionme should be length from 1 to 100 symbols');
