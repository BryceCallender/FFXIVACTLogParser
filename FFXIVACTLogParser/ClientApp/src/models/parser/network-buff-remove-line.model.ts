import { ACTLine } from "./act-line.model";

export class NetworkBuffRemoveLine extends ACTLine {
    effectId?: number;
    sourceId?: number;
    source?: string;
    targetId?: number;
    target?: string;
    count?: number;

    constructor(lineContents: string[]) {
        super(lineContents);
        this.effectId = parseInt(lineContents[2], 16);
        this.sourceId = parseInt(lineContents[4], 16);
        this.source = lineContents[5];
        this.targetId = parseInt(lineContents[6], 16);
        this.target = lineContents[7];
        this.count = parseInt(lineContents[8]);
    }

    minimal() {
        return {
            ...super.minimal(),
            effectId: this.effectId,
            sourceId: this.sourceId,
            source: this.source,
            targetId: this.targetId,
            target: this.target,
            count: this.count
        }
    }
}