import { ACTLine } from "./act-line.model"

export class NetworkCancelAbilityLine extends ACTLine {
    sourceId?: number;
    source?: string;
    id?: number;
    name?: string;
    reason?: string;

    constructor(lineContents: string[]) {
        super(lineContents);
        this.sourceId = parseInt(lineContents[2], 16);
        this.source = lineContents[3];
        this.id = parseInt(lineContents[4], 16);
        this.name = lineContents[5];
        this.reason = lineContents[6];
    }

    minimal() {
        return {
            ...super.minimal(),
            sourceId: this.sourceId,
            id: this.id,
            reason: this.reason
        }
    }
}