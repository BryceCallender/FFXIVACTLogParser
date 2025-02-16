import { defineStore } from 'pinia';
import { ReportState } from './state';
import { FFXIVMapper } from '@/mappers/ffxiv.mapper';

export const useReportStore = defineStore('report', {
    state: (): ReportState => ({
        report: null,
    }),
    getters: {
        
    },
    actions: {
        async fetch (key?: string): Promise<void> {
            const { ReportClient } = await import('@BFFAPI/bff');

            const client = new ReportClient();

            await client.report(key).then(resp => {
                this.report = FFXIVMapper.toReport(resp);
            });
        }
    },
});