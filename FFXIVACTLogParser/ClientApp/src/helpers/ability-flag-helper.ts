import { ActionSeverity } from "@/models/parser/action-severity.enum";
import { ActionType } from "@/models/parser/action-type.enum";
import { AbilityFlagConstants } from "@models/constants/ability-flag-constants.model";

export class AbilityFlagHelper {
    static isHealingAbility(flag: number): boolean {
        return flag.hasFlag(AbilityFlagConstants.HEAL);
    }

    static isDamageAbility(flag: number): boolean {
        return flag.hasFlag(AbilityFlagConstants.DAMAGE);
    }

    static isCrit(flag: number): boolean {
        return flag.hasFlag(AbilityFlagConstants.CRIT);
    }

    static isDirectHit(flag: number): boolean {
        return flag.hasFlag(AbilityFlagConstants.DIRECT_HIT);
    }

    static isCritDirectHit(flag: number): boolean {
        return this.isCrit(flag) && this.isDirectHit(flag);
    }

    static normalDamageCalculation(value: number): number {
        return value >> 16 & 0xFFFF;
    }

    static getValueFromAbilityFlag (flag: number, value: number): number {
        if (this.isDamageAbility(flag)) {
            if (value.hasFlag(AbilityFlagConstants.BIG_DAMAGE)) {
                return this.bigDamageConversion(value);
            } else if (value.hasFlag(AbilityFlagConstants.HALLOWED_DAMAGE)) {
                return 0;
            } else {
                return this.normalDamageCalculation(value);
            }
        } else if(this.isHealingAbility(flag)) {
            return this.normalDamageCalculation(value);
        }
    }

    static toAbilityType (flag: number): ActionType {
        if (this.isDamageAbility(flag)) {
            return ActionType.Damage;
        } else if (this.isHealingAbility(flag)) {
            return ActionType.Heal;
        }

        return ActionType.Unknown;
    }

    static toAbilitySeverity (flag: number): ActionSeverity {
        if (this.isDamageAbility(flag)) {
            // 0xAB => A is the severity flag for damage
            const damageSeverityFlag = flag >> 8 & 0xFF;
            if (this.isCritDirectHit(damageSeverityFlag)) {
                return ActionSeverity.CritDirectHit;
            } else if (this.isCrit(damageSeverityFlag)) {
                return ActionSeverity.Crit;
            } else if (this.isDirectHit(damageSeverityFlag)) {
                return ActionSeverity.DirectHit;
            }
        } else if (this.isHealingAbility(flag)) {
            // 0xABC => A is the severity flag for damage
            const healingSeverityFlag = flag >> 24 & 0xFF;
            if (this.isCrit(healingSeverityFlag)) {
                return ActionSeverity.Crit;
            }
        }

        return ActionSeverity.Normal;
    }
 
    // FF14 loves to not actually give u a big damage value but you have to do byte manip
    // to get it out
    static bigDamageConversion(value: number): number {
        // 0xABCD where C ix 0x40
        // should turn into integer represented as 0xDAB
        // we can remove C as it was just the indicator
        const valueWithoutC = value ^ AbilityFlagConstants.BIG_DAMAGE;

        const buffer = new ArrayBuffer(4);
        const view = new DataView(buffer);

        view.setUint32(0, valueWithoutC, false);

        // should end up being 0x0DBA
        let byteArray = this.shiftZerosToFront(new Uint8Array(buffer).reverse());
        byteArray = this.swapUint8Indices(byteArray, 2, 3); // need to swap B with A

        const uIntBuffer = byteArray.buffer.slice(byteArray.byteOffset, byteArray.byteOffset + byteArray.byteLength);
        const uIntView = new DataView(uIntBuffer);

        return uIntView.getUint32(0, false);
    }

    static shiftZerosToFront(arr: Uint8Array): Uint8Array {
        const zeroCount = arr.filter(value => value === 0).length;
        const nonZeroValues = arr.filter(value => value !== 0);

        // Create a new Uint8Array with the same length as the original
        const result = new Uint8Array(arr.length);

        // Fill the front with zeros
        for (let i = 0; i < zeroCount; i++) {
            result[i] = 0;
        }

        // Fill the rest with non-zero values
        for (let i = 0; i < nonZeroValues.length; i++) {
            result[zeroCount + i] = nonZeroValues[i];
        }

        return result;
    }

    static swapUint8Indices(arr: Uint8Array, from: number, to: number): Uint8Array {
        const swappedArray = new Uint8Array(arr);

        if (from < 0 || from >= swappedArray.length || to < 0 || to >= swappedArray.length) {
            throw new Error('out of bounds');
        }

        const temp = swappedArray[to];
        swappedArray[to] = swappedArray[from];
        swappedArray[from] = temp;

        return swappedArray;
    }
}