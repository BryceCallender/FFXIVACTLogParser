import { Zone } from "@/models/zone.model";

export interface ZoneState {
    zones?: Record<number, Zone>;
}