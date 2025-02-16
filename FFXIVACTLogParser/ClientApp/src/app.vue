<style scoped src="./app.scss"></style>

<template>
  <Header></Header>
  <RouterView />
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import Header from './components/header/header.vue';
import { useZoneStore } from '@/stores/zone-store';

// import './utils/parser/parser-test';

const store$ = useZoneStore();

onMounted(async () => {
  store$.fetchZones();
})
</script>
