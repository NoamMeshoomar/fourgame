import { io } from "socket.io-client";

const socket = io("https://fourgamenoam-a312a0b536d0.herokuapp.com/");

export default socket;