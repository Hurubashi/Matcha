"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var users_1 = __importDefault(require("../controllers/users"));
var router = express_1.default.Router();
router.get('/', users_1.default.getUsers);
router.get('/:id', users_1.default.getUser);
router.post('/', users_1.default.createUser);
router.put('/:id', users_1.default.updateUser);
router.delete('/:id', users_1.default.deleteUser);
exports.default = router;
