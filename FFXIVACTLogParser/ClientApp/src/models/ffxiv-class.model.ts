import { Job } from "./job.enum";
import { Role } from "./role.enum";

export interface FFXIVClass {
    job?: Job;
    role?: Role;
}