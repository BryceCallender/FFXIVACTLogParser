<style scoped src="./report.scss"></style>

<template>
    <div class="report-container">
        <div class="report-header">
            <template v-if="report">
                <span class="report-name"> {{ report?.name }} </span>
                <span class="report-date"> {{ report?.created.toDateString() }} at {{ report?.created.toTimeString() }}
                </span>
            </template>
            <template v-else>
                <Skeleton width="10rem" height="2rem"></Skeleton>
                <Skeleton width="30rem" height="1.5rem"></Skeleton>
            </template>
        </div>
        <div class="report-content">
            <template v-if="Object.keys(groupedFights).length">
                <Panel v-for="(groupedFights, zoneId) in groupedFights" :key="zoneId">
                    <template #header>
                        <div class="report-panel-header">
                            <img class="zone-image" :src="getImageUrl(groupedFights.zone?.image)" />
                            <div class="grouped-fight-header">
                                {{ groupedFights.zone?.name }}
                            </div>
                        </div>
                    </template>
                    <div class="fights-container">
                        <template v-for="fight in groupedFights.fights" :key="fight">
                            <FightCard :fight="fight"></FightCard>
                        </template>
                    </div>
                </Panel>
            </template>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { useReportStore } from './store';
import { useZoneStore } from '@/stores/zone-store';
import { storeToRefs } from 'pinia';
import Skeleton from 'primevue/skeleton';
import Panel from 'primevue/panel';
import { GroupedFights } from './models/grouped-fights.model';

import FightCard from './components/fight-card/fight-card.vue';

const { reportKey } = defineProps<{
    reportKey?: string;
}>();

const report$ = useReportStore();
const { report } = $(storeToRefs(report$));

const zone$ = useZoneStore();
const { zones } = $(storeToRefs(zone$));

const groupedFights = computed(() => {
    const groupedFights = {} as Record<number, GroupedFights>;

    report?.fights?.forEach(f => {
        if (!groupedFights[f.zoneId]) {
            groupedFights[f.zoneId] = {
                zone: zones[f.zoneId],
                fights: []
            };
        }

        groupedFights[f.zoneId].fights.push(f);
    });

    return groupedFights;
});

function getImageUrl(imageName: string) {
    return new URL(`../../assets/zone/${imageName}.png`, import.meta.url).href;
}

onMounted(() => {
    report$.fetch(reportKey);
});
</script>