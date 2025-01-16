import { ACTLine } from "./act-line.model";

export class NetworkUpdateHpLine extends ACTLine {
    id?: number;
    name?: string;
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
        this.currentHp = parseInt(lineContents[4]);
        this.maxHp = parseInt(lineContents[5]);
        this.currentMp = parseInt(lineContents[6]);
        this.maxMp = parseInt(lineContents[7]);
        this.positionX = parseFloat(lineContents[10]);
        this.positionY = parseFloat(lineContents[11]);
        this.positionZ = parseFloat(lineContents[12]);
        this.positionFacing = parseFloat(lineContents[13]);
    }
}