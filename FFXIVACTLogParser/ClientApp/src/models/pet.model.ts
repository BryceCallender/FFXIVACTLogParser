import { Combatant } from "./combatant.model";
import { CombatantLine } from "./parser/combatant-line.model";

export class Pet extends Combatant {
    ownerId?: number;

    constructor(combatantLine: CombatantLine) {
        super(combatantLine);
        this.ownerId = combatantLine.ownerId;
    }
}