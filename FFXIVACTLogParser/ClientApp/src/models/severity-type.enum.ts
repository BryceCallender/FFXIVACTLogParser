export enum SeverityType {
    Normal = 1 << 0,
    Crit = 1 << 1,
    Direct = 1 << 2,
    CritDirect = Crit | Direct
}