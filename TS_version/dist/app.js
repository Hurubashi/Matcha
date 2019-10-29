"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var users_1 = __importDefault(require("./routes/users"));
var app = express_1.default();
app.get("/", function (req, res, next) {
    res.send("Hello world");
});
app.use(users_1.default);
app.listen(5000, function () {
    console.log('Server is running');
});
