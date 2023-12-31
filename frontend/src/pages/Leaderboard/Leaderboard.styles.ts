import styled from 'styled-components';
import {Link} from 'react-router-dom';

export const Container = styled.div`
	text-align: center;

	h1 {
		padding: 32px 0;
	}

	.empty {
		filter: ${(p) =>
			p.theme.name === 'light' ? 'brightness(1)' : 'brightness(0.9)'};
	}

	.Federation {
		color: #4180db !important;
	}

	.Assembly {
		color: #a061d1 !important;
	}

	.Order {
		color: #ff6950 !important;
	}

	.Alliance {
		color: #33c47f !important;
	}
`;

export const FiltersContainer = styled.div`
	display: flex;
	justify-content: center;
	gap: 64px;
	margin-bottom: 32px;

	.player-count {
		text-align: center;
		display: flex;
		flex-direction: column;
		justify-content: center;
		font-size: 16px;
	}

	@media screen and (max-width: 768px) {
		flex-direction: column;
		gap: 24px;
		margin: 0 20%;
	}
`;

export const Slot = styled(Link)`
	display: flex;
	justify-content: space-between;
	text-decoration: none;
	color: ${(p) => p.theme.colors.text};
	margin: 24px 10%;
	background-color: ${(p) => p.theme.colors.secondary};
	border-radius: 8px;
	padding: 10px 5%;
	box-shadow: rgba(0, 0, 0, 0.2) 0px 2px 8px 0px;
	transition: transform 0.1s linear;

	:hover {
		transform: scale(1.01);
		background-color: ${(p) => p.theme.colors.hover};
	}

	@media screen and (max-width: 1200px) {
		.achievements,
		.games {
			display: none;
		}
	}

	@media screen and (max-width: 768px) {
		.wins,
		.ratio,
		.score {
			display: none;
		}
		justify-content: space-evenly;
		word-break: break-all;
	}
`;

export const Stat = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	text-align: center;

	@media screen and (max-width: 768px) {
		.rank-subtitle {
			display: none;
		}
	}
`;

export const Profile = styled.div`
	display: flex;
	width: 256px;

	.name-coalition {
		text-align: left;
	}

	img {
		width: 48px;
		height: 48px;
		box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
		margin: auto 10px;
		border-radius: 50%;
	}

	@media screen and (max-width: 768px) {
		width: 192px;
	}
`;
