"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const config = __importStar(require("../config.json"));
const Data_1 = require("./functions/Data");
const Parser_1 = require("./functions/Parser");
const app = (0, express_1.default)();
app.get('/ow', async (req, res) => {
    if (req.query.user) {
        const tag = (0, Data_1.validateUserTag)(req.query.user);
        if (!tag)
            return res.status(401).json({ error: 'Invalid BattleNet format!, should be Example-0101' }).end();
        const data = await (0, Parser_1.playerData)(tag);
        if (data.errorCode) {
            return res.status(data.errorCode).json({ message: data.message });
        }
        return res.status(200).json(data);
    }
    return res.status(200).json({ error: 'Overwatch API! Add the user param with BattleNet tag!' }).end();
});
app.use(express_1.default.static(__dirname + '/pages'));
app.get("/", function (req, res) {
    res.sendFile(__dirname + "/pages/index.html");
});
app.listen(config.port, () => {
    console.log(`Server ready and listening to port ${config.port} | http://localhost:${config.port}`);
});
//# sourceMappingURL=index.js.map