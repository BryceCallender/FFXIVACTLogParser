import { ACTLine } from "./act-line.model";

// ID	Description
// 0	Hexagon 1
// 1	Hexagon 2
// 2	Hexagon 3
// 3	Hexagon 4
// 4	Hexagon 5
// 5	Chain 1
// 6	Chain 2
// 7	Chain 3
// 8	Ignore 1
// 9	Ignore 2
// 10	Square
// 11	Circle
// 12	Plus
// 13	Triangle

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

    minimal() {
        return {
            ...super.minimal(),
            operation: this.operation,
            waymark: this.waymark,
            id: this.id,
            name: this.name,
            targetId: this.targetId,
            target: this.target
        }
    }
}