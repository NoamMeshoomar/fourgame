<template>
    <div class="app">
        <p class="bottom-message">{{started && !myTurn ? "WAIT FOR YOUR TURN!" : ""}}</p>
        <Menu v-if="!started" @start="start" />
        <Popup v-if="betweenRounds" :winnerPopup="winner" :color="winner" :message="message" @reset="reset" />
        <Grid v-if="started" :grid="grid" :loading="loading" @turn="turn" />
    </div>
</template>

<script>
import Menu from "./components/Menu.vue";
import Popup from "./components/Popup.vue"
import Grid from "./components/Grid.vue";

import socket from "./utils/socketIOConnection";

export default {
    name: 'App',
    components: {
        Menu,
        Popup,
        Grid
    },
    data() {
        return {
            started: false,
            betweenRounds: false,
            grid: [],
            winner: null,
            myTurn: true,
            loading: false
        }
    },
    methods: {
        start() {
            socket.emit("CREATE_GAME");
            this.started = true;
            this.loading = true;
        },
        turn(rowPos) {
            if(!this.myTurn)
                return;
            socket.emit("TURN", rowPos);
        },
        reset() {
            this.start();
            this.betweenRounds = false;
            this.winner = null;
            this.myTurn = true;
        }
    },
    mounted() {
        socket.on("GAME_CREATED", (grid) => {
            this.grid = grid;
            this.loading = false;
        });

        socket.on("TURN", (pos, color) => {
            this.myTurn = false;
            const [col, row] = pos;
            if(color == 2) {
                setTimeout(() => {
                    this.grid[col][row] = color;
                    this.myTurn = true;
                }, 1500);
            } else {
                this.grid[col][row] = color;
            }
        });

        socket.on("WON", (color) => {
            this.betweenRounds = true;
            this.winner = color;
            this.myTurn = true;
        });
    }
}
</script>

<style>
*,
*::before,
*::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    overflow: hidden;
    font-family: 'Rubik', sans-serif;
}

.app {
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    background-color: rgb(54, 54, 54);
}

button {
    margin: 20px;
    padding: 10px 20px;
    width: fit-content;
    background-image: linear-gradient(to bottom left, #ffed00, #ff0000);
    font-size: 26px;
    font-weight: 600;
    color: white;
    border: none;
    border-radius: 10px;
    align-self: center;
    transition: all 300ms ease;
    box-shadow: 0px 6px 8px rgba(0, 0, 0, 0.2);
    cursor: pointer;
}

button:hover {
    background-image: linear-gradient(to top right, #ffed00, #ff0000);
    transform: scale(1.2);
}

.bottom-message {
    position: absolute;
    color: white;
    margin-bottom: 20px;
    font-size: 22px;
    top: 80px;
}
</style>