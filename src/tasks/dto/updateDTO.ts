import { TaskStatus } from "../tasks.model";

export class UpdateDTO{
    title: string;
    description: string;
    status: TaskStatus;
    id: string;
}