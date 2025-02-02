import { ACTLine } from "./act-line.model";

export class PlayerStatsLine extends ACTLine {
    jobId?: number;
    str?: number;
    dex?: number;
    vitality?: number;
    intelligence?: number;
    mind?: number;
    piety?: number;
    attack?: number;
    directHit?: number;
    crit?: number;
    attackMagicPotency?: number;
    healMagicPotency?: number;
    determination?: number;
    skillSpeed?: number;
    spellSpeed?: number;
    tenacity?: number;

    constructor(lineContents: string[]) {
        super(lineContents);
        this.jobId = parseInt(lineContents[2], 16);
        this.str = parseInt(lineContents[3]);
        this.dex = parseInt(lineContents[4]);
        this.vitality = parseInt(lineContents[5]);
        this.intelligence = parseInt(lineContents[6]);
        this.mind = parseInt(lineContents[7]);
        this.piety = parseInt(lineContents[8]);
        this.attack = parseInt(lineContents[9]);
        this.directHit = parseInt(lineContents[10]);
        this.crit = parseInt(lineContents[11]);
        this.attackMagicPotency = parseInt(lineContents[12]);
        this.healMagicPotency = parseInt(lineContents[13]);
        this.determination = parseInt(lineContents[14]);
        this.skillSpeed = parseInt(lineContents[15]);
        this.spellSpeed = parseInt(lineContents[16]);
        this.tenacity = parseInt(lineContents[18]);
    }
    
    minimal() {
        return {
            ...super.minimal(),
            jobId: this.jobId,
            str: this.str,
            dex: this.dex,
            vitality: this.vitality,
            intelligence: this.intelligence,
            mind: this.mind,
            piety: this.piety,
            attack: this.attack,
            directHit: this.directHit,
            crit: this.crit,
            attackMagicPotency: this.attackMagicPotency,
            healMagicPotency: this.healMagicPotency,
            determination: this.determination,
            skillSpeed: this.skillSpeed,
            spellSpeed: this.spellSpeed,
            tenacity: this.tenacity
        }
    }
}