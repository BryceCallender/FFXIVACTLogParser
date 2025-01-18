import { ACTLine } from "./act-line.model";

export class CombatantLine extends ACTLine {
    name?: string;
    id?: number;
    jobId?: number;
    level?: number;
    ownerId?: number;
    worldId?: number;
    worldName?: string;
    bNpcNameId?: number;
    bNpcId?: number;
    currentHp?: number;
    maxHp?: number;
    currentMp?: number;
    maxMp?: number;
    positionX?: number;
    positionY?: number;
    positionZ?: number;
    positionFacing?: number;

    constructor(lineContents: string[]) {
        super(lineContents);
        this.id = parseInt(lineContents[2], 16);
        this.name = lineContents[3];
        this.jobId = parseInt(lineContents[4], 16);
        this.level = parseInt(lineContents[5], 16);
        this.ownerId = parseInt(lineContents[6], 16);
        this.worldId = parseInt(lineContents[7], 16);
        this.worldName = lineContents[8];
        this.bNpcNameId = parseInt(lineContents[9], 16);
        this.bNpcId = parseInt(lineContents[10], 16);
        this.currentHp = parseInt(lineContents[11]);
        this.maxHp = parseInt(lineContents[12]);
        this.currentMp = parseInt(lineContents[13]);
        this.maxMp = parseInt(lineContents[14]);
        this.positionX = parseFloat(lineContents[17]);
        this.positionY = parseFloat(lineContents[18]);
        this.positionZ = parseFloat(lineContents[19]);
        this.positionFacing = parseFloat(lineContents[20]);
    }
}