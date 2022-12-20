"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getData = exports.validateUserTag = void 0;
const axios_1 = __importDefault(require("axios"));
function validateUserTag(tag) {
    if (!tag.includes('-')) {
        return null;
    }
    else {
        const splitTag = tag.split('-');
        if (isNaN(Number(splitTag[1].replace('/', ''))))
            return null; // Last part should be the bTag number
        return tag;
    }
}
exports.validateUserTag = validateUserTag;
async function getData(tag) {
    try {
        const request = {
            url: `https://overwatch.blizzard.com/en-us/career/${tag}`,
            method: 'GET',
        };
        const response = await (0, axios_1.default)(request);
        return response;
    }
    catch (error) {
        switch (error?.response?.status) {
            case 404:
                return { errorCode: 404, message: 'Profile not found!' };
            default:
                console.log(error);
                return { errorCode: 400, message: 'An error occurred!' };
        }
    }
}
exports.getData = getData;
//# sourceMappingURL=Data.js.map