import { io } from "socket.io-client";

const socket = io("https://fourgame.herokuapp.com/");

export default socket;