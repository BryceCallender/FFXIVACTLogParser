import { ACTLine } from "./act-line.model";

export class NetworkDoTLine extends ACTLine {
    id?: number;
    name?: string;
    which?: string;
    effectId?: number;
    damage?: number;
    currentHp?: number;
    maxHp?: number;
    currentMp?: number;
    positionX?: number;
    positionY?: number;
    positionZ?: number;
    positionFacing?: number;
    sourceId?: number;
    source?: string;
    damageType?: number;
    sourceCurrentHp?: number;
    sourceMaxHp?: number;
    sourceCurrentMp?: number;
    sourceMaxMp?: number;
    sourcePositionX?: number;
    sourcePositionY?: number;
    sourcePositionZ?: number;
    sourceFacing?: number;

    constructor(lineContents: string[]) {
        super(lineContents);
        this.id = parseInt(lineContents[2], 16);
        this.name = lineContents[3];
        this.which = lineContents[4];
        this.effectId = parseInt(lineContents[5], 16);
        this.damage = parseInt(lineContents[6], 16);
    }
}