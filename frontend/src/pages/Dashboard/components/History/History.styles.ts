import {Link} from 'react-router-dom';
import styled from 'styled-components';

export const Container = styled.div`
	grid-area: 2/1/3/2;
	margin-top: 16px;
`;

interface IHistoryProps {
	empty: boolean;
}

export const History = styled.div<IHistoryProps>`
	margin-top: 48px;
	display: flex;
	justify-content: space-evenly;

	.empty {
		position: relative;
		top: 48px;
		filter: ${(p) =>
			p.theme.name === 'light' ? 'brightness(1)' : 'brightness(0.9)'};
	}

	@media screen and (max-width: 1280px) {
		.empty {
			top: -24px;
		}
	}

	@media screen and (max-width: 768px) {
		justify-content: ${(p) => (p.empty ? 'space-evenly' : 'initial')};
		overflow-x: auto;
		gap: 48px;
		padding: 24px 8px;

		.empty {
			justify-items: left;
		}
	}
`;

export const CardContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 24px;

	svg {
		width: 40px;
		height: 40px;
		border-radius: 50%;
		box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
	}

	@media screen and (max-width: 1600px) {
		svg {
			width: 32px;
			height: 32px;
		}
	}
`;

interface ICardProps {
	result: string;
}

export const Card = styled(Link)<ICardProps>`
	color: ${(p) => p.theme.colors.text};
	background-color: ${(p) => p.theme.colors.secondary};
	box-shadow: ${(p) =>
		p.result === 'win'
			? 'rgba(75, 174, 79, 1) 0px 0px 6px'
			: p.result === 'loss'
			? 'rgba(224, 79, 95, 1) 0px 0px 6px'
			: 'rgba(254, 192, 6, 1) 0px 0px 6px'};

	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	text-align: center;
	padding: 16px;
	gap: 16px;
	border-radius: 8px;
	width: 192px;
	height: 256px;
	user-select: none;
	text-decoration: none;

	img {
		border-radius: 50%;
		width: 80px;
		height: 80px;
		box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
	}

	transition: all 0.1s linear;
	:hover {
		background-color: ${(p) => p.theme.colors.hover};
		transform: translateY(-8px);
	}

	@media screen and (max-width: 1600px) {
		width: 128px;
		height: 192px;

		img {
			width: 48px;
			height: 48px;
		}
	}
`;

export const Result = styled.div`
	display: flex;
`;
