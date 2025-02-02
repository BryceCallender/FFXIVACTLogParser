import { ACTLine } from "./act-line.model";

export class NetworkStartCastingLine extends ACTLine {
    sourceId?: number;
    source?: string;
    id?: number;
    ability?: string;
    targetId?: number;
    target?: string;
    castTime?: number;
    positionX?: number;
    positionY?: number;
    positionZ?: number;
    positionFacing?: number;

    constructor(lineContents: string[]) {
        super(lineContents);
        this.sourceId = parseInt(lineContents[2], 16);
        this.source = lineContents[3];
        this.id = parseInt(lineContents[4], 16);
        this.ability = lineContents[5];
        this.targetId = parseInt(lineContents[6], 16);
        this.target = lineContents[7];
        this.castTime = parseFloat(lineContents[8]);
        this.positionX = parseFloat(lineContents[9]);
        this.positionY = parseFloat(lineContents[10]);
        this.positionZ = parseFloat(lineContents[11]);
        this.positionFacing = parseFloat(lineContents[12]);
    }

    minimal() {
        return {
            ...super.minimal(),
            sourceId: this.sourceId,
            source: this.source,
            id: this.id,
            ability: this.ability,
            targetId: this.targetId,
            target: this.target,
            castTime: this.castTime,
            positionX: this.positionX,
            positionY: this.positionY,
            positionZ: this.positionZ,
            positionFacing: this.positionFacing
        }
    }
}