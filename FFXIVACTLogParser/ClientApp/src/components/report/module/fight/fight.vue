<style scoped src="./fight.scss"></style>

<template>
    <div> {{ fight }}</div>
</template>

<script setup lang="ts">

const { fight } = defineProps<{
    fight: number;
}>(); 
</script>