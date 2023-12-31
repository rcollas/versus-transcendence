import {Link} from 'react-router-dom';
import styled from 'styled-components';

export const Container = styled.div`
	user-select: none;
	margin-left: min(5%, 48px);
`;

export const Background = styled.video`
	z-index: -1;
	position: fixed;
	right: 0;
	bottom: 0;
	min-width: 100%;
	min-height: 100%;
	transform: translateX(calc((100% - 100vw) / 2));
`;

export const Image = styled.img`
	margin-top: 16px;
	margin-bottom: min(30%, 128px);
	width: clamp(300px, 50%, 512px);
`;

// prettier-ignore
export const LinksContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-start;


	a, button {
		text-decoration: none;
		cursor: pointer;
	}
`;

export const BoldLink = styled(Link)`
	position: relative;
	color: #fff;
	left: 0;
	font-size: clamp(32px, 4vw, 64px);
	font-weight: 600;
	text-shadow: 0px 0px 3px #cecece;
	transition: all 0.1s ease-in;

	:hover {
		left: 16px;
	}
`;

export const RegularLink = styled(Link)`
	position: relative;
	left: 0;
	font-size: 24px;
	color: #fff;
	line-height: 1.5;
	text-shadow: 0 0 2px #336cec;
	transition: all 0.1s ease-in;

	:hover {
		left: 8px;
	}
`;

export const BoldYellowButton = styled.div`
	border: none;
	background: transparent;

	position: relative;
	color: #f3c026;
	left: 0;
	font-weight: 600;
	font-size: clamp(32px, 4vw, 64px);
	text-shadow: 0px 0px 5px #bb7e29;
	cursor: pointer;
`;

export const RegularButton = styled.div`
	position: relative;
	left: 0;
	font-size: 24px;
	color: #fff;
	line-height: 1.5;
	text-shadow: 0 0 2px #336cec;
	border: none;
	background: none;
	transition: all 0.1s ease-in;

	:hover {
		left: 8px;
	}
`;

export const UserInfo = styled(Link)`
	position: fixed;
	bottom: min(30%, 128px);
	right: min(5%, 48px);
	text-align: right;
	text-decoration: none;
`;

export const UserName = styled.p`
	font-size: clamp(24px, 4vw, 50px);
	font-weight: 600;
	color: #fff;
	text-shadow: 0px 0px 3px #fff;
`;

export const UserAchievements = styled.div`
	color: rgba(255, 255, 255, 0.75);
	font-size: clamp(16px, 3vw, 22px);
	text-shadow: 0 0 2px rgb(0, 0, 0);
`;

export const GameMode = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	overflow: hidden;
	max-height: 0;
	transition: max-height 0.3s ease-in-out;
	padding: 0 8px;
	margin: 0 8px;
	gap: 4px;
	border-left: 1px solid white;

	&.active {
		max-height: 500px;
	}
`;
