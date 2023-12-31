import {Link} from 'react-router-dom';
import styled from 'styled-components';

// prettier-ignore
export const Container = styled.div`
	position: relative;
	user-select: none;
	width: 40px;
	height: 40px;

	.avatar {
		cursor: pointer;
		border-radius: 50%;
		box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
	}

	@media only screen and (max-width: 768px) {
		.avatar {
			display: none;
		}
	}
`;

export const DropdownContainer = styled.div`
	display: flex;
	flex-direction: column;
	position: absolute;
	right: 0;
	width: 275px;
	border-radius: 8px;
	background-color: #151515;
	box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
	z-index: 90;

	@media only screen and (max-width: 768px) {
		position: fixed;
		width: 100%;
		height: 100%;
		align-items: center;
		border-radius: 0;
		z-index: 50;
		top: 0;

		.second-hr {
			margin: 16px 0;
			width: 60%;
		}
	}
`;

export const User = styled(Link)`
	background-color: ${(p) => p.theme.colors.main};
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: flex-start;
	padding-left: 1em;
	height: 64px;
	gap: 16px;
	border-radius: 8px 8px 0 0;
	color: white;

	img {
		width: 50px;
		height: 50px;
	}

	@media screen and (max-width: 768px) {
		height: 80px;
		width: 100%;
		border-radius: 0;
		padding: 0;
		justify-content: center;
		background-color: #202020;
		border-bottom: 1px solid white;
	}
`;

// prettier-ignore
export const LinksContainer = styled.div`
	display: flex;
	flex-direction: column;
	gap: 16px;
	padding: 1em;


	a, button {
		cursor: pointer;
		width: 100%;
		color: white;
		display: flex;
		gap: 1em;
		align-items: center;

		transition: all 0.1s linear;

		:hover {
			p {
				font-weight: 600;
			}
			transform: translateX(8px);
		}
	}

	svg {
		fill: white;
		width: 28px;
		height: 28px;
		border-radius: 0;
	}

	@media only screen and (max-width: 768px) {
		gap: 1.5em;

		p {
			font-weight: 600;
			font-size: 24px;
		}

		a, button {
			width: fit-content;
			margin: auto;
		}

		svg {
			display: none;
		}
	}
`;

export const PlayContainer = styled.div`
	color: white;
	display: flex;
	flex-direction: row;
	align-items: center;
	gap: 16px;
	padding: 0 0 -8px 0;
	top: 8px;
	background-color: transparent;
	border: none;

	@media screen and (max-width: 768px) {
		text-align: center;
		justify-content: center;
		button {
			font-size: larger;
		}
	}
`;

export const Content = styled.div`
	display: flex;
	flex-direction: column;
	gap: 8px;
`;

export const Button = styled.button`
	background: none;
	border: none;
	font-size: 16px;
	@media only screen and (max-width: 768px) {
		font-size: 8px;
	}
`;

export const GameMode = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	overflow: hidden;
	max-height: 0;
	padding: 0 8px;
	margin: 0 8px;
	gap: 4px;
	border-left: 1px solid white;
	transition: max-height 0.3s ease-in-out;

	&.active {
		margin: 8px;
		max-height: 500px;
	}

	@media only screen and (max-width: 768px) {
		border-left: none;
		gap: 8px;
	}
`;
