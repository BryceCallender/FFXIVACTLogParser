import { defineStore } from 'pinia';
import { ZoneState } from './state';
import { FFXIVMapper } from '@/mappers/ffxiv.mapper';

export const useZoneStore = defineStore('zones', {
    state: (): ZoneState => ({
        zones: {},
    }),
    getters: {

    },
    actions: {
        async initalize(): Promise<void> {
            await this.fetchZones();
        },
        async fetchZones(): Promise<void> {
            const { ReportClient } = await import('@BFFAPI/bff');

            const client = new ReportClient();
            await client.zones().then(resp => {
                this.zones = FFXIVMapper.toZones(resp.zones);
            });
        },
    },
});