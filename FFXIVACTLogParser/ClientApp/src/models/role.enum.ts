export enum Role {
    Unknown,
    Tank = 1,
    Healer = 2,
    MeleeDPS = 4,
    PhyscialRangedDPS = 8,
    MagicalRangedDPS = 16,
    DPS = MeleeDPS | PhyscialRangedDPS | MagicalRangedDPS
}