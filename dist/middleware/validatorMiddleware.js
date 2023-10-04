"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.valueMiddleware = exports.errorFormat = void 0;
const express_validator_1 = require("express-validator");
const utils_1 = require("../utils");
const errorFormat = (error) => {
    switch (error.type) {
        case "field":
            return {
                message: error.msg,
                field: error.path
            };
        default:
            return {
                message: error.msg,
                field: "None"
            };
    }
};
exports.errorFormat = errorFormat;
const valueMiddleware = function (req, res, next) {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty) {
        const errorMessage = errors.array({ onlyFirstError: true }).map(item => {
            return (0, exports.errorFormat)(item);
        });
        res.status(utils_1.HTTP_STATUS.BAD_REQUEST_400).send(errorMessage);
        return;
    }
    else {
        next();
    }
};
exports.valueMiddleware = valueMiddleware;
