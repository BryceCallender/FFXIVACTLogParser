import { Encounter } from "@/models/encounter.model";

export interface ParseUploadState {
    encounters?: Encounter[];
    progress?: number;
    uploadReportKey?: string;
}