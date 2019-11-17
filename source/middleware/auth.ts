import {NextFunction, Request, Response} from "express"
import {User, UserManager} from "../models/User"


export default function protect(req: Request, res: Response, next: NextFunction) {
	let token;

	if (
		req.headers.authorization &&
		req.headers.authorization.startsWith('Bearer')
	) {
		// Set token from Bearer token in header
		token = req.headers.authorization.split(' ')[1];
		// Set token from cookie
	}
	else if (req.cookies.token) {
	  token = req.cookies.token;
	}

	// Make sure token exists
	if (!token) {
		return next(res.status(401).json('Not authorized to access this route'));
	}

	// try {
	// 	// Verify token
	// 	const decoded = jwt.verify(token, process.env.JWT_SECRET);
	//
	// 	req.user = await User.findById(decoded.id);
	//
	// 	next();
	// } catch (err) {
	// 	return next(new ErrorResponse('Not authorized to access this route', 401));
	// }
}