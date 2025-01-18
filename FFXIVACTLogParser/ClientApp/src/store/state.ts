import { Encounter } from "@/models/encounter.model";
import { ACTLine } from "@/models/parser/act-line.model";
import { Zone } from "@/models/zone.model";

export interface ParseUploadState {
    zones?: Record<number, Zone>;
    encounters?: Encounter[];
}