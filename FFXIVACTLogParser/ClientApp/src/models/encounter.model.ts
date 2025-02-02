import { Combatant } from "./combatant.model";
import { ACTLine } from "./parser/act-line.model";
import { Zone } from "./zone.model";

export interface Encounter {
    zone?: Zone;

    // party
    playerMap?: Record<number, Combatant>;

    // pets
    petMap?: Record<number, Combatant>;

    // npcs
    bossNpcMap?: Record<number, Combatant>;

    // everyone
    allCombatantMap?: Record<number, Combatant>;

    events?: ACTLine[];

    pullNumber?: number;

    // clear information
    isClear?: boolean;
    percentage?: number;

    startTime?: Date;
    endTime?: Date;
}