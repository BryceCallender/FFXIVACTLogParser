import { ACTLine } from "./act-line.model";

export class NetworkStatusEffects extends ACTLine {
    targetId?: number;
    target?: string;
    jobLevelData?: number;
    hp?: number;
    maxHp?: number;
    mp?: number;
    maxMp?: number;
    currentShield?: number;
    positionX?: number;
    positionY?: number;
    positionZ?: number;
    positionFacing?: number;
    data0?: number;
    data1?: number;
    data2?: number;
    data3?: number;
    data4?: number;
    data5?: number;

    constructor(lineContents: string[]) {
        super(lineContents);
        this.targetId = parseInt(lineContents[2], 16);
        this.target = lineContents[3];
        this.jobLevelData = parseInt(lineContents[4], 16);
        this.hp = parseInt(lineContents[5]);
        this.maxHp = parseInt(lineContents[6]);
        this.mp = parseInt(lineContents[7]);
        this.maxMp = parseInt(lineContents[8]);
        // todo: this.currentShield = 
        this.positionX = parseFloat(lineContents[11]);
        this.positionY = parseFloat(lineContents[12]);
        this.positionZ = parseFloat(lineContents[13]);
        this.positionFacing = parseFloat(lineContents[14]);
        // todo: data0..30
    }
}