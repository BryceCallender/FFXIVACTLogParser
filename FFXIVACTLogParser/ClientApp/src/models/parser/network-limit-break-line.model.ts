import { ACTLine } from "./act-line.model";

export class NetworkLimitBreakLine extends ACTLine {
    value?: number; // increments of 0x00DC (200). Each bar is 0x2710 (10k) for total 0x7530 (30k) 
    bars?: number; 

    constructor(lineContents: string[]) {
        super(lineContents);
        this.value = parseInt(lineContents[2], 16);
        this.bars = parseInt(lineContents[3]);
    }
}