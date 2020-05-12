import { Request, Response, NextFunction } from 'express'
import { Chat, chatModel } from '../models/Chat'
import ResManager from '../util/ResManager'
import UserActions from '../actions/UserActions'
import { PublicProfile } from '../models/User'

interface ChatResponce {
	id: number
	interlocutorId: number
	interlocutorName: string
	interlocutorAvatar?: string
	lastMsg?:
		| {
				lastMsg: string
				lastMsgTime: Date
		  }
		| undefined
}

export default class ImageController {
	/**
	 * @desc        Get user chats
	 * @route       GET /chat
	 * @access      public
	 */

	public static async getChats(req: Request, res: Response, next: NextFunction): Promise<Response> {
		const [user, err] = await UserActions.getUserFromCookeis(req)
		if (err) {
			return res.status(err.code).json(err.resBody)
		} else if (user) {
			const chats: Chat[] = await chatModel.getMyChats(user.id)
			let chatResp: ChatResponce[] = []
			for (const chat of chats) {
				const conterpartyId = chat.firstUser === user.id ? chat.secondUser : chat.firstUser
				const [interlocutor, err] = await UserActions.getUserById(conterpartyId)
				if (interlocutor) {
					let profile = await UserActions.getProfileData(interlocutor, user.id)
					chatResp.push({
						id: chat.id,
						interlocutorId: conterpartyId,
						interlocutorName: profile.firstName + ' ' + profile.lastName,
						interlocutorAvatar: profile.avatar?.thumbnail,
					})
				}
			}
			return res.status(200).json(ResManager.success(chatResp))
		}
		return res.sendStatus(500)
	}

	/**
	 * @desc        Post chat
	 * @route       POST /chat
	 * @access      public
	 */

	public static async postChat(req: Request, res: Response, next: NextFunction): Promise<Response> {
		// const [user, err] = await UserActions.getUserFromCookeis(req)

		// if (err) {
		// 	return res.status(err.code).json(err.resBody)
		// } else if (user) {
		// 	await imageModel.create({ userId: user.id, image: req.file.filename })
		// 	return res.status(201).json(ResManager.success({}, 'Image successfuly saved'))
		// }
		return res.sendStatus(500)
	}
}
