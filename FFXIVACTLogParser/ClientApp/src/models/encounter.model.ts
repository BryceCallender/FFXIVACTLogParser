import { Combatant } from "./combatant.model";

export interface Encounter {
    // party
    players?: Combatant[];

    // npcs
    npcs?: Combatant[];

    // clear information
    isClear?: boolean;
    percentage?: number;

    startTime?: Date;
    endTime?: Date;
}