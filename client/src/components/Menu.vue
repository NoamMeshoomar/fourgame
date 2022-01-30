<template>
    <div class="menu-screen">
        <h1>Four Game</h1>
        <button @click="$emit('start')">Start</button>
    </div>
</template>

<style scoped>
.menu-screen {
    display: flex;
    justify-content: center;
    align-content: center;
    flex-direction: column;
}

.menu-screen h1 {
    font-size: 38px;
    font-weight: 500;
    color: white;
}
</style>