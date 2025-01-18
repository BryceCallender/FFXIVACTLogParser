import { CombatantLine } from "./combatant-line.model";

export class AddCombatantLine extends CombatantLine {
    constructor(lineContents: string[]) {
        super(lineContents);
    }
}