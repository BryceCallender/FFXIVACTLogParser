import { ACTLine } from "./act-line.model";

// ID   Description
// 0	A
// 1	B
// 2	C
// 3	D
// 4	1
// 5	2
// 6	3
// 7	4

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

    minimal() {
        return {
            ...super.minimal(),
            operation: this.operation,
            waymark: this.waymark,
            id: this.id,
            name: this.name,
            positionX: this.positionX,
            positionY: this.positionY,
            positionZ: this.positionZ
        }
    }
}