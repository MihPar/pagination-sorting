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
exports.blogsQueryRepositories = void 0;
const db_1 = require("../db/db");
exports.blogsQueryRepositories = {
    findBlogs(serchNameTerm, pageNumber, pageSize, sortBy, sortDirection) {
        return __awaiter(this, void 0, void 0, function* () {
            const filtered = serchNameTerm ? { name: { $regex: /serchNameTerm/i } } : {}; // todo finished filter				
            return db_1.blogsCollection
                .find(filtered, { projection: { _id: 0 } })
                .sort({ [sortBy]: sortDirection === 'asc' ? 1 : -1 })
                .skip(+pageNumber) //todo find how we can skip
                .limit(+pageSize)
                .toArray();
        });
    }
};
