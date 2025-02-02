import { ACTLine } from "./act-line.model";

export class Network6DLine extends ACTLine {
    instance?: number;
    command?: number;

    constructor(lineContents: string[]) {
        super(lineContents);
        this.instance = parseInt(lineContents[2], 16);
        this.command = parseInt(lineContents[3], 16);
    }

    minimal() {
        return {
            ...super.minimal(),
            instance: this.instance,
            command: this.command
        }
    }
}