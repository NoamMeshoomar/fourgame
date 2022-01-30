<template>
    <div class="grid-container">
        <div class="grid">
            <div v-for="(row, index) in grid" :key="index" class="row">
                <div v-for="(cell, index) in row" :key="index" class="cell" @click="$emit('turn', index)">
                    <span v-if="cell" :class="[cell && cell == 1 ? 'player' : 'bot']"></span>
                </div>
            </div>
        </div>
        <div class="board-bottom"></div>
    </div>
</template>

<script>
export default {
    name: 'Grid',
    props: ["grid"]
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
</style>