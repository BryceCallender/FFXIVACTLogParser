import { ACTLine } from "./act-line.model";

export class ZoneChangedLine extends ACTLine {
    zoneId?: number;
    zoneName?: string;

    constructor(lineContents: string[]) {
        super(lineContents);
        this.zoneId = parseInt(lineContents[2], 16);
        this.zoneName = lineContents[3];
    }
}