import EditAvatar from 'components/EditAvatar';
import EditName from 'components/EditName';
import * as F from 'styles/font.styles';
import * as S from './Registration.styles';
import './styles.css';

const Registration = () => {
	return (
		<S.Container>
			<F.H2>Create Your Profile</F.H2>
			<S.Form>
				<EditAvatar />
				<EditName />
			</S.Form>
		</S.Container>
	);
};

export default Registration;