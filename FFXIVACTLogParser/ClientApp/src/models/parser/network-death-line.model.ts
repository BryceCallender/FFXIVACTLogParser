import { ACTLine } from "./act-line.model";

export class NetworkDeathLine extends ACTLine {
    targetId?: number;
    target?: string;
    sourceId?: number;
    source?: string;

    constructor(lineContents: string[]) {
        super(lineContents);
        this.targetId = parseInt(lineContents[2], 16);
        this.target = lineContents[3];
        this.sourceId = parseInt(lineContents[4]);
        this.source = lineContents[5];
    }
}