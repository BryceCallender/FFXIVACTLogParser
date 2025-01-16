import { ACTLine } from "./act-line.model";

export class NetworkTetherLine extends ACTLine {
    sourceId?: number;
    source?: string;
    targetId?: number;
    target?: string;
    id?: number; // channeling table id

    constructor(lineContents: string[]) {
        super(lineContents);
        this.sourceId = parseInt(lineContents[2], 16);
        this.source = lineContents[3];
        this.targetId = parseInt(lineContents[4], 16);
        this.target = lineContents[5];
        this.id = parseInt(lineContents[8], 16);
    }
}