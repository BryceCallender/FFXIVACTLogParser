import { ACTLine } from "./act-line.model";
import { FlagAndValue } from "./flag-and-value.model";

export class NetworkAbilityLine extends ACTLine {
    sourceId?: number;
    source?: string;
    id?: number;
    ability?: string;
    targetId?: number;
    target?: string;
    flag?: number;
    value?: number;
    actionEffects?: FlagAndValue[];
    targetCurrentHp?: number;
    targetMaxHp?: number;
    targetCurrentMp?: number;
    targetMaxMp?: number;
    targetX?: number;
    targetY?: number;
    targetZ?: number;
    targetFacing?: number;
    currentHp?: number;
    maxHp?: number;
    currentMp?: number;
    maxMp?: number;
    positionX?: number;
    positionY?: number;
    positionZ?: number;
    positionFacing?: number;
    sequence?: number;
    targetIndex?: number;
    targetCount?: number;
    ownerId?: number;
    ownerName?: string;
    effectDisplayType?: number;
    actionId?: number;
    actionAnimationId?: number;
    animationLockTime?: number;
    rotationHex?: number;

    constructor(lineContents: string[]) {
        super(lineContents);
        this.sourceId = parseInt(lineContents[2], 16);
        this.source = lineContents[3];
        this.id = parseInt(lineContents[4], 16);
        this.ability = lineContents[5];
        this.targetId = parseInt(lineContents[6], 16);
        this.target = lineContents[7];
        this.flag = parseInt(lineContents[8].padStart(8, '0'), 16);
        this.value = parseInt(lineContents[9].padStart(8 , '0'), 16);
        //read all flag and values
        let index = 10;
        this.actionEffects = [];
        while (lineContents[index] !== '0') {
            this.actionEffects.push({
                flag: parseInt(lineContents[index].padStart(8, '0'), 16),
                value: parseInt(lineContents[index + 1].padStart(8, '0'))
            });
            index += 2;
        }
        this.targetCurrentHp = parseInt(lineContents[24]);
        this.targetMaxHp = parseInt(lineContents[25]);
        this.targetCurrentMp = parseInt(lineContents[26]);
        this.targetMaxMp = parseInt(lineContents[27]);
        this.targetX = parseFloat(lineContents[30]);
        this.targetY = parseFloat(lineContents[31]);
        this.targetZ = parseFloat(lineContents[32]);
        this.targetFacing = parseFloat(lineContents[33]);
        this.currentHp = parseInt(lineContents[34]);
        this.maxHp = parseInt(lineContents[35]);
        this.currentMp = parseInt(lineContents[36]);
        this.maxMp = parseInt(lineContents[37]);
        this.positionX = parseFloat(lineContents[40]);
        this.positionY = parseFloat(lineContents[41]);
        this.positionZ = parseFloat(lineContents[42]);
        this.positionFacing = parseFloat(lineContents[43]);
        this.sequence = parseInt(lineContents[44], 16);
        this.targetCount = parseInt(lineContents[45]);
        this.targetCount = parseInt(lineContents[46]);
        this.ownerId = parseInt(lineContents[47], 16);
        this.ownerName = lineContents[48];
        this.effectDisplayType = parseInt(lineContents[49], 16);
        this.actionId = parseInt(lineContents[50], 16);
        this.actionAnimationId = parseInt(lineContents[51], 16);
        this.animationLockTime = parseFloat(lineContents[52]);
        this.rotationHex = parseInt(lineContents[53]);
    }
}