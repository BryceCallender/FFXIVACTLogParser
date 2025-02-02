import { HitPoints } from "./hit-points.model";
import { ManaPoints } from "./mana-points.model";
import { CombatantLine } from "./parser/combatant-line.model";
import { Position } from "./position.model";

export class Combatant {
    name?: string;
    world?: string;
    level?: number;
    jobId?: number;

    hitPoints?: HitPoints;
    manaPoints?: ManaPoints;

    position?: Position;

    constructor(combatantLine: CombatantLine) {
        this.name = combatantLine.name;
        this.world = combatantLine.worldName;
        this.level = combatantLine.level;
        this.jobId = combatantLine.jobId;

        this.hitPoints = {
            current: combatantLine.currentHp,
            max: combatantLine.maxHp
        };

        this.manaPoints = {
            current: combatantLine.currentMp,
            max: combatantLine.maxMp
        };

        this.position = {
            x: combatantLine.positionX,
            y: combatantLine.positionY,
            z: combatantLine.positionZ,
            facing: combatantLine.positionFacing
        }
    } 
}