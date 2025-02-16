import { ACTLine } from "./act-line.model";

export class NetworkBuffRemoveLine extends ACTLine {
    effectId?: number;
    effect?: string;
    sourceId?: number;
    source?: string;
    targetId?: number;
    target?: string;
    count?: number;

    constructor(lineContents: string[]) {
        super(lineContents);
        this.effectId = parseInt(lineContents[2], 16);
        this.effect = lineContents[3];
        // ? at [4]
        this.sourceId = parseInt(lineContents[5], 16);
        this.source = lineContents[6];
        this.targetId = parseInt(lineContents[7], 16);
        this.target = lineContents[8];
        this.count = parseInt(lineContents[9]);
    }

    minimal() {
        return {
            ...super.minimal(),
            effectId: this.effectId,
            sourceId: this.sourceId,
            targetId: this.targetId,
            count: this.count
        }
    }
}