"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
require("./config/env");
var morgan_1 = __importDefault(require("morgan"));
var users_1 = __importDefault(require("./routes/users"));
var app = express_1.default();
// Middleware
// if(process.env.NODE_ENV == 'development'){
app.use(morgan_1.default('dev'));
// }
app.get("/", function (req, res, next) {
    res.send("Hello world" + ("Current NODE_ENV is " + process.env.NODE_ENV));
});
app.use('/api/users', users_1.default);
app.listen(5000, function () {
    console.log('Server is running');
});
