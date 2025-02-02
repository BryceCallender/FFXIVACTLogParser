<style scoped src="./app.scss"></style>

<template>
  <Header></Header>
  <RouterView />
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import Header from './components/header/header.vue';
import supabase from './supabase-client';
import { useParserUploadStore } from '@/store';

import './utils/parser/parser-test';

const store$ = useParserUploadStore();

onMounted(async () => {
  await supabase.auth.getSession().then(({ data }) => {
    store$.session = data.session;
  });

  supabase.auth.onAuthStateChange((_, _session) => {
    store$.session = _session;
  });

  store$.fetchZones();
})
</script>
