import io from 'socket.io-client/dist/socket.io';
const connectionConfig = {
    jsonp: false,
    reconnection: true,
    reconnectionDelay: 100,
    reconnectionAttempts: 100000,
    transports: ['websocket']
   };
socket = io('http://localhost:80',connectionConfig);

module.exports={
    socket
}