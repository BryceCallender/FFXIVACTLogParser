import { AbilityFlagHelper } from "@/helpers/ability-flag-helper";
import { ACTLine } from "./act-line.model";

export class NetworkDoTLine extends ACTLine {
    id?: number;
    name?: string;
    which?: string;
    effectId?: number;
    damage?: number;
    currentHp?: number;
    maxHp?: number;
    currentMp?: number;
    maxMp?: number;
    positionX?: number;
    positionY?: number;
    positionZ?: number;
    positionFacing?: number;
    sourceId?: number;
    source?: string;
    damageType?: number;
    sourceCurrentHp?: number;
    sourceMaxHp?: number;
    sourceCurrentMp?: number;
    sourceMaxMp?: number;
    sourcePositionX?: number;
    sourcePositionY?: number;
    sourcePositionZ?: number;
    sourceFacing?: number;

    constructor(lineContents: string[]) {
        super(lineContents);
        this.id = parseInt(lineContents[2], 16);
        this.name = lineContents[3];
        this.which = lineContents[4];
        this.effectId = parseInt(lineContents[5], 16);
        this.damage = AbilityFlagHelper.normalDamageCalculation(parseInt(lineContents[6], 16));
        this.currentHp = parseInt(lineContents[7]);
        this.maxHp = parseInt(lineContents[8]);
        this.currentMp = parseInt(lineContents[9]);
        this.maxMp = parseInt(lineContents[10]);
        this.positionX = parseFloat(lineContents[13]);
        this.positionY = parseFloat(lineContents[14]);
        this.positionZ = parseFloat(lineContents[15]);
        this.positionFacing = parseFloat(lineContents[16]);
        this.sourceId = parseInt(lineContents[17], 16);
        this.source = lineContents[18];
        this.damageType = parseInt(lineContents[19]);
        this.sourceCurrentHp = parseInt(lineContents[20]);
        this.sourceMaxHp = parseInt(lineContents[21]);
        this.sourceCurrentMp = parseInt(lineContents[22]);
        this.sourceMaxMp = parseInt(lineContents[23]);
        this.sourcePositionX = parseFloat(lineContents[26]);
        this.sourcePositionY = parseFloat(lineContents[27]);
        this.sourcePositionZ = parseFloat(lineContents[28]);
        this.sourceFacing = parseFloat(lineContents[29]);
    }

    minimal() {
        return {
            ...super.minimal(),
            id: this.id,
            which: this.which,
            effectId: this.effectId,
            damage: this.damage,
            currentHp: this.currentHp,
            maxHp: this.maxHp,
            currentMp: this.currentMp,
            maxMp: this.maxMp,
            positionX: this.positionX,
            positionY: this.positionY,
            positionZ: this.positionZ,
            positionFacing: this.positionFacing,
            sourceId: this.sourceId,
            damageType: this.damageType,
            sourceCurrentHp: this.sourceCurrentHp,
            sourceMaxHp: this.sourceMaxHp,
            sourceCurrentMp: this.sourceCurrentMp,
            sourceMaxMp: this.sourceMaxMp,
            sourcePositionX: this.sourcePositionX,
            sourcePositionY: this.sourcePositionY,
            sourcePositionZ: this.sourcePositionZ,
            sourceFacing: this.sourceFacing,
        }
    }
}