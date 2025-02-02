import { CombatantLine } from "./combatant-line.model";

export class RemoveCombatantLine extends CombatantLine {
    constructor(lineContents: string[]) {
        super(lineContents);
    }

    minimal() {
        return {
            ...super.minimal()
        };
    }
}