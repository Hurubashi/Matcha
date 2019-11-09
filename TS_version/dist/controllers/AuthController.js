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
class AuthController {
    /**
     * @desc        Login user
     * @route       POST /api/auth/register
     * @access      Public
     */
    static register(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            return res.json("User registration");
        });
    }
    /**
     * @desc        Login user
     * @route       POST /api/auth/login
     * @access      Public
     */
    static login(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            return res.json("User login");
        });
    }
    /**
     * @desc        Log user out / clear cookie
     * @route       POST /api/auth/logout
     * @access      Private
     */
    static logout(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            // res.cookie('token', 'none', {
            // 	expires: new Date(Date.now() + 10 * 1000),
            // 	httpOnly: true
            // })
            //
            // res.status(200).json({
            // 	success: true,
            // 	data: {}
            // })
            return res.json("User logout");
        });
    }
    /**
     * @desc        Get current logged in user
     * @route       POST /api/auth/me
     * @access      Private
     */
    static getMe(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            // const user = await User.getUser(Number(req.params.id))
            //
            // res.status(200).json({
            // 	success: true,
            // 	data: user
            // })
            return res.json("Get me");
        });
    }
}
exports.default = AuthController;
