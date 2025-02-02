import { Encounter } from "@/models/encounter.model";
import { Zone } from "@/models/zone.model";
import { Session } from "@supabase/supabase-js";

export interface ParseUploadState {
    zones?: Record<number, Zone>;
    encounters?: Encounter[];
    progress?: number;
    uploadReportKey?: string;
    session?: Session;
}