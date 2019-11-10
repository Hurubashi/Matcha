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
const User_1 = require("../models/User");
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
            let user = yield User_1.UserService.getUsers();
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
            let user = yield User_1.UserService.getUser(Number(req.params.id));
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
            let userService = new User_1.UserService();
            // Validate
            joi_1.default.validate(req.body, userService.accessibleScheme, (e) => {
                if (e) {
                    res.statusCode = 406;
                    return res.json(responseTemplate(false, {}, e.message));
                }
            });
            // Hash password
            req.body.password = yield bcrypt_1.default.hash(req.body.password, 10);
            // Insert to db
            let user = yield User_1.UserService.create(req.body);
            if (User_1.UserService.instanceOfUser(user)) {
                console.log(user);
                // const uuid = uuidv1()
                // const letter = pug.renderFile('../public/letters/AccountCreated.pug', {
                // 	name: req.body.first_name + req.body.last_name,
                // 	link: process.env.APP_SERVER + '/auth/emailConfirmation/' + user.id + uuid,
                // 	imgSrc: process.env.APPSERVER + "/images/dating.jpg"
                // })
                // await MailService.sendMail('hurubashi@gmail.com', 'registration', letter)
                // res.statusCode = 201
                return res.json(responseTemplate(true, user, 'User successfully created'));
            }
            else {
                res.statusCode = 406;
                return res.json(responseTemplate(false, {}, user.message));
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
