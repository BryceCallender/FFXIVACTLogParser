export {};

// Extend the Number prototype to add a method for checking bitwise values
declare global {
    interface Number {
        hasFlag(bits: number): boolean;
    }
}

Number.prototype.hasFlag = function (this: number, flag: number): boolean {
    return (this & flag) === flag;
};