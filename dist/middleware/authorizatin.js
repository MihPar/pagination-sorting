"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorization = void 0;
const utils_1 = require("../utils");
const expectAuthHead = "admin:qwerty";
const encoding = Buffer.from(expectAuthHead).toString('base64');
const authorization = function (req, res, next) {
    try {
        const auth = req.headers.authorization;
        if (!auth)
            return res.sendStatus(utils_1.HTTP_STATUS.NOT_AUTHORIZATION_401);
        const [key, value] = auth.split(" ");
        if (key !== 'Basic')
            return res.sendStatus(utils_1.HTTP_STATUS.NOT_AUTHORIZATION_401);
        if (value !== encoding)
            return res.sendStatus(utils_1.HTTP_STATUS.NOT_AUTHORIZATION_401);
        return next();
    }
    catch (_a) {
        res.sendStatus(utils_1.HTTP_STATUS.NOT_WORK_SERVER_500);
    }
};
exports.authorization = authorization;
