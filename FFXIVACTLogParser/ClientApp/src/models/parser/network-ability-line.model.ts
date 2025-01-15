import { ACTLine } from "./act-line.model";

export class NetworkAbilityLine extends ACTLine {
    sourceId?: number;
    source?: string;
    id?: number;
    ability?: string;
    targetId?: number;
    target?: string;
    flags?: number;
    damage?: number;
    targetCurrentHp?: number;
    targetMaxHp?: number;
    targetCurrentMp?: number;
    targetMaxMp?: number;
    targetCurrentTp?: number;
    targetMaxTp?: number;
    targetX?: number;
    targetY?: number;
    targetZ?: number;
    targetFacing?: number;
    currentHp?: number;
    maxHp?: number;
    currentMp?: number;
    maxMp?: number;
    currentTp?: number;
    maxTp?: number;
    positionX?: number;
    positionY?: number;
    positionZ?: number;
    positionFacing?: number;
    sequence?: number;
    targetIndex?: number;
    targetCount?: number;
    ownerId?: number;
    ownerName?: number;
    effectDisplayType?: number;
    actionId?: number;
    actionAnimationId?: number;
    animationLockTime?: number;
    rotationHex?: number;

    constructor(lineContents: string[]) {
        super(lineContents);
        this.sourceId = parseInt(lineContents[2], 16);
        this.source = lineContents[3];
        this.id = parseInt(lineContents[4], 16);
        this.ability = lineContents[5];
        this.targetId = parseInt(lineContents[6], 16);
        this.target = lineContents[7];
        this.flags = parseInt(lineContents[8], 16);
        this.damage = parseInt(lineContents[9], 16);
        //24
    }
}