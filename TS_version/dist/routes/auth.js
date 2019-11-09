"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const AuthController_1 = __importDefault(require("../controllers/AuthController"));
// Routes to create
// router.put('/updatedetails', protect, updateDetails);
// router.put('/updatepassword', protect, updatePassword);
// router.post('/forgotpassword', forgotPassword);
// router.put('/resetpassword/:resettoken', resetPassword);
const router = express_1.default.Router();
router.post('/register', AuthController_1.default.register);
router.post('/login', AuthController_1.default.login);
router.post('/logout', AuthController_1.default.logout);
router.post('/me', AuthController_1.default.getMe);
exports.default = router;
