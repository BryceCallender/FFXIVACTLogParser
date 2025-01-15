import { ACTLine } from "./act-line.model";

export class NetworkTargetIconLine extends ACTLine {
    targetId?: number;
    target?: string;
    id?: number;

    constructor(lineContents: string[]) {
        super(lineContents);
        this.targetId = parseInt(lineContents[2], 16);
        this.target = lineContents[3];
        this.id = parseInt(lineContents[6], 16);
    }
}