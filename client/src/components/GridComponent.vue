<template>
    <div class="grid-container">
        <div class="grid" v-if="!loading">
            <div v-for="(row, index) in grid" :key="index" class="row">
                <div v-for="(cell, index) in row" :key="index" class="cell" @click="$emit('turn', index)">
                    <span v-if="cell" :class="[cell && cell == 1 ? 'player' : 'bot']"></span>
                </div>
            </div>
        </div>
        <LoadingComponent v-if="loading" />
        <div class="board-bottom"></div>
    </div>
</template>

<script>
import LoadingComponent from "./LoadingComponent.vue";

export default {
    name: 'GridComponent',
    components: {
    LoadingComponent
},
    props: ["grid", "loading"]
}
</script>

<style scoped>
.grid-container {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}

.grid {
    padding: 10px;
    background-color: rgb(22, 60, 165);
}

.grid .row {
    display: flex;
    justify-content: center;
    align-items: center;
}

.grid .row .cell {
    margin: 5px;
    width: 100px;
    height: 100px;
    display: flex;
    justify-content: center;
    align-content: center;
    background-color: white;
    border: 2px solid rgb(22, 60, 165);
    border-radius: 50%;
    cursor: pointer;
}

.grid .row .cell .player,
.grid .row .cell .bot {
    width: 100%;
    height: auto;
    border-radius: 50%;
    animation: fall 1s ease;
}

.grid .row .cell .player {
    background-color: red;
}

.grid .row .cell .bot {
    background-color: yellow;
}

.board-bottom {
    background-color: rgb(22, 60, 165);
    width: 900px;
    height: 50px;
}

@keyframes fall {
    from {
        transform: translateY(-1000px);
    }

    to {
        transform: translateY(0);
    }
}
</style>