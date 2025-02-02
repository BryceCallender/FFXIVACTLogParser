import { ACTLine } from "./act-line.model";

export class MapChangingLine extends ACTLine {
    id?: number;
    regionName?: string;
    placeName?: string;
    placeNameSub?: string;

    constructor(lineContents: string[]) {
        super(lineContents);
        this.id = parseInt(lineContents[2], 16);
        this.regionName = lineContents[3];
        this.placeName = lineContents[4];
        this.placeNameSub = lineContents[5];
    }

    minimal() {
        return {
            ...super.minimal(),
            id: this.id,
        }
    }
}