<template>
    <div class="popup">
        <div v-if="winnerPopup">
            <h3>{{color === 1 ? "You" : "Bot"}} won the game!</h3>
            <button @click="$emit('reset')">Restart</button>
        </div>
        <h3 v-if="message">{{message}}</h3>
    </div>
</template>

<script>
export default {
    props: ["winnerPopup", "color", "message"]
}
</script>

<style scoped>
.popup {
    position: absolute;
    padding: 20px;
    background-color: grey;
    border-radius: 10px;
}

.popup div {
    display: flex;
    justify-content: center;
    align-self: center;
    flex-direction: column;
}

.popup div h3 {
    color: white;
    font-size: 28px;
    font-weight: 500;
}
</style>