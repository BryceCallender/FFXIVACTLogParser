export class AbilityFlagConstants {
    // Damage flags
    static readonly MISS_FLAG: number = 0x01;
    static readonly DAMAGE: number = 0x03;
    static readonly HEAL: number = 0x04;
    static readonly BLOCKED: number = 0x05;
    static readonly PARRIED: number = 0x06;
    static readonly INSTANT_DEATH: number = 0x33;

    // non-damage flags
    static readonly FULLY_RESISTED = 0x02;
    static readonly INVULNERABLE = 0x07;
    static readonly NO_EFFECT = 0x08;
    static readonly MP_LOSS = 0x0A;
    static readonly MP_GAIN = 0x0B;
    static readonly STATUS_APPLIED_TARGET = 0x0E;
    static readonly STATUS_APPLIED_SOURCE = 0x0F;
    static readonly STATUS_REMOVED = 0x10;
    static readonly NO_EFFECT_PARTICULAR_STATUS = 0x14;
    static readonly AGGRO_INCREASE = 0x18;

    // damage serverity
    static readonly CRIT = 0x20;
    static readonly DIRECT_HIT = 0x40;
    static readonly CRIT_DIRECT_HIT = 0x60;

    // damage bitmasks
    static readonly HALLOWED_DAMAGE = 0x0100;
    static readonly BIG_DAMAGE = 0x4000;

    // object ids
    static readonly PLAYER_ID = 0x10000000;
    static readonly NPC_ID = 0x40000000;

    // rando
    static readonly BLANK = 0xE0000000;
    static readonly WIPE = 0x4000000F;
    static readonly VICTORY = 0x40000003;
    static readonly VICTORY_VARIANT = 0x40000002;

    static readonly VICTORYS = this.VICTORY | this.VICTORY_VARIANT;
}