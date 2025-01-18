import { ACTLine } from "./act-line.model";

export class NetworkBuffLine extends ACTLine {
    effectId?: number;
    effect?: string;
    duration?: number;
    sourceId?: number;
    source?: string;
    targetId?: number;
    target?: string;
    count?: number;
    targetMaxHp?: number;
    sourceMaxHp?: number;

    constructor(lineContents: string[]) {
        super(lineContents);
        this.effectId = parseInt(lineContents[2], 16);
        this.effect = lineContents[3];
        this.duration = parseFloat(lineContents[4]);
        this.sourceId = parseInt(lineContents[5], 16);
        this.source = lineContents[6];
        this.targetId = parseInt(lineContents[7], 16);
        this.target = lineContents[8];
        this.count = parseInt(lineContents[9]);
        this.targetMaxHp = parseInt(lineContents[10]);
        this.sourceMaxHp = parseInt(lineContents[11]);
    }
}