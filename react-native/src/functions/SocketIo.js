import io from 'socket.io-client/dist/socket.io';
const connectionConfig = {
    jsonp: false,
    reconnection: true,
    reconnectionDelay: 100,
    reconnectionAttempts: 100000,
    transports: ['websocket']
   };
socket = io('https://kitapsatis.herokuapp.com',connectionConfig);

module.exports={
    socket
}