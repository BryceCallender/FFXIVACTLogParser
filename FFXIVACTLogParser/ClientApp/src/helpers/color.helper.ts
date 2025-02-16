export class ColorHelper {
    public static toPercentageColor(value: number): string {
        if (value === 100) {
            return 'gold';
        } else if (value === 99) {
            return 'pink';
        } else if (value >= 95) {
            return 'orange';
        } else if (value >= 75) {
            return 'purple';
        } else if (value >= 50) {
            return 'blue';
        } else if (value >= 25) {
            return 'green';
        }

        return 'gray';
    }
}