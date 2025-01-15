<style scoped src="./app.scss"></style>

<template>
  <Header></Header>
  <div class="wrapper">
    <div class="zone-container">
      <img src="./assets/zone/112392.png">
      <div class="pull-content">
        <span>Features Rewritten</span>
        <span>Pull 1 (4:15) - 80%</span>
        <span>9:35PM - 9:39PM</span>
      </div>
      
    </div>
    <PartyList></PartyList>
    <UploadLogs></UploadLogs>
  </div>
</template>

<script setup lang="ts">
import { defineAsyncComponent } from 'vue';
import Header from './components/header/header.vue';
import UploadLogs from './components/upload-logs/upload-logs.vue';

const PartyList = defineAsyncComponent(() => import('./components/party-list/party-list.vue'));

import './utils/parser/parser-test';
</script>
