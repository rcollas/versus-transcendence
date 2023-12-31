import React, {PropsWithChildren, useEffect, useReducer, useState} from 'react';
import {useSocket} from 'hooks/useSocket';
import {
	defaultSocketContextState,
	SocketContextProvider,
	SocketReducer,
} from './context';
import {useUserInfos} from '../User/userContent';
import {useNavigate} from 'react-router-dom';

export interface ISocketContextComponentProps extends PropsWithChildren {}

const SocketContextComponent: React.FunctionComponent<
	ISocketContextComponentProps
> = (props) => {
	const {children} = props;

	const [SocketState, SocketDispatch] = useReducer(
		SocketReducer,
		defaultSocketContextState
	);
	const [loading, setLoading] = useState(true);
	const name = useUserInfos().userName.userName;
	const socket = useSocket('/', {
		reconnectionAttempts: 5,
		reconnectionDelay: 5000,
		autoConnect: false,
		query: {
			name: name,
		},
	});

	useEffect(() => {
		if (!name) {
			setLoading(false);
			return;
		}
		socket.io.opts.query!.name = name;
		socket.connect();
		SocketDispatch({type: 'update_socket', payload: socket});
		StartListeners();
		SendHandshake();
	}, [name]);

	const StartListeners = () => {
		socket.io.on('reconnect', (attempt) => {
			console.info(`Reconnected on attempt: `, attempt);
		});
		socket.io.on('reconnect_attempt', (attempt) => {
			console.info(`Reconnection attempt: `, attempt);
		});
		socket.io.on('reconnect_error', (error) => {
			console.error(`Reconnection error: `, error);
		});
		socket.io.on('reconnect_failed', () => {
			alert(`We are unable to connect you to the websocket.`);
		});
		socket.io.on('error', (error) => {
			console.error(`Socket error: `, error);
		});
	};
	const SendHandshake = () => {
		console.info(`Sending handshake to server...`);

		socket.emit('handshake');
		socket.on('handshake', (name: string, users: string[]) => {
			SocketDispatch({type: 'update_name', payload: name});
			SocketDispatch({type: 'update_users', payload: users});
			setLoading(false);
			console.info(`Handshake completed.`);
		});
	};

	useEffect(() => {
		socket.on('user_connected', (users: string[]) => {
			SocketDispatch({type: 'update_users', payload: users});
		});

		socket.on('disconnect', (name: string) => {
			console.info('User disconnected');
			SocketDispatch({type: 'remove_user', payload: name});
		});

		socket.on('user_disconnected', (users: string[]) => {
			SocketDispatch({type: 'update_users', payload: users});
		});
		socket.on('exception', (error: string) => {
			console.error(`Socket error: `, error);
		});

		return () => {
			socket.off('user_connected');
			socket.off('disconnect');
			socket.off('user_disconnected');
			socket.off('error');
		};
	}, []);

	if (loading) return <p>Loading socket IO...</p>;

	return (
		<SocketContextProvider value={{SocketState, SocketDispatch}}>
			{children}
		</SocketContextProvider>
	);
};

export default SocketContextComponent;
