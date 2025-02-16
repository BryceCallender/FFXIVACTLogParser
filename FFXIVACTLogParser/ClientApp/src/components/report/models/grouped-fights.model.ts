import { Fight } from "@/models/fight.model";
import { Zone } from "@/models/zone.model";

export interface GroupedFights {
    zone: Zone;
    fights: Fight[];
}