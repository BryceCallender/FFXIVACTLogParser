export class ACTLine {
    messageType: number;
    timestamp: Date;

    constructor(lineContents: string[]) {
        this.messageType = +lineContents[0];
        this.timestamp = new Date(Date.parse(lineContents[1]));
    }

    minimal() {
        return {
            messageType: this.messageType,
            timestamp: this.timestamp
        };
    }
}