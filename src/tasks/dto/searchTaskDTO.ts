import { TaskStatus } from "../tasks.model";

export class SearchTaskDTO{
    title: string;
    description: string;
    status: TaskStatus;
}