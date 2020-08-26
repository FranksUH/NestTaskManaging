import { TaskStatus } from "../task-status.enum";
import { IsOptional } from "class-validator";

export class SearchTaskDTO{
    @IsOptional()
    filterText: string;

    @IsOptional()
    status: TaskStatus;

    @IsOptional()
    skip: number

    @IsOptional()
    top: number
}