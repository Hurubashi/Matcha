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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var User_1 = __importDefault(require("../models/User"));
var lodash_1 = __importDefault(require("lodash"));
var joi_1 = __importDefault(require("joi"));
var bcrypt_1 = __importDefault(require("bcrypt"));
var UserController = /** @class */ (function () {
    function UserController() {
    }
    /**
     * @desc    Get users
     * @method  GET
     * @route   GET /api/users
     * @access  Public
     */
    UserController.getUsers = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var user, users;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        user = new User_1.default();
                        return [4 /*yield*/, user.getUsers()];
                    case 1:
                        users = _a.sent();
                        return [2 /*return*/, res.json({
                                code: res.statusCode,
                                data: users
                            })];
                }
            });
        });
    };
    /**
     * @desc    Get user
     * @method  GET
     * @route   GET /api/users/:id
     * @access  Public
     */
    UserController.getUser = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var user, userById;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        user = new User_1.default();
                        return [4 /*yield*/, user.getUser(Number(req.params.id))];
                    case 1:
                        userById = _a.sent();
                        return [2 /*return*/, res.json({
                                code: res.statusCode,
                                data: userById
                            })];
                }
            });
        });
    };
    /**
     * @desc    Create user
     * @route   POST /api/users/
     * @access  Public
     */
    UserController.createUser = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var user, _a, e_1, _i, _b, _c, key, value;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        user = new User_1.default();
                        return [4 /*yield*/, joi_1.default.validate(req.body, user.accessible, function (e) {
                                if (e) {
                                    return res.json({
                                        code: res.statusCode,
                                        error: e.message
                                    });
                                }
                            })];
                    case 1:
                        _d.sent();
                        _a = req.body;
                        return [4 /*yield*/, bcrypt_1.default.hash(req.body.password, 10)];
                    case 2:
                        _a.password = _d.sent();
                        user.accessible = lodash_1.default.merge(user.accessible, req.body);
                        _d.label = 3;
                    case 3:
                        _d.trys.push([3, 5, , 6]);
                        return [4 /*yield*/, user.create()];
                    case 4:
                        _d.sent();
                        return [3 /*break*/, 6];
                    case 5:
                        e_1 = _d.sent();
                        for (_i = 0, _b = Object.entries(User_1.default.errorList); _i < _b.length; _i++) {
                            _c = _b[_i], key = _c[0], value = _c[1];
                            if (e_1.sqlMessage && e_1.sqlMessage.includes(key)) {
                                return [2 /*return*/, res.json({
                                        code: res.statusCode,
                                        error: value ? value : e_1.sqlMessage
                                    })];
                            }
                        }
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/, res.json({
                            code: res.statusCode,
                            data: lodash_1.default.merge(user.accessible, user.visible)
                        })];
                }
            });
        });
    };
    /**
     * @desc    Update user
     * @route   PUT /api/users/:id
     * @access  Private/Admin
     */
    UserController.updateUser = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, res.json("Update user")];
            });
        });
    };
    /**
     * @desc    Delete user
     * @route   DELETE /api/users/:id
     * @access  Private/Admin
     */
    UserController.deleteUser = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, res.json("Delete user")];
            });
        });
    };
    return UserController;
}());
exports.default = UserController;