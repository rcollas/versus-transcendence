import DarkMode from 'components/DarkMode';
import { H1Title, NormalText } from 'components/Text';
import DefaultAvatar from 'components/UploadAvatar/Images/DefaultAvatar.png';
import { useContext, useState } from 'react';
import UserContext from 'components/Context/userContent';
// import Menu from "../Menu";
import avatar from './assets/default-avatar.svg';
import { StyledNav } from './Navbar.styled';
import './styles.css';

function displayMenu() {
	const [toggleMenu, setToggleMenu] = useState(false);
	const userContext = useContext(UserContext);

	const toggletnavclicked = () => {
		setToggleMenu(!toggleMenu);
	};

	return (
		<div className={styles['Nav-link-container-nickmenu']}>
			{toggleMenu && <Menu />}
			<button className="menuButton" onClick={toggletnavclicked}>
				<img style={{ width: '50px' }} src={avatar} />
			</button>
		</div>
	);
}

function Divider() {
	return <div className={styles.divider} />;
}

export const Menu = () => {
	return (
		<div className={styles['links-containers-logged']}>
			<div className="DarkMode">{DarkMode()}</div>
			<div>{'Divider' && Divider()}</div>
			<div>{displayMenu()}</div>
		</div>
	);
};

const Navbar: React.FC = () => {
	// get user context

	return (
		<StyledNav>
			<img src="logo.svg" />
			{/* <DarkMode /> */}
			{/* {isLogged ? <Avatar /> : <Register />} */}
			<button>Toggle Theme</button>
		</StyledNav>
		// <nav className={styles.navbar}>
		// 	<H1Title fontSize={'36px'} fontWeight={'700'} string={'24px'}>
		// 		PONG
		// 	</H1Title>
		// </nav>
	);
};

export default Navbar;