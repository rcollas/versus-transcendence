import React, {useContext, useEffect, useRef, useState} from 'react';
import SocketContext from 'contexts/Socket/context';
import {Pong} from './pong';
import {useNavigate} from 'react-router-dom';
import {ClientGameEvents, ServerGameEvents} from 'events/game.events';
import Victory from 'components/Victory/Victory';
import Defeat from 'components/Defeat/Defeat';
import {useUserInfos} from 'contexts/User/userContent';
import Draw from '../../components/Draw/Draw';
import {useUpdateGameState} from './hooks/useUpdateGameState';
import {useSetupContext} from './hooks/useSetupContext';
import {openNotification} from '../../helpers/openNotification';
import {
	Avatar,
	Header,
	Name,
	Score,
	ScoreContainer,
	StyledGame,
	Vs,
} from './Game.styles';
import Versus from 'components/Versus';
import {useGameContext} from '../../contexts/Game/context';

export interface Lobby {
	id: string;
	createdAt: string;
	createdBy: string;
	clients: string[];
}

function Game() {
	const {socket} = useContext(SocketContext).SocketState;
	const pongRef = useRef<Pong>();
	const [showVictory, setShowVictory] = useState(false);
	const [showDefeat, setShowDefeat] = useState(false);
	const [showDraw, setShowDraw] = useState(false);
	const [showIntro, setShowIntro] = useState(true);
	const container = document.getElementById('container');
	const canvas = document.getElementById('playground') as HTMLCanvasElement;
	const [score, setScore] = useState({left: 0, right: 0});
	const username = useUserInfos().userName.userName;
	const navigate = useNavigate();
	useSetupContext(canvas);
	const {lobby, leftPlayer, rightPlayer} = useGameContext().GameState;

	useUpdateGameState(pongRef, setScore);

	useEffect(() => {
		console.log(`GAME LOBBY = `, lobby.id);
		if (!lobby.id) return;
		setTimeout(() => {
			setShowIntro(false);
		}, 2_300);
		setTimeout(() => {
			socket?.emit(ClientGameEvents.Ready, {lobbyId: lobby.id});
		}, 8_000);
		pongRef.current = new Pong(socket!, lobby.id, {isSpec: false});
		socket?.emit(ClientGameEvents.FetchSetup, {lobbyId: lobby.id});
		socket?.on(ServerGameEvents.Setup, (data) => {
			pongRef.current?.moveBall(data.ball.position, data.ball.velocity);
			pongRef.current?.movePaddle('left', data.leftPaddle.position);
			pongRef.current?.movePaddle('right', data.rightPaddle.position);
			data.timer ? pongRef.current?.updateTimer(data.timer) : 0;
			pongRef.current?.start();
		});
		return () => {
			socket?.off(ServerGameEvents.Setup);
			socket?.emit(ClientGameEvents.LeaveGame, {lobbyId: lobby.id});
		};
	}, [lobby.id]);

	useEffect(() => {
		socket?.on(ServerGameEvents.ClientLeft, () => {
			if (!showDraw && !showVictory && !showDefeat) {
				openNotification(
					'info',
					'Your opponent has left the battlefield. Coward!',
					'topRight'
				);
			}
			navigate('/');
		});
		socket?.on(ServerGameEvents.GameResult, (data) => {
			pongRef.current?.stop();
			switch (data.winner) {
				case 'draw':
					setShowDraw(true);
					break;
				case username:
					setShowVictory(true);
					break;
				default:
					setShowDefeat(true);
			}
		});
		return () => {
			socket?.off(ServerGameEvents.GameResult);
			socket?.off(ServerGameEvents.ClientLeft);
		};
	}, [socket]);

	return (
		<div>
			<Header>
				<Avatar
					className={'left__player'}
					alt={'left player avatar'}
					src={leftPlayer?.image}
				/>
				<ScoreContainer>
					<Score>{score.left}</Score>
					<Name className={'left__player'}>{leftPlayer?.name}</Name>
				</ScoreContainer>
				<Vs>VS</Vs>
				<ScoreContainer>
					<Score>{score.right}</Score>
					<Name className={'right__player'}>{rightPlayer?.name}</Name>
				</ScoreContainer>
				<Avatar
					className={'right__player'}
					alt={'right player avatar'}
					src={rightPlayer?.image}
				/>
			</Header>
			<StyledGame id="container">
				<canvas
					id="playground"
					width={container ? container.clientWidth : 1280}
					height={container ? container.clientHeight : 720}
					style={{width: '100%', height: '100%'}}
				/>
			</StyledGame>
			{showVictory && <Victory />}
			{showDefeat && <Defeat />}
			{showDraw && <Draw />}
			{showIntro && <Versus animation={'open'} />}
		</div>
	);
}

export default Game;
