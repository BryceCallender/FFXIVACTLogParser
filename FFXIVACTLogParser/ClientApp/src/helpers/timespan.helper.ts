import { intervalToDuration, type Duration } from 'date-fns';

export class TimespanHelper {
    public static toDuration(start: Date, end: Date): Duration {
        return intervalToDuration({
            start,
            end
        });
    }
}