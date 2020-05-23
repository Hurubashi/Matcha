import React from 'react'
import { Box, Typography, Avatar, ButtonBase } from '@material-ui/core/'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import { Chat } from '../../reducers/ChatListReducer'
import { State } from '../../reducers/RequestReducer'
import styles from './chatsListStyles'

interface Props {
	setChat: React.Dispatch<React.SetStateAction<Chat | null>>
	chatListState: State<Chat[]>
}

const ChatList: React.FC<Props> = (props: Props) => {
	const cl = styles()
	const { setChat, chatListState } = props

	return (
		<Box className={cl.chatsList}>
			<Box className={cl.chatListHeader}>
				<Typography variant='h5' style={{ alignSelf: 'center' }}>
					Messages
				</Typography>
			</Box>
			<Box>
				{chatListState.status === 'success' &&
					chatListState.data.map((chat, idx) => {
						return (
							<ButtonBase className={cl.chatItem} key={idx} onClick={() => setChat(chat)}>
								<Avatar className={cl.chatItemAvatar} alt='avatar' src={chat.interlocutorAvatar} />
								<Box style={{ overflow: 'hidden' }}>
									<Typography className={cl.chatName}>{chat.interlocutorName}</Typography>
									<Typography className={cl.chatTime}>
										{chat.lastMsg?.time ? new Date(chat.lastMsg.time).toLocaleString() : ''}
									</Typography>
									<Box style={{ display: 'flex' }}>
										{chat.interlocutorId === chat.lastMsg?.senderId && <ArrowBackIcon fontSize='small' />}
										{/* {chat.msgStatus === 'unreaded' && <FiberManualRecordIcon fontSize='small' color='error' />} */}
										<Typography className={cl.chatMessage}>{chat.lastMsg?.text || 'No messages'}</Typography>
									</Box>
								</Box>
							</ButtonBase>
						)
					})}
			</Box>
		</Box>
	)
}

export default ChatList
