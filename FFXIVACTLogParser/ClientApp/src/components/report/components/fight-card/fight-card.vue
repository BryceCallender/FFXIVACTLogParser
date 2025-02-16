<style scoped src="./fight-card.scss"></style>

<template>
    <div class="fight-container">
        <RouterLink :to="{ name: ReportRouteNames.Fight, params: { fight: fight.id } }">
            <div class="fight-content">
                <div class="fight-left-side">
                    <template v-if="fight.clear">
                        <i class="pi pi-check-circle"></i>
                    </template>
                    <template v-else>
                        <span
                            class="percentage"
                            :class="[ColorHelper.toPercentageColor(percentageDone)]">{{ `${fight.hpPercentageLeft}%` }}</span>
                    </template>
                </div>
                <div class="fight-right-side">
                    <div class="fight-pull-info" :class="{ clear: fight.clear }">
                        <span> {{ fight.id }} </span>
                        <span> {{ `(${getFightDuration(fight)})` }} </span>
                    </div>
                    <div class="fight-time">
                        {{ formatTime(fight.start) }}
                    </div>
                </div>
            </div>
            <ProgressBar
                v-if="!fight.clear"
                :value="percentageDone"
                class="fight-completion-bar"
                :pt="{
                    value: ColorHelper.toPercentageColor(percentageDone)
                }"
                :show-value="false">
            </ProgressBar>
        </RouterLink>
    </div>
</template>

<script setup lang="ts">
import { TimespanHelper } from '@/helpers/timespan.helper';
import { ColorHelper } from '@/helpers/color.helper';
import { Fight } from '@/models/fight.model';
import ProgressBar  from 'primevue/progressbar';
import { RouteNames as ReportRouteNames } from '../../report.routes';

const { fight } = defineProps<{
    fight: Fight;
}>();

const percentageDone = $computed(() => 100 - fight.hpPercentageLeft);

function getFightDuration(fight: Fight): string {
    const duration = TimespanHelper.toDuration(fight.start, fight.end);
    return `${duration.minutes ?? 0}:${duration.seconds ?? 0}`;
}

function formatTime(date: Date) {
  let hours = date.getHours();
  let minutes = date.getMinutes();
  const ampm = hours >= 12 ? "PM" : "AM";

  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  const paddedMinutes = minutes < 10 ? "0" + minutes : minutes;

  const strTime = hours + ":" + paddedMinutes + " " + ampm;
  return strTime;
}
</script>