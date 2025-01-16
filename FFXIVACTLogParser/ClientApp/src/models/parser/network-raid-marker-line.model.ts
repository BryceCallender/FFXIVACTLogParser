import { ACTLine } from "./act-line.model";

export class NetworkRaidMarkerLine extends ACTLine {
    operation?: string;
    waymark?: string;
    id?: number;
    name?: string;
    positionX?: number;
    positionY?: number;
    positionZ?: number;

    constructor(lineContents: string[]) {
        super(lineContents);
        this.operation = lineContents[2];
        this.waymark = lineContents[3];
        this.id = parseInt(lineContents[4], 16);
        this.name = lineContents[5];
        this.positionX = parseFloat(lineContents[6]);
        this.positionY = parseFloat(lineContents[7]);
        this.positionZ = parseFloat(lineContents[8]);
    }
}