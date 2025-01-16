import { ACTLine } from "./act-line.model";

export class NetworkTargetMarkerLine extends ACTLine {
    operation?: string;
    waymark?: string;
    id?: number;
    name?: string;
    targetId?: number;
    target?: string;

    constructor(lineContents: string[]) {
        super(lineContents);
        this.operation = lineContents[2];
        this.waymark = lineContents[3];
        this.id = parseInt(lineContents[4], 16);
        this.name = lineContents[5];
        this.targetId = parseInt(lineContents[6], 16);
        this.target = lineContents[7];
    }
}