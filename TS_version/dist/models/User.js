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
const knex_1 = __importDefault(require("knex"));
const config_1 = require("../config");
const joi_1 = __importDefault(require("joi"));
let db = knex_1.default(config_1.knexConfig);
class UserService {
    constructor() {
        this.accessibleScheme = {
            email: joi_1.default.string().email().min(3).required().error((errors) => {
                return this.manageJoiErrors(errors, 'Email');
            }),
            username: joi_1.default.string().min(3).required().error((errors) => {
                return this.manageJoiErrors(errors, 'User name');
            }),
            first_name: joi_1.default.string().required().error((errors) => {
                return this.manageJoiErrors(errors, 'First name');
            }),
            last_name: joi_1.default.string().required().error((errors) => {
                return this.manageJoiErrors(errors, 'Last name');
            }),
            password: joi_1.default.string().min(6).required().error((errors) => {
                return this.manageJoiErrors(errors, 'Password');
            }),
        };
    }
    manageJoiErrors(errors, field) {
        errors.forEach((err) => {
            switch (err.type) {
                case "string.email":
                    err.message = `${field} should be valid!`;
                    break;
                case "any.empty":
                    err.message = `${field} should not be empty!`;
                    break;
                case "string.min":
                    err.message = `${field} should have at least ${err.context ? err.context.limit : ""} characters!`;
                    break;
                default:
                    break;
            }
        });
        return errors;
    }
    static instanceOfUser(object) {
        return 'id' in object;
    }
    static get errorList() {
        return {
            'user_email_unique': 'This email is already taken',
            'user_username_unique': 'This username is already taken'
        };
    }
    static create(body) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let id = yield db(UserService.tableName).insert(body);
                let user = yield db(UserService.tableName).where('id', id[0]).first();
                if (UserService.instanceOfUser(user)) {
                    return user;
                }
                else {
                    return Error('Something went wrong');
                }
            }
            catch (e) {
                for (let [key, value] of Object.entries(UserService.errorList)) {
                    if (e.sqlMessage && e.sqlMessage.includes(key)) {
                        return new Error(value ? value : e.sqlMessage);
                    }
                }
                return new Error(e);
            }
        });
    }
    static getUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield db(this.tableName).select("*").from(this.tableName);
        });
    }
    static getUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield db(this.tableName).where('id', id).first();
        });
    }
}
exports.UserService = UserService;
UserService.tableName = 'users';
