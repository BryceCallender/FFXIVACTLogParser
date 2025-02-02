import { ACTLine } from "./act-line.model";

export class PartyListLine extends ACTLine {
    partySize?: number;
    partyIds?: number[];

    constructor(lineContents: string[]) {
        super(lineContents);
        this.partySize = parseInt(lineContents[2]);
        this.partyIds = [];
        for (let i = 0; i < this.partySize; i++) {
            this.partyIds.push(parseInt(lineContents[3 + i], 16));
        }
    }

    minimal() {
        return {
            ...super.minimal(),
            partySize: this.partySize,
            partyIds: this.partyIds
        }
    }
}