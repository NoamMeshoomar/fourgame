<template>
    <div class="loading">
        <img src="../assets/loading.png" alt="">
    </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.loading {
    animation: spin 1s linear infinite;
    margin-bottom: 20px;
}

@keyframes spin {
    from {
        transform: rotate(0);
    }

    to {
        transform: rotate(360deg);
    }
}
</style>