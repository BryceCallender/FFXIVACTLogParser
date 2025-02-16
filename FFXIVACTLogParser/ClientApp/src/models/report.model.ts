import { Fight } from "./fight.model";

export interface Report {
    name?: string;
    created?: Date;
    fights?: Fight[];
}