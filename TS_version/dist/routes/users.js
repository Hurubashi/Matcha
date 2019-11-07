"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var UserController_1 = __importDefault(require("../controllers/UserController"));
var router = express_1.default.Router();
router.get('/', UserController_1.default.getUsers);
router.get('/:id', UserController_1.default.getUser);
router.post('/', UserController_1.default.createUser);
router.put('/:id', UserController_1.default.updateUser);
router.delete('/:id', UserController_1.default.deleteUser);
exports.default = router;
