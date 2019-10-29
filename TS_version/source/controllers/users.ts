import {Request, Response, NextFunction} from "express"

class UserController {
	/**
	 * @desc    Get Users
	 * @route   /users
	 * @access  public
	 */

	public getUsers(req: Request, res: Response, next: NextFunction) {

	}

	/**
	 * @desc    Get User
	 * @route   /user/:id
	 * @access  public
	 */

	public getUser(req: Request, res: Response, next: NextFunction) {

	}
}

export default new UserController()

