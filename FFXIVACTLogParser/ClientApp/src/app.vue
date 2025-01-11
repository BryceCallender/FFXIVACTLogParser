<style scoped src="./app.scss"></style>

<template>
  <header>
    <img alt="Vue logo" class="logo" src="./assets/logo.svg" width="125" height="125" />

    <div class="wrapper">
      <h1> {{ title }} </h1>
    </div>
  </header>
</template>

<script setup lang="ts">
import { defineAsyncComponent } from 'vue';

const PartyList = defineAsyncComponent(() => import('./components/party-list/party-list.vue'));

const title = $ref('FFXIV ACT Log parser');
</script>
