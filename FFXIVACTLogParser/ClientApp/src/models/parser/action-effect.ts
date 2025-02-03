import { ActionSeverity } from "./action-severity.enum";
import { ActionType } from "./action-type.enum";

export interface ActionEffect {
    flag?: number;
    value?: number;

    type?: ActionType;
    severity?: ActionSeverity;
}