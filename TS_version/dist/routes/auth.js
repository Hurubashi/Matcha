"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var AuthController_1 = __importDefault(require("../controllers/AuthController"));
// router.post('/register', register);
// router.post('/login', login);
// router.get('/logout', logout);
// router.get('/me', protect, getMe);
// router.put('/updatedetails', protect, updateDetails);
// router.put('/updatepassword', protect, updatePassword);
// router.post('/forgotpassword', forgotPassword);
// router.put('/resetpassword/:resettoken', resetPassword);
var router = express_1.default.Router();
router.get('/register', AuthController_1.default.register);
router.get('/login', AuthController_1.default.login);
exports.default = router;
