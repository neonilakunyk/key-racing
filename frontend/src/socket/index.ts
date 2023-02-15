import { io } from 'socket.io-client';
import { createContext } from 'react';

const socket = io();
const SocketContext = createContext(socket);
const { Provider } = SocketContext;

export { socket, Provider, SocketContext };
