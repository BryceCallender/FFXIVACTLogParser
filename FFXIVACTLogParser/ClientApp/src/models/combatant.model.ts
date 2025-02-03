import { HitPoints } from "./hit-points.model";
import { ManaPoints } from "./mana-points.model";
import { CombatantLine } from "./parser/combatant-line.model";
import { Pet } from "./pet.model";
import { Position } from "./position.model";

export class Combatant {
    id?: number;
    name?: string;
    world?: string;
    level?: number;
    jobId?: number;

    hitPoints?: HitPoints;
    manaPoints?: ManaPoints;

    position?: Position;

    pets?: Pet[];

    constructor(combatantLine: CombatantLine) {
        this.id = combatantLine.id;
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

        this.pets = [];
    } 
}