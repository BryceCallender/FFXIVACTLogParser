<style scoped src="./party-member.scss"></style>

<template>
    <div class="party-memeber">
        <img :src="jobAsset"/>
        <span class="member-name"> {{ name }}</span>
    </div>
</template>

<script setup lang="ts">
const { job, name } = defineProps<{
    job: string;
    name: string;
}>();

const jobAsset = $computed(() => new URL(`../../assets/job-icons/${job.toLowerCase().replace(' ', '_')}.png`, import.meta.url).href);
</script>