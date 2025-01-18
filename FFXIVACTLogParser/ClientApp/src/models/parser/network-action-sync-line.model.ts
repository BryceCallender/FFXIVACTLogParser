import { ACTLine } from "./act-line.model";

export class NetworkActionSyncLine extends ACTLine {
    id?: number;
    name?: string;
    sequenceId?: any;
    currentHp?: number;
    maxHp?: number;
    currentMp?: number;
    maxMp?: number;
    currentShield?: number;
    positionX?: number;
    positionY?: number;
    positionZ?: number;
    positionFacing?: number;

    constructor(lineContents: string[]) {
        super(lineContents);
        this.id = parseInt(lineContents[2], 16);
        this.name = lineContents[3];
        this.sequenceId = parseInt(lineContents[4], 16);
        this.currentHp = parseInt(lineContents[5]);
        this.maxHp = parseInt(lineContents[6]);
        this.currentMp = parseInt(lineContents[7]);
        this.maxMp = parseInt(lineContents[8]);
        this.currentShield = parseInt(lineContents[9]);
        this.positionX = parseFloat(lineContents[11]);
        this.positionY = parseFloat(lineContents[12]);
        this.positionZ = parseFloat(lineContents[13]);
        this.positionFacing = parseFloat(lineContents[14]);
    }
}