<style scoped src="./report.scss"></style>

<template>
    <div> {{ reportKey }} </div>
</template>

<script setup lang="ts">

const { reportKey } = defineProps<{
    reportKey?: string;
}>();
</script>