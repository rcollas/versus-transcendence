import {Dispatch, SetStateAction} from 'react';
import * as F from 'styles/font.styles';
import ViewProfile from 'components/Buttons/Social/ViewProfile';
import Invite from 'components/Buttons/Social/Invite';
import Message from 'components/Buttons/Social/Message';
import AddFriend from 'components/Buttons/Social/AddFriend';
import RemoveFriend from 'components/Buttons/Social/RemoveFriend';
import BlockUser from 'components/Buttons/Social/BlockUser';
import Mute from 'components/Buttons/Channel/Mute';
import Ban from 'components/Buttons/Channel/Ban';
import * as S from '../../Social/Social.styles';
import User from 'mocks/Users/players.json';
import ActivityStatus from 'components/ActivityStatus';
import {Divider} from 'antd';
import {ReactComponent as Close} from 'assets/close.svg';
import * as C from './containers.styles'
import {IUser} from '../../../types/models';

interface IProps {
	setOpenUserPanel: Dispatch<SetStateAction<boolean>>;
}

const user = Array.from(User.players)[0] as IUser;

function UserPanel({setOpenUserPanel}: IProps) {
	return (
		<C.UserPanel>
			<S.DrawerTitle>
				<F.H3>{user.name}</F.H3>
				<Close onClick={() => setOpenUserPanel(false)} />
			</S.DrawerTitle>
			<S.FriendDetails>
				<img className="drawer__avatar" src={user.image} alt="user avatar" />
				<ActivityStatus state={user.status} />
			</S.FriendDetails>
			<Divider style={{backgroundColor: '#bbbbbb'}} />
			<S.FriendOptions>
				<ViewProfile user={user.name} />
				<Invite id={user.name} />
				<Message user={user.name} />
				<AddFriend user={user} />
				<RemoveFriend user={user} />
				<BlockUser user={user} />
				<Mute id={1} />
				<Ban id={1} />
			</S.FriendOptions>
		</C.UserPanel>
	);
}

export default UserPanel;