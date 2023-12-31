import {ReactComponent as Deny} from '../assets/deny.svg';
import {ReactComponent as Accept} from '../assets/accept.svg';
import {useUserInfos} from 'contexts/User/userContent';
import {backend} from 'lib/backend';
import {IUser} from 'types/models';
import isUserIn from 'helpers/isUserIn';
import {openNotification} from 'helpers/openNotification';
import * as S from '../Social.styles';
import * as F from 'styles/font.styles';
import {useContext} from 'react';
import SocketContext from 'contexts/Socket/context';
import {ClientSocialEvents} from 'events/social.events';
import {addUserToFriends} from 'helpers/addUserToFriends';

interface IProps {
	user: IUser;
	onAccept: (user: IUser) => void;
	onDeny: (user: IUser) => void;
}

function PendingReceived({user, onAccept, onDeny}: IProps) {
	const {socket} = useContext(SocketContext).SocketState;
	const {userName} = useUserInfos();

	const fetchPendings = async (): Promise<{
		sentPendings: IUser[];
		receivedPendings: IUser[];
	}> => {
		const data = await backend.getPendingsOf(userName.userName);
		return {
			sentPendings: data.sentPendings || [],
			receivedPendings: data.receivedPendings || [],
		};
	};

	const handleAccept = async () => {
		const {receivedPendings} = await fetchPendings();

		if (!isUserIn(receivedPendings, user.name)) {
			openNotification('warning', `${user.name} can't be added`);
			onDeny(user);
			return;
		}

		addUserToFriends(userName.userName, user.name, socket);
		addUserToFriends(user.name, userName.userName, socket);
		onAccept(user);
		openNotification('success', `${user.name}'s request has been accepted`);
		socket?.emit(ClientSocialEvents.SendNotif, {
			sender: userName.userName,
			receiver: user.name,
			type: 'FRIEND_ACCEPT',
		});
	};

	const handleDeny = () => {
		backend.removePending(userName.userName, user.name);
		backend.removePending(user.name, userName.userName);
		onDeny(user);
		openNotification('error', `${user.name}'s request has been denied`);
		socket?.emit(ClientSocialEvents.SendNotif, {
			sender: userName.userName,
			receiver: user.name,
			type: 'FRIEND_DENY',
		});
	};

	return (
		<S.Pending>
			<S.HDivLink to={`/dashboard/${user.name}`}>
				<img className="avatar" src={user.image} />
				<F.H5>{user.name}</F.H5>
			</S.HDivLink>
			<S.HDiv>
				<button
					onClick={handleAccept}
					title="Accept"
					style={{border: 'none', background: 'none'}}
				>
					<Accept className="accept-icon" />
				</button>
				<button
					onClick={handleDeny}
					title="Deny"
					style={{border: 'none', background: 'none'}}
				>
					<Deny className="ignore-icon" />
				</button>
			</S.HDiv>
		</S.Pending>
	);
}

export default PendingReceived;
