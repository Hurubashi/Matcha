import { Request, Response, NextFunction } from 'express'
import bcrypt from 'bcrypt'
import uuidv1 from 'uuid/v1'
import Joi, { Err } from 'joi'
import pug from 'pug'
import MailService from '../util/MailService'
import { User, UserModel } from '../models/User'
import { UserActivationUUID, UserActivationUUIDModel } from '../models/UserActivationUUID'
import ResTemplate from './ResTemplate'
import path from 'path'
import jwt from 'jsonwebtoken'

export default class UserController {
  /**
   * @desc        Get user
   * @route       GET /api/user
   * @access      Public
   */

  public static async getUsers(req: Request, res: Response, next: NextFunction) {
    let userModel = new UserModel()
    let user: User[] = await userModel.getAll()
    return res.sendStatus(200).json(ResTemplate.success(user))
  }

  /**
   * @desc        Get user
   * @route       GET /api/user/:id
   * @access      Public
   */

  public static async getUser(req: Request, res: Response, next: NextFunction) {
    let userModel = new UserModel()
    let user: User | Error = await userModel.getOne(Number(req.params.id))
    if (userModel.isInstance(user)) {
      return res.sendStatus(200).json(ResTemplate.success(user))
    } else {
      return res.sendStatus(404).json(ResTemplate.error(user.message))
    }
  }

  /**
   * @desc        Create user
   * @route       POST /api/user/
   * @access      Public
   */

  public static async createUser(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response> {
    let userModel = new UserModel()
    // Validate
    Joi.validate(req.body, userModel.schema, (e: Joi.ValidationError) => {
      if (e) return res.sendStatus(400).json(ResTemplate.error(e.message))
    })
    // Hash password
    req.body.password = await bcrypt.hash(req.body.password, String(process.env.ENCRYPTION_SALT))
    // Insert to db
    let user: User | Error = await userModel.create(req.body)
    if (userModel.isInstance(user)) {
      return res.sendStatus(201).json(ResTemplate.success(user))
    } else {
      return res.sendStatus(400).json(ResTemplate.success(user.message))
    }
  }

  /**
   * @desc        Update user
   * @route       PUT /api/user/:id
   * @access      Private/Admin
   */

  public static async updateUser(req: Request, res: Response, next: NextFunction) {
    return res.json('Update user')
  }

  /**
   * @desc        Delete user
   * @route       DELETE /api/user/:id
   * @access      Private/Admin
   */

  public static async deleteUser(req: Request, res: Response, next: NextFunction) {
    return res.json('Delete user')
  }
}
