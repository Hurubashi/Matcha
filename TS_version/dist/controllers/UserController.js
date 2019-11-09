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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = __importDefault(require("../models/User"));
const lodash_1 = __importDefault(require("lodash"));
const joi_1 = __importDefault(require("joi"));
const bcrypt_1 = __importDefault(require("bcrypt"));
function responseTemplate(success, data, message) {
    return {
        success: success,
        message: message,
        data: data,
    };
}
class UserController {
    /**
     * @desc        Get users
     * @route       GET /api/users
     * @access      Public
     */
    static getUsers(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let user = yield User_1.default.getUsers();
            return res.json({
                code: res.statusCode,
                data: user
            });
        });
    }
    /**
     * @desc        Get user
     * @route       GET /api/users/:id
     * @access      Public
     */
    static getUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let user = yield User_1.default.getUser(Number(req.params.id));
            return res.json({
                code: res.statusCode,
                data: user
            });
        });
    }
    /**
     * @desc        Create user
     * @route       POST /api/users/
     * @access      Public
     */
    static createUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let user = new User_1.default();
            // Validate
            joi_1.default.validate(req.body, user.accessible, (e) => {
                if (e)
                    return res.json(responseTemplate(false, {}, e.message));
            });
            // Hash password
            req.body.password = yield bcrypt_1.default.hash(req.body.password, 10);
            user.accessible = lodash_1.default.merge(user.accessible, req.body);
            // Insert to db
            try {
                yield user.create();
                return res.json(responseTemplate(true, lodash_1.default.merge(user.accessible, user.visible), 'Uspeh?'));
            }
            catch (e) {
                res.statusCode = 201;
                return res.json(responseTemplate(false, {}, e.message));
            }
        });
    }
    /**
     * @desc        Update user
     * @route       PUT /api/users/:id
     * @access      Private/Admin
     */
    static updateUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            return res.json("Update user");
        });
    }
    /**
     * @desc        Delete user
     * @route       DELETE /api/users/:id
     * @access      Private/Admin
     */
    static deleteUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            return res.json("Delete user");
        });
    }
}
exports.default = UserController;
