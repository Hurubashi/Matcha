"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var User_1 = __importDefault(require("../models/User"));
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
        var user = new User_1.default();
        user.attributes.username = "Vasya";
        user.attributes.email = "vasya@gmail.com";
        return res.json("Get users" + ("Current NODE_ENV is " + process.env.NODE_ENV));
    };
    /**
     * @desc    Get user
     * @method  GET
     * @route   GET /api/users/:id
     * @access  Public
     */
    UserController.getUser = function (req, res, next) {
        return res.json("Get user by id");
    };
    /**
     * @desc    Create user
     * @route   POST /api/users/
     * @access  Public
     */
    UserController.createUser = function (req, res, next) {
        return res.json("Create user");
    };
    /**
     * @desc    Update user
     * @route   PUT /api/users/:id
     * @access  Private/Admin
     */
    UserController.updateUser = function (req, res, next) {
        return res.json("Update user");
    };
    /**
     * @desc    Delete user
     * @route   DELETE /api/users/:id
     * @access  Private/Admin
     */
    UserController.deleteUser = function (req, res, next) {
        return res.json("Delete user");
    };
    return UserController;
}());
exports.default = UserController;
